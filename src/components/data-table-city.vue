<template>
    <div class="table-li">
        <div class="table-tr" @click="isCheck=!isCheck">
            <div class="table-td a">{{itemData.name}}</div>
            <div class="table-td b">{{title.includes('中国')?itemData.econNum:itemData.conadd}}</div>
            <div class="table-td c">{{itemData.value}}</div>
            <div class="table-td d">{{itemData.deathNum}}</div>
            <div class="table-td e">{{itemData.cureNum}}</div>
        </div>
        <transition name="fade">
            <div class="children-table" v-show="isCheck">
                <div class="table-tr" v-for="item in itemData.city">
                    <div class="table-td a">{{item.name}}</div>
                    <div class="table-td b">{{item.econNum}}</div>
                    <div class="table-td c">{{item.conNum}}</div>
                    <div class="table-td d">{{item.deathNum}}</div>
                    <div class="table-td e">{{item.cureNum}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            title: {type: String, default: ''},
            itemData: {item: Object}
        },
        data() {
            return {
                isCheck: false
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/color";

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .table-li {
        .table-tr {
            padding: 6px 0;
            font-size: 13px;
            color: #333;
            .table-td {
                display: inline-block;
                width: 20%;
                text-align: center;
            }
        }
        .children-table {
            .table-tr {
                padding: 2px 0;
                font-size: 12px;
                color: #aaa;
            }
        }
    }

</style>