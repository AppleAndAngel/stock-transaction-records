<template>
    <div class="mask-part-content">
        <div class="maskPart"></div>
        <div class="the-dialog" id="thirdDepartmentDialog" >
            <i class="the-dialog-close" @click="closeDialog"></i>
            <p class="the-dialog-title">诉求关系</p>
            <div class="the-dialog-content normal-border-box" style="height: 524px;">
                <div :id="'appealRelationContent'+from">

                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import * as echarts from "_echarts@5.1.2@echarts/index";
    export default {
        name: "appealRelationDialog",
        props:{
            appealRelation:{
                type:Object,
                default(){
                    return {
                        nodes: [],
                        nodesRelations:[]
                    };
                },
            }
        },
        data(){
            return{
                from: 'from',
                myChart: null,
            }
        },
        mounted() {
            this.chartInit();
        },
        methods:{
            //关闭弹框
            closeDialog(){
                this.$emit('closeDialog')
            },
            chartInit(){
                echarts.init(document.getElementById('appealRelationContent'+this.from)).dispose()
                var chart = echarts.init(document.getElementById('appealRelationContent'+this.from));
                this.myChart = chart;
                let data = this.getConvertData();
                let links = this.getLinksData();
                chart.setOption({
                    // tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            force: {
                                // initLayout: 'circular'
                                // gravity: 0
                                repulsion: 500,
                                edgeLength: 100
                            },
                            symbolSize: 30, // 节点大小
                            roam: true,
                            label: {
                                show: true,
                                position: 'top',
                                color: '#9bcfec',
                            },
                            edgeSymbol: ['circle'],
                            edgeSymbolSize: [4, 5],
                            edgeLabel: {
                                fontSize: 12 // 线上的字
                            },
                            itemStyle:{
                              shadowBlur: 10,
                              shadowColor: '#106ab6',
                              shadowOffsetY: 0,
                              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#0dbced'
                              }, {
                                offset: 1,
                                color: '#03268d'
                              }])
                            },
                            data: data,
                            // links: [],
                            links: links,
                            lineStyle: {
                                opacity: 0.9,
                                width: 2,
                                // curveness: 0, //曲线
                                color: '#0190bf'
                            }
                        }
                    ]
                });
            },
            /**
             * 获取转换data
             */
            getConvertData(){
                let result = [];
                if(this.appealRelation.nodes && this.appealRelation.nodes.length) {
                    this.appealRelation.nodes.forEach((item,i)=>{
                        let temp = {
                            name: item.name,
                        };
                        if(i === 0) {
                            Object.assign(temp,{
                                fixed: true,
                                x: this.myChart.getWidth() / 2,
                                y: this.myChart.getHeight() / 2,
                            })
                        }
                        if(item.type === 'organization') {
                            //组织样式
                            temp.itemStyle =  {
                                  shadowBlur: 10,
                                  shadowColor: '#e2dd0a',
                                  shadowOffsetY: 0,
                                  color: new echarts.graphic.RadialGradient(0.3, 0.4, 1, [{
                                    offset: 0,
                                    color: '#f1f10f'
                                  }, {
                                    offset: 1,
                                    color: '#8f6003'
                                  }])
                            }
                            temp.symbolSize = 50;
                        }
                        result.push(temp);
                    })
                }
                return result;
            },
            /**
             * 获取转换links
             */
            getLinksData(){
                /**
                 * {
              source: '节点2',
              target: '节点1',
              label: {
                show: true,
                color: '#0190bf',
                position: 'middle',
                formatter(){
                  return '99';
                }
              },
            }
                 */
                let result = [];
                if(this.appealRelation.nodesRelations && this.appealRelation.nodesRelations.length) {
                    this.appealRelation.nodesRelations.forEach((item,i)=>{
                        let temp = {
                            source: item.source,
                            target: item.target,
                            label: {
                                show: true,
                                color: '#0190bf',
                                position: 'middle',
                                formatter(){
                                    return item.value;
                                }
                            },
                        };
                        result.push(temp);
                    });
                }
                return result;
            },
        }
    }
</script>

<style scoped>
    #thirdDepartmentDialog{
        width: 1064px;
        height: 630px;
    }
    div[id*='appealRelationContent']{
        width: 100%;
        height: 100%;
        /*border: 1px solid rgb(204, 204, 204);*/
        /*position: relative;*/
        /*top: -44px;*/
        /*padding-top: 44px;*/
    }
</style>
