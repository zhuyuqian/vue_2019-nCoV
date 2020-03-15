<template>
    <!--全国疫情地图-->
    <div class="map-warp">
        <div class="map-box" ref="chart"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'; // echarts
    import 'echarts/map/js/china'; // 中国地图
    export default {
        props: {
            mapData: {type: Object, default: {}}
        },
        watch: {
            mapData(curr) {
                let that = this;
                that.initChinaChart();
            }
        },
        methods: {
            // 画图
            initChinaChart() {
                let that = this;
                if (!that.chinaChart) {
                    that.chinaChart = echarts.init(that.$refs.chart);
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
                            if (!obj.data) return;
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
                        data: that.mapData.list ? that.mapData.list.map(item => {
                            return {name: item.name, value: item.value, obj: item}
                        }) : []
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
        },
        mounted() {
            let that = this;
            that.initChinaChart();
        }
    }
</script>

<style lang="less" scoped>
    .map-warp {
        margin-top: 10px;
        .map-box {
            width: 96%;
            height: 300px;
            margin: 0 auto;
            background: #fff;
            border-radius: 4px;
            box-shadow: 2px 2px 2px #ddd;
        }
    }
</style>