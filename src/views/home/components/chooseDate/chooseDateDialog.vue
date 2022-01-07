<template>
    <div class="mask-part-content">
        <div class="maskPart"></div>
        <div class="date-choose-dialog" ref="dateChoose" :style="dateDialogPosition"  style="width: 567px;height: 262px">
            <i class="date-choose-dialog-close" @click="closeDialog"></i>
            <p class="date-choose-dialog-title">日期选择</p>
<!--            <div class="" style="height: 524px;">-->
<!--                <div :id="'appealRelationContent'+from">-->

<!--                </div>-->
<!--            </div>-->
            <div id="choosePart">
                <template v-if="dateActiveType === 'day'">
                    <el-date-picker
                            v-model="inputValue"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            style="background: #030f17"
                            value-format="yyyy-MM-dd"
                            :clearable="false"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </template>
                <template v-else-if="dateActiveType === 'month'">
                    <el-date-picker
                            v-model="inputValue"
                            align="right"
                            type="month"
                            placeholder="选择月份"
                            value-format="yyyy-MM"
                            :clearable="false"
                            style="background: #030f17">
                    </el-date-picker>
                </template>
                <template v-else>
                    <el-date-picker
                            v-model="inputValue"
                            align="right"
                            type="year"
                            placeholder="选择年"
                            value-format="yyyy"
                            :clearable="false"
                            style="background: #030f17">
                    </el-date-picker>
                </template>
                <span class="data-confirm" @click="chooseConfirm">确定</span>
            </div>

        </div>
    </div>


</template>

<script>
    export default {
        name: "chooseDateDialog",
        props:['dateActiveType','chooseDate','dateDialogPosition'],
        watch:{
            chooseDate:{
                handler(val){
                    if(val !== this.inputValue){
                        this.inputValue = val;
                    }
                },
                immediate: true,
            },
        },
        data(){
            return{
                inputValue:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        mounted() {
        },
        methods:{
            //关闭弹框
            closeDialog(){
                this.$emit('closeDialog')
            },
            //确定
            chooseConfirm(){
                this.$emit('dateChooseConfirm',this.inputValue);
            }
        }
    }
</script>

<style scoped lang="scss">
    @mixin  backgroundSizeRepeat{
        background-size: 100% 100%;
        background-repeat:no-repeat;
        /*background-image: unset!important;*/
    }
    .date-choose-dialog{
        position: fixed;
        //width: 100%;
        //height: 100%;
        //background: red;
        top: 26%;
        //left: 0;
        opacity: unset;
        z-index: 101;
        @include backgroundSizeRepeat;
        background-image: url("../../images/box2_bg.png");
        left: 0;
        right: 0;
        //margin: auto;
         padding: 57px 45px 40px 45px;
        .date-choose-dialog-close{
            width: 48px;
            height: 48px;
            @include backgroundSizeRepeat;
            background-image: url("../../images/close.png");
            display: inline-block;
            position: absolute;
            top: 22px;
            right: 0;
        }
        .date-choose-dialog-title{
            width: 177px;
            height: 46px;
            @include backgroundSizeRepeat;
            background-image: url("../../images/tittle04.png");
            display: inline-block;
            position: absolute;
            top: 45px;
            right: 0;
            left: 0;
            margin: auto;
            text-align: center;
            line-height: 45px;
            font-size: 18px;
            color: #0190bf;
            font-weight: 700;
        }
        .date-choose-dialog-content{
            background: #051a28;
        }
        #choosePart{
            text-align: center;
            margin-top: 68px;
            .data-confirm{
                @include backgroundSizeRepeat;
                background-image: url("../../images/button02.png");
                display: inline-block;
                width: 122px;
                height: 53px;
                vertical-align: middle;
                margin-left: 20px;
                line-height: 53px;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
            }
        }

    }
</style>
<style lang="scss">
    #choosePart{
        .el-input__inner{
            background: #030f17;
            border: 1px solid #104a5a;
            color: #a8d5e4;
        }
    }
    .el-date-picker{
        background: #030f17!important;
        .el-picker-panel__sidebar{
            background: #030f17!important;
        }
    }
    .el-month-table td.disabled .cell,.el-year-table td.disabled .cell,.el-date-table td.disabled div{
        background-color: #000;
        color: unset;
    }
    .el-date-table th,.el-picker-panel,.el-date-picker__header--bordered{
        border-color: #a8d5e4;
    }
    .el-picker-panel__icon-btn,.el-date-picker__header-label,.el-picker-panel__shortcut,.el-date-table th, .el-picker-panel,.el-month-table td .cell{
        color: #a8d5e4;
    }
    .el-date-picker__header-label{}
</style>
