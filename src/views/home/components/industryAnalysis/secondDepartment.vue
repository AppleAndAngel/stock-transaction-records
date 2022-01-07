<template>
    <div class="mask-part-content" @click="stopEvent($event);">
        <div class="maskPart"></div>
        <div class="the-dialog" id="secondDepartmentDialog" >
            <i class="the-dialog-close" @click="closeDialog"></i>
            <div class="the-dialog-content"
                 style="height: 660px;display: flex;text-align: left;justify-content: center;">
                <div style="">
                    <div class="normal-border-box" style="width:960px;height: 310px;margin-bottom: 20px;">
                        <span class="title-center">【{{industryName}}】下二级行业诉求对比分析</span>
                        <!--对比分析图-->
                        <div id="contrastiveAnalysis"></div>
                    </div>
                    <div class="normal-border-box" style="width:960px;height: 310px;">
                        <span class="title-center">【{{secondIndustryName}}】诉求变化趋势分析</span>
                        <!--趋势分析图-->
                        <div id="trendAnalysis"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import * as echarts from "_echarts@5.1.2@echarts/index";
    import api from '../../apis/api'
    import TrendAnalysis from "../../interfaces/trendAnalysis";

    export default {
        name: "thirdDepartment",
        props: {
            industryName: {
                type: String,
                default() {
                    return '';
                },
            },
            dateActiveType: {
                type: String,
                default() {
                    return '';
                },
            }
        },
        watch: {
            industryName: {
                handler(val) {
                    if (val) {
                        this.getChartData()
                    }
                },
                immediate: true
            }
        },
        data() {
            return {
                calltype_options: null,
                calltype_view: null,
                countryName: '',
                trendAnalysisChar: null,
                thirdDepartmentShowStatus: false,
                secondIndustryName: '', // 二级行业名称
            }
        },
        mounted() {
            this.getChartData();
            this.getTrendAnalysis();
        },
        methods: {
            init_view_options(typeLists, numbersList) {
                this.calltype_options = {
                    grid: {
                        width:"90%",
                        height: "90%",
                        left: '20',
                        bottom: "0",
                        top: "middle",
                        containLabel: true,
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
                            color: "#a8d5e4",
                            formatter: function (value) {
                                if (value < 1000) {
                                    return value.toLocaleString();
                                }
                                return (value / 1000).toLocaleString() + 'K';
                            }
                        },
                        splitNumber: 4,
                        boundaryGap: [0, 0.1]

                    },
                    xAxis: {
                        type: "category",
                        data: typeLists,
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
                            type: "bar",
                            data: numbersList,
                            // barWidth: 30, //柱图宽度
                            showBackground: false,
                        },
                    ],
                };
            },
            draw_calltype_view() {
                this.calltype_view =
                    document.getElementById("contrastiveAnalysis") &&
                    echarts.init(document.getElementById("contrastiveAnalysis"), "macarons");

                this.calltype_view && this.calltype_view.setOption(this.calltype_options);
            },
            // 获取对比分析数据
            getChartData() {
                let param = {
                    time: this.$parent.$parent.theChooseDate,
                    industryName: this.industryName
                };
                api.getIndustrySecondDepartment().then(res => {
                  if (res.errcode === 0) {
                    this.secondIndustryName = this.industryName;
                    // 绘制对比分析图
                    if(res.data.contrastiveAnalysis && res.data.contrastiveAnalysis.length){
                      this.contrastiveAnalysisChartInit(res.data.contrastiveAnalysis);
                    }else{
                      try {
                        echarts.init(document.getElementById('contrastiveAnalysis')).dispose()
                      }catch (e) {
                      }
                    }
                  } else {
                    this.$message.error(res.errmsg)
                  }
                })
            },
              // 获取趋势分析数据
            getTrendAnalysis(name){
              let param = {
                time: this.$parent.$parent.theChooseDate, // 日期
                industryName: this.industryName, // 一级行业名称
                name: name || '', //当前选中的二级行业名称
              };
              api.getTrendAnalysis().then(res => {
                if (res.errcode === 0) {
                  // 绘制趋势分析图
                  if(res.data.trendAnalysis && res.data.trendAnalysis.length){
                    if(name){
                      res.data.trendAnalysis.splice(0,6)
                    }
                    this.trendAnalysisChartInit(res.data.trendAnalysis, name);
                  }else{
                    try {
                      echarts.init(document.getElementById('trendAnalysis')).dispose()
                    }catch (e) {
                    }
                  }
                } else {
                  this.$message.error(res.errmsg)
                }
              })
            },
            //关闭弹框
            closeDialog($event) {
                this.$emit('closeDialog');
                $event.stopPropagation();
            },
            //对比分析
            contrastiveAnalysisChartInit(dataLists) {
                if (dataLists && dataLists.length) {
                    let {xAxisData, valueArr} = this.getChartXYData(dataLists);
                    this.init_view_options(xAxisData, valueArr);
                    this.draw_calltype_view();
                    this.clickEventInit()
                } else {
                    try {
                        echarts.init(document.getElementById('contrastiveAnalysis')).dispose()
                    } catch (e) {

                    }
                }
            },
            //趋势分析
            trendAnalysisChartInit(dataLists, name) {
                this.trendAnalysisChar = echarts.init(document.getElementById("trendAnalysis"), "macarons");

                let {xAxisData, valueArr} = this.getChartXYData(dataLists);
                this.trendAnalysisChar.setOption({
                    grid: {
                        width:"90%",
                        height: "90%",
                        left: '20',
                        bottom: "0",
                        top: "middle",
                        containLabel: true,
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
                            color: "#a8d5e4",
                            formatter: function (value) {
                                if (value < 1000) {
                                    return value.toLocaleString();
                                }
                                return (value / 1000).toLocaleString() + 'K';
                            }
                        },
                        splitNumber: 4,
                        boundaryGap: [0, 0.1]

                    },
                    xAxis: {
                        type: "category",
                        data: xAxisData,
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
                            label: {
                                show: true,
                                position: "top",
                                textStyle: {color: "#a8d5e4"}, // 标签颜色
                                distance: 1,
                            },
                            symbol: 'circle', // 折线圈圈
                            symbolSize: 15, // 折线圈圈大小
                            itemStyle: {
                                color: '#02d169',
                            },
                            lineStyle: {
                                width: 3
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            type: "line",
                            data: valueArr,
                            // barWidth: 30, //柱图宽度
                            showBackground: true,
                            backgroundStyle: {
                                color: "#091a2f",
                                borderWidth: 4,
                                borderColor: "#01a3f4",
                            },
                        },
                    ],
                });

                this.clickTrendEventInit(name);
            },
            //获取xy轴数据
            getChartXYData(data) {
                let xAxisData = [], valueArr = [];
                data.forEach(item => {
                    xAxisData.push(item.name);
                    valueArr.push(item.value);
                });
                return {
                    xAxisData,
                    valueArr
                }
            },

            // 点击对比分析事件初始化
            clickEventInit(){
                this.calltype_view.on('click', (params) =>{
                    this.secondIndustryName = params.name;
                    this.$nextTick(()=>{
                        this.getTrendAnalysis(params.name);
                    })
                });
            },
          // 点击趋势分析事件初始化
          clickTrendEventInit(name){
            this.trendAnalysisChar.getZr().on('click', (params) =>{
              // 点击画布的空白处
              if(!params.target && name){
                this.secondIndustryName = this.industryName;
                this.$nextTick(()=>{
                  this.getTrendAnalysis('');
                })
              }
            });
          },
            stopEvent(e){
                e.stopPropagation();
            }
        }
    }
</script>

<style scoped>
    #secondDepartmentDialog {
        width: 1054px;
        height: 750px;
    }

    #contrastiveAnalysis, #trendAnalysis {
        width: 100%;
        height: 100%;
        position: relative;
        top: -44px;
        padding-top: 44px;
    }
</style>
