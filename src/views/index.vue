<template>
    <div class="index-page">
        <!--顶部区域-->
        <top-epidemic :epidemicCount="epidemicCount"></top-epidemic>
        <tabs class="tabs-warp" scrollspy sticky :duration="0.5">
            <tab title="数据统计">
                <data-statistics :mapData="mapData"></data-statistics>
            </tab>
            <tab title="疫情图">
                <china-map :mapData="mapData"></china-map>
            </tab>
            <tab title="国内疫情">
                <data-table :list="mapData.list" title="中国病例"></data-table>
            </tab>
            <tab title="国外疫情">
                <data-table :list="mapData.otherlist" title="全球病例"></data-table>
            </tab>
        </tabs>

    </div>
</template>

<script>
    import Tab from 'vant/lib/tab';
    import Tabs from 'vant/lib/tabs';
    import 'vant/lib/tab/style';
    import 'vant/lib/tabs/style';

    import {jsonp} from '../assets/js/jsonp'; // 封装的jsonp

    import TopEpidemic from '../components/top-epidemic' ; // 顶部人次区域组件
    import DataStatistics from '../components/data-statistics'; // 数据统计组件
    import ChinaMap from '../components/china-map' ; // 全国疫情地图组件
    import DataTable from '../components/data-table' ; // 全国疫情表格组件

    export default {
        components: {Tab, Tabs, DataStatistics, ChinaMap, TopEpidemic, DataTable},
        data() {
            return {
                epidemicCount: 0, // 查看人数
                mapData: {list: [], otherlist: []}, // 整体数据
            }
        },
        methods: {
            // 获取数据
            async getData() {
                let that = this;
                // 浏览人次
                let {data: {epidemic}} = await
                    jsonp('https://sop-pae.baidu.com/sop/api/epidemic', 'cb', {type: 0}); // 访问人数
                that.epidemicCount = epidemic;
                // 整体数据
                let {data: mapData} = await
                    jsonp('https://gwpre.sina.cn/interface/fymap2020_data.json'); // 地图数据
                mapData.list.forEach(item => item.city.sort((a, b) => b.conNum - a.conNum));
                mapData.list.sort((a, b) => b.value - a.value);
                mapData.otherlist.sort((a, b) => b.value - a.value);
                that.mapData = mapData;
            }
        },
        created() {
            let that = this;
            that.getData()
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/color";

    .index-page {
        padding-bottom: 20px;
        .tabs-warp {
            /deep/ .van-sticky {
                .van-tabs__wrap {
                    .van-tabs__nav {
                        .van-tabs__line {
                            background-color: @cl-main;
                        }
                    }
                }
            }
        }
    }
</style>