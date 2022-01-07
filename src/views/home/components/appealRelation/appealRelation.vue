<template>
  <div id="appealRelationPart">
    <span class="title-center">诉求关系</span>
    <div :id="'appealRelationContent'+from" @click="clickEvent">

    </div>
    <transition
        name="fade"
        enter-active-class="animate__animated animate__rotateInDownLeft"
        leave-active-class="animate__animated animate__rotateOutDownLeft"
    >
      <appealRelationDialog
              v-if="appealRelationShowStatus"
              @closeDialog="closeDialog"
              :appealRelation="appealRelation"
      >
      </appealRelationDialog>
    </transition>
  </div>
</template>
<script>
import * as echarts from "_echarts@5.1.2@echarts/index";
import appealRelationDialog from './appealRelationDialog'
export default {
  name: "appealRelationPart"+Math.random(),
  components:{
    appealRelationDialog
  },
  props: {
    appealRelation:{
      type:Object,
      default(){
        return {
          nodes: [],
          nodesRelations:[]
        };
      },
    },
    from:{
      type: String,
      default(){
        return '';
      },
    }
  },
  watch:{
    appealRelation:{
      handler(newVal){
        if(newVal && newVal.nodes && newVal.nodes.length) {
          this.chartInit();
          // this.acceptanceMapInit();
        } else {
          try {
            echarts.init(document.getElementById('appealRelationContent' + this.from)).dispose()
          }catch (e) {

          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      myChart: null,
      appealRelationShowStatus: false,
    };
  },
  mounted() {
  },
  methods: {
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
    clickEvent(){
        this.appealRelationShowStatus = true;
    },
    closeDialog(){
      this.appealRelationShowStatus = false;
    }
  },
};
</script>
<style scoped lang="scss">
#appealRelationPart{
  width: 100%;
  height: 100%;
  div[id*='appealRelationContent']{
    width: 100%;
    height: 100%;
    /*border: 1px solid rgb(204, 204, 204);*/
    position: relative;
    top: -44px;
    padding-top: 44px;
  }
}
</style>
