<!--行业分析-->
<template>
    <div id="industryAnalysisView" @click="stopEvent($event)">
        <span class="title-left">按行业分析</span>
        <div id="industryAnalysisViewContent">
            <el-table
                    ref="singleTable"
                    :data="industryAnalysis"
                    max-height="495"
                    highlight-current-row
                    @row-click="handleCurrentChange"
                    header-row-class-name="tab_header"
                    cell-class-name="cell-class-name"
                    class="tableClass"
                    style="height:auto;">
                <el-table-column
                        label="序号"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        property="industryName"
                        label="行业名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="count"
                        label="交办量"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="占比">
                    <template slot-scope="data">
                        <span>{{ data.row.ratio | getRatio}}%</span>
                    </template>

                </el-table-column>
                <el-table-column
                        label="环比">
                <template slot-scope="data">
                    <i :class="{'el-icon-the-up': data.row.relativeRatio > 0, 'el-icon-the-down':data.row.relativeRatio < 0}"></i>
                    <span>{{ data.row.relativeRatio > 0 ? '+':''}}{{ data.row.relativeRatio | getRatio}}%</span>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <transition
                name="fade"
                enter-active-class="animate__animated animate__rotateInDownLeft"
                leave-active-class="animate__animated animate__rotateOutDownLeft"
        >
            <second-department
                    v-if="showSecondDig"
                    :industryName="industryName"
                    :dateActiveType="dateActiveType"
                    @closeDialog="closeDialog"
            ></second-department>
        </transition>
    </div>
</template>
<script>

    import secondDepartment from './secondDepartment'
    export default {
        name: "IndustryAnalysis",
        props: {
            industryAnalysis: {
                type: Array,
                default: function () {
                    return []
                },
            },
            dateActiveType: {
                type: String,
                default() {
                    return '';
                },
            }
        },
        components:{
            secondDepartment
        },
        watch:{
            industryAnalysis:{
                handler(val){
                    if(val && val.length) {
                        if(this.$parent.searchParams.industryName) {
                            let row = val.filter(item=>{
                                return item.industryName === this.$parent.searchParams.industryName;
                            });

                            this.$refs.singleTable.setCurrentRow(row[0]);
                        }
                    }
                },
                deep: true,
            }
        },
        data() {
            return {
                currentRow: null,
                showSecondDig: false, // 展示二级行业弹框
                industryName: '', //行业名称
                fadeInActive: '',
            };
        },
        methods: {
            // 打开二级行业弹框
            handleCurrentChange(row,c,$event){
                // if(this.industryName === row.industryName){
                //     this.$refs.singleTable.setCurrentRow();
                // }
                this.industryName = row.industryName;
                this.$parent.childSearch({
                    industryName: row.industryName,
                })
                this.$nextTick(()=>{
                    this.showSecondDig = true;
                });
                $event.stopPropagation();
            },
            handleSelect(){

                this.$refs.singleTable.setCurrentRow();
                this.$parent.childSearch({
                    industryName: '',
                })
                this.industryName = '';
            },
            // 关闭弹框
            closeDialog(){
                this.showSecondDig = false;
            },
            stopEvent(e){
              e.stopPropagation();
            }
        },
        filters:{
            getRatio(num){
                return parseFloat((num*100).toFixed(2));
            }
        },

        mounted() {

        },
    };
</script>
<style scoped lang="scss">
    #industryAnalysisView {
        width: 100%;
        height: 100%;

        #industryAnalysisViewContent {
            width: 100%;
            height: 89%;
            margin-top: 20px;
            border: 1px solid #0468a2;
            padding: 5px;
            background: #051022;

            .el-table{
                height:100%;
                overflow: auto;
                &::before{
                    background:none;
                }
            }
            .el-table, .el-table__expanded-cell{
                background:none!important;;
            }
            .el-icon-sort-up{
                color:red;
            }
            .el-icon-sort-down{
                color:#0ac900;
            }
        }
    }
</style>
<style lang="scss">
    #industryAnalysisView {
        .tableClass{
          .cell{
            height:25px!important;
            line-height: 25px!important;
          }
        }
        .el-table tbody tr:hover>td,  .el-table__row.current-row > td{
            /*background-color:#3c5372!important*/
            background-color:#014d82!important
        }

        .cell-class-name {
            border-color: #051022;
            color:#a8d5e4;
        }

        .el-table__row:nth-of-type(even) {
            background: #0b203c !important;
        }
        .el-table__row:nth-of-type(odd) {
            background: #0d2647 !important;
        }

        .tab_header, .tab_header th {
            background: #0348a6 !important;
            color: #0190bf;
        }

        .el-table td, .el-table th.is-leaf{
            border-bottom:none;
        }
        .el-icon-the-up{
            width: 16px;
            height: 11px;
            background: url("../../images/icon_up.png")!important;
        }
        .el-icon-the-down{
            width: 16px;
            height: 11px;
            background: url("../../images/icon_down.png")!important;
        }
    }
</style>
