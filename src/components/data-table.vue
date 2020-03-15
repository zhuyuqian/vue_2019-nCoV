<template>
    <div class="table-warp">
        <div class="table-box">
            <div class="title-box">{{title}}</div>
            <div class="table-tr">
                <div class="table-td">省份</div>
                <div class="table-td">{{title.includes('中国')?'现存':'增加'}}确诊</div>
                <div class="table-td">累计确诊</div>
                <div class="table-td">死亡</div>
                <div class="table-td">治愈</div>
            </div>
            <city v-for="item in list" :itemData="item" :key="item.name" :title="title"></city>
        </div>

    </div>
</template>

<script>
    import City from './data-table-city'

    export default {
        components: {City},
        props: {
            title: {type: String, default: ''},
            list: {type: Array, default: []}
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/color";

    .table-warp {
        margin-top: 10px;
        .table-box {
            width: 96%;
            margin: 0 auto;
            background: #fff;
            border-radius: 4px;
            box-shadow: 2px 2px 2px #ddd;
            .title-box {
                padding: 10px;
                color: @cl-main;
                font-size: 18px;
                font-weight: bold;

            }
            .table-tr {
                font-weight: bold;
                line-height: 26px;
                font-size: 12px;
                .table-td {
                    display: inline-block;
                    width: 20%;
                    text-align: center;
                }
            }
        }
    }
</style>