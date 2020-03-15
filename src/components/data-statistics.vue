<template>
    <!--数据统计-->
    <div class="data-warp" v-if="mapData.cachetime">
        <div class="title-box">
            <span>全国(含港澳台)</span>截止{{new Date(mapData.cachetime).format('yyyy年MM月d日hh时mm分')}}数据统计
        </div>
        <div class="data-box">
            <div class="data-item" v-for="item in options">
                <p class="name">{{item.name}}</p>
                <p class="data" :style="{color:item.color}">{{mapData[item.key]}}</p>
                <p class="yes">较昨日<span>{{mapData.add_daily[item.yesKey]}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            mapData: {type: Object, default: {}}
        },
        data() {
            return {
                options: [
                    {name: '现存确诊', color: '#ff3535', key: 'econNum', yesKey: 'addecon_new'},
                    {name: '现存确诊重症', color: '#8a121c', key: 'heconNum', yesKey: 'addhecon_new'},
                    {name: '现存疑似', color: '#a36fff', key: 'sustotal', yesKey: 'wjw_addsus_new'},
                    {name: '累计确诊', color: '#b10000', key: 'gntotal', yesKey: 'addcon_new'},
                    {name: '累计死亡', color: '#4b4b4b', key: 'deathtotal', yesKey: 'adddeath_new'},
                    {name: '累计治愈', color: '#13B593', key: 'curetotal', yesKey: 'addcure_new'},
                ],
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/color";

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
</style>