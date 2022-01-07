<template>
    <div  class="mask-part-content">
        <div class="maskPart"></div>
        <div class="the-dialog" id="thirdDepartmentDialog" style="">
            <i class="the-dialog-close" @click="closeDialog"></i>
            <div class="the-dialog-content" style="height: 660px;display: flex;text-align: left">
                <div  style="width: 808px;margin-right: 20px;">
                    <div class="normal-border-box" style="height: 358px;margin-bottom: 20px">
                        <span class="title-left">对标分析</span>
                        <!--对标分析图-->
                        <div id="benchmarkingAnalysis" class="title-left-content"></div>
                    </div>
                    <div class="normal-border-box" style="height: 286px">
                        <span class="title-center">【{{countryName}}】{{$parent.chartTitle}}办理情况排名</span>
                        <div id="handleRank" ></div>
                    </div>
                </div>
                <div class="normal-border-box" style="width: 454px;">
                    <span class="title-left">三级部门</span>
                    <div class="title-left-content">
                        <el-table
                                id="thirdTable"
                                ref="singleTable"
                                :data="thirdDepartmentData"
                                highlight-current-row
                                header-row-class-name="tab_header"
                                cell-class-name="cell-class-name"
                                style="width: 100%">
                            <el-table-column
                                    label="序号"
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    property="departmentName"
                                    label="部门名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    property="assignedNum"
                                    label="交办量"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    property="doneNum"
                                    label="办结量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import api from '../../apis/api'
    import * as echarts from "_echarts@5.1.2@echarts/index";
    export default {
        name: "thirdDepartment",
        props:{
            countryName:{
                type:String,
                default(){
                    return '';
                },
            }
        },
        data(){
            return{
                benchAnalysisChart: null,
                thirdDepartmentData: [],
            }
        },
        mounted() {
            this.getChartData();

        },
        methods:{
            getChartData(){
                let params = {
                    countryName: this.$parent.countryName,
                    time: this.$parent.$parent.theChooseDate,
                }
                api.getCountryThirdDepartment().then(res=>{
                    this.benchAnalysisChartInit(res.data.benchmarkingAnalysis);
                    this.thirdDepTableInit(res.data.thirdDepartmentData);
                    this.rankChartInit(res.data.rankInfo);
                })
            },
            //关闭弹框
            closeDialog(){
                this.$emit('closeDialog')
            },
            /****************************** 对标分析 ********************/
            benchAnalysisChartInit(data){
                // echarts.init(document.getElementById('benchmarkingAnalysis')).dispose()
                var chart = echarts.init(document.getElementById('benchmarkingAnalysis'));
                // this.benchAnalysisChart = chart;
                let {indicatorData,radarData,legendData} = this.convertBenchAnalysisChartData(data);
                const dotColor = ['rgba(5, 204, 56, 0.5)', 'rgba(5, 70, 204, 0.5)', 'rgba(80, 12, 164, 0.5)', 'rgba(144, 27, 87, 0.5)'];
                radarData = radarData.map((item, key) => {
                    item = Object.assign({},item,{
                      label:{
                        show: true,
                        color: '#fff'
                      },
                      itemStyle:{
                        borderColor: dotColor[key]
                      }
                    })
                    return item;
                });
                // indicatorData = indicatorData.map((item, key) => {
                //     this.$set(item, 'axisLabel', {});
                //     if(key !== 0){
                //         this.$set(item.axisLabel, 'show', false);
                //     }else{
                //         this.$set(item.axisLabel, 'show', true);
                //     }
                //     return item;
                // });
                chart.setOption({
                  color:['#07e250','#065fd3','#6512b9', '#b4297f'],// 设置每一组的颜色
                  legend: {
                        data: legendData,
                        type: 'scroll',
                        orient: 'vertical',
                        align: 'left',
                        top: 'auto',
                        right: 0,
                        textStyle:{
                            color: '#0190bf',
                        },
                        icon: 'circle',
                    },
                    radar: {
                        // shape: 'circle',
                        indicator: indicatorData,
                        axisLine: {// 隐藏坐标轴
                          show: false
                        },
                        splitLine:{
                          lineStyle:{
                            color:'#153550'
                          }
                        },
                        splitNumber: 6, // 分割线条数
                        splitArea: { // 分割区域的颜色
                          areaStyle: {
                            color:['#2a3f59','#253a53', '#20344d', '#1b2e46', '#15283f', '#0f2137']
                          },
                          show: true
                        }
                    },
                    series: [{
                        // name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        lineStyle:{
                          width: 4
                        },
                        symbolSize :12, //设置各个拐点的大小
                        data: radarData
                    }]
                });
            },
            convertBenchAnalysisChartData(data){
                let indicatorData = [],radarData = [],legendData = [];
                let checkRoadName = [];
                data.forEach((item,i) =>{
                    legendData.push(item.name);
                    radarData.push({
                        name:item.name,
                        value: getValue(item.roadInfo,i)
                    })
                });
                function getValue(roadInfo,i) {
                    let result = [];
                    checkRoadName[i] = '';
                    roadInfo.forEach(item =>{
                        result.push(item.value);
                        checkRoadName[i] += item.roadName + ',';
                    });
                    return result;
                }
                if(checkRoadName && checkRoadName.length) {
                    for(let i=1;i<checkRoadName.length;i++) {
                        if(checkRoadName[0] !== checkRoadName[i]) {
                            this.$message.error('roadName存在问题')
                        }
                    }
                    let temp = checkRoadName[0].split(',');
                    temp.pop();
                    indicatorData = temp.map(item =>{
                        return {
                            name: item,
                        }
                    })
                }
                return {
                    indicatorData,
                    radarData,
                    legendData
                }
            },

            //三级部门
            thirdDepTableInit(data){
                this.thirdDepartmentData = data;
            },

            /****************************** 排名情况 ********************/
            rankChartInit(data){
                var chart = echarts.init(document.getElementById('handleRank'));
                // this.benchAnalysisChart = chart;
                let {departmentNameList,assignedList,doneList} = this.convertRankChartData(data);
                chart.setOption({
                    grid: {
                        height: "90%",
                        left: "4%",
                        right: "4%",
                        bottom: "0",
                        top: "5%",
                        containLabel: true,
                    },
                    legend: {
                        data: ['交办量', '办结量'],
                        align: 'left',
                        top: 'auto',
                        right: 0,
                        textStyle:{
                            color: '#0190bf',
                        },
                        icon: 'rect',
                    },
                    yAxis: {
                        type: "value",
                        axisTick: {// 设置刻度线隐藏
                            show: false,
                        },
                        splitLine: { // 设置网格线隐藏
                            show: false,
                        },
                        //设置轴线的属性
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#01a3f4",
                            }
                        },
                        axisLabel: {
                            color:"#a8d5e4",
                            formatter: function (value) {
                                if (value < 1000) {
                                    return value.toLocaleString();
                                }
                                return (value / 1000).toLocaleString() + 'K';
                            }
                        },
                        splitNumber : 4,
                        boundaryGap : [ 0, 0.1 ]

                    },
                    xAxis: {
                        type: "category",
                        data: departmentNameList,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,//代表显示所有x轴标签显示
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#01a3f4",
                            },
                        },
                    },
                    series: [
                        {
                            name: '交办量',
                            label: {
                                show: true,
                                position: "top",
                                textStyle: {color: "#a8d5e4"}, // 标签颜色
                                distance: 1,
                            },
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {offset: 0, color: "#9cfe29"},
                                    {offset: 1, color: "#2ca905"},
                                ]),
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            type: "bar",
                            data: assignedList,
                            // barWidth: 30, //柱图宽度
                            showBackground: false,
                        },
                        {
                            name: '办结量',
                            label: {
                                show: true,
                                position: "top",
                                textStyle: {color: "#a8d5e4"}, // 标签颜色
                                distance: 1,
                            },
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {offset: 0, color: "#cbc303"},
                                    {offset: 1, color: "#a44805"},
                                ]),
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            type: "bar",
                            data: doneList,
                            // barWidth: 30, //柱图宽度
                            showBackground: false,
                        },
                    ],
                });
            },
            convertRankChartData(data) {
                let departmentNameList = [],assignedList = [], doneList = [];
                data.forEach(item =>{
                    departmentNameList.push(item.departmentName);
                    assignedList.push(item.assignedNum);
                    doneList.push(item.doneNum);
                });
                return {
                    departmentNameList,
                    assignedList,
                    doneList
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #thirdDepartmentDialog{
        width: 1383px;
        height: 769px;
        margin-top: 10px;

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
    }
    #handleRank{
        height: 212px;
    }
    #thirdDepartmentDialog {

    }
</style>
<style lang="scss">
    #thirdDepartmentDialog {
        .el-table tbody tr:hover>td,  .el-table__row.current-row > td{
            background-color:#3c5372!important
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
        #thirdTable{
            padding: 5px;
            border: 1px solid #073252;
            margin-top: 20px;
            height: 560px;

        }
    }
</style>
