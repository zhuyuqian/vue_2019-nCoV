<template>
    <!--顶部人次区域-->
    <div class="top-warp">
        <div class="top-box">
            <p class="title">疫情实时大数据报告</p>
            <p class="epidemic">共 {{epidemicCount}} 人次已经浏览</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            epidemicCount: {type: Number, default: 0}
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/color";

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
</style>