<template>
    <div class="index-page">
        <!--顶部区域-->
        <div class="top-warp">
            <div class="top-box">
                <p class="title">疫情实时大数据报告</p>
                <p class="epidemic">共 {{epidemicCount || '- -s'}} 人次已经浏览</p>
            </div>
        </div>
        <!--数据区域-->
        <div class="data-warp" v-if="mapData">
            <div class="title-box">
                <span>全国(含港澳台)</span>截止{{new Date(mapData.cachetime).format('yyyy年MM月d日hh时mm分')}}数据统计
            </div>
            <div class="data-box">
                <div class="data-item" v-for="item in dataOption">
                    <p class="name">{{item.name}}</p>
                    <p class="data" :style="{color:item.color}">{{mapData[item.key]}}</p>
                    <p class="yes">较昨日<span>{{mapData.add_daily[item.yesKey]}}</span></p>
                </div>
            </div>
        </div>
        <!--地图区域-->
        <div class="map-warp">
            <div class="map-box" ref="chinaChart"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'; // echarts
    import 'echarts/map/js/china'; // 中国地图
    import {jsonp} from '../assets/js/jsonp'; // 封装的jsonp

    export default {
        data() {
            return {
                dataOption: [
                    {name: '现存确诊', color: '#ff3535', key: 'econNum', yesKey: 'addecon_new'},
                    {name: '现存确诊重症', color: '#8a121c', key: 'heconNum', yesKey: 'addhecon_new'},
                    {name: '现存疑似', color: '#a36fff', key: 'sustotal', yesKey: 'wjw_addsus_new'},
                    {name: '累计确诊', color: '#b10000', key: 'gntotal', yesKey: 'addcon_new'},
                    {name: '累计死亡', color: '#4b4b4b', key: 'deathtotal', yesKey: 'adddeath_new'},
                    {name: '累计治愈', color: '#13B593', key: 'curetotal', yesKey: 'addcure_new'},
                ],
                epidemicCount: 0, // 查看人数
                mapData: null
            }
        },
        methods: {
            // 画图
            initChinaChart() {
                let that = this;
                if (!that.chinaChart) {
                    that.chinaChart = echarts.init(that.$refs.chinaChart);
                    window.addEventListener('resize', function () {
                        that.chinaChart.resize();
                    })
                }
                that.chinaChart.setOption({
                    title: {
                        text: '全国疫情地图',
                        subtext: '数据来源：国家及各省市地区卫健委',
                        textStyle: {color: '#10aeb5', fontSize: 18},
                        subtextStyle: {color: '#999', fontSize: 12},
                        top: 10,
                        left: 10
                    },
                    tooltip: {
                        show: true,
                        formatter: function (obj) {
                            return ` <p style="font-size:8px">总数：${obj.data.value}</p>
                                     <p style="font-size:8px">现存：${obj.data.obj.econNum}</p>
                                     <p style="font-size:8px">死亡：${obj.data.obj.deathNum}</p>
                                     <p style="font-size:8px">治愈：${obj.data.obj.cureNum}</p>`
                        }
                    },
                    series: [{
                        type: 'map',
                        map: 'china',
                        left: 10,
                        right: 10,
                        top: 30,
                        bottom: 10,
                        itemStyle: {borderColor: '#eee'},
                        label: {show: true, fontSize: 8, color: '#333'},
                        data: that.mapData.list.map(item => {
                            return {name: item.name, value: item.value, obj: item}
                        })
                    }],
                    visualMap: [{
                        type: 'piecewise',
                        show: true,
                        hoverLink: false,
                        pieces: [
                            {min: 10000},
                            {min: 1000, max: 9999},
                            {min: 100, max: 999},
                            {min: 10, max: 99},
                            {min: 1, max: 9}
                        ],
                        inRange: {
                            color: ['#16f5ff', '#10aeb5']
                        },
                        itemWidth: 10,
                        itemHeight: 8,
                        itemGap: 4,
                        left: 10,
                        bottom: 10,
                        padding: 0,
                        textStyle: {color: '#666', fontSize: 10}
                        // align: 'right',
                        // orient: 'horizontal'
                    }]
                })
            },
            // 获取数据
            async getData() {
                let that = this;
                let {data: {epidemic}} = await
                    jsonp('https://sop-pae.baidu.com/sop/api/epidemic', 'cb', {type: 0}); // 访问人数
                that.epidemicCount = epidemic;
                let {data: mapData} = await
                    jsonp('https://gwpre.sina.cn/interface/fymap2020_data.json'); // 地图数据
                that.mapData = mapData;
                that.initChinaChart();
            }
        },
        mounted() {
            let that = this;
            that.getData()
        }
    }
</script>

<style lang="less" scoped>
    @cl-main: #10aeb5;
    .index-page {
        .top-warp {
            background-color: @cl-main;
            background-image: url(//mms-res.cdn.bcebos.com/mms-res/voicefe/captain/mola/Virus/1.1.209/assets/bg-header.840c435.jpg);
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
            overflow: hidden;
            .top-box {
                width: 90%;
                margin: 40px auto;
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                }
                .epidemic {
                    margin-top: 10px;
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }
        .data-warp {
            .title-box {
                font-size: 12px;
                padding: 10px 0;
                color: #666;
                text-align: center;
                span {
                    margin-right: 4px;
                    padding: 2px 4px;
                    background: @cl-main;
                    color: #fff;
                    border-radius: 4px;
                }
            }
            .data-box {
                width: 96%;
                margin: 0 auto;
                background: #fff;
                border-radius: 4px;
                box-shadow: 2px 2px 2px #ddd;
                .data-item {
                    display: inline-block;
                    width: calc(100% / 3);
                    text-align: center;
                    padding: 10px 0;
                    .name {
                        font-size: 12px;
                        color: #666;
                    }
                    .data {
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .yes {
                        font-size: 12px;
                        color: #999;
                        span {
                            color: #666;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .map-warp {
            margin-top: 10px;
            margin-bottom: 30px;
            .map-box {
                width: 96%;
                height: 300px;
                margin: 0 auto;
                background: #fff;
                border-radius: 4px;
                box-shadow: 2px 2px 2px #ddd;
            }
        }
    }
</style>