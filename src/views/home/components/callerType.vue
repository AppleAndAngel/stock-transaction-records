<template>
  <div id="callerType">
    <span class="title-left">来电类别</span>
    <div id="callerTypeContent"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "CallerType",
  props: {
    callType: {
      type: Array,
      default: [],
    },
  },
  watch: {
    callType: {
      handler(dataLists) {
        if(dataLists && dataLists.length){
          let typeLists = [];
          let numbersList = [];

          dataLists.map((item) => {
            typeLists.push(item.name);
            numbersList.push(item.value);
          });

          this.init_view_options(typeLists, numbersList);
          this.draw_calltype_view();
        } else {
          this.calltype_view && this.calltype_view.dispose && this.calltype_view.dispose();
        }
      },
      // immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      calltype_options: null,
      calltype_view: {},
    };
  },
  methods: {
    draw_calltype_view() {
      this.calltype_view =
        document.getElementById("callerTypeContent") &&
        echarts.init(document.getElementById("callerTypeContent"), "macarons");
      this.calltype_view && this.calltype_view.setOption(this.calltype_options);
      this.clickEventInit();
      this.highlightEvent(this.$parent.searchParams.callType);
    },
    // 点击区县事件初始化
    clickEventInit(){
      // this.calltype_view.off('click');
      // this.calltype_view.getZr().off('click');
      this.calltype_view.on('click', (params) =>{
        // this.$parent.searchParams.callType = params.name;
        this.$parent.childSearch({
          callType: params.name,
        })
        this.highlightEvent(params.name);
      });

      this.calltype_view.getZr().on('click', (params) =>{
        // 点击画布的空白处
        if(!params.target && this.$parent.searchParams.callType){
          this.$parent.childSearch({
            callType: '',
          })
        }
      });

    },
    highlightEvent(name){
      this.calltype_view.dispatchAction({
        type: 'downplay',
      });
      this.calltype_view.dispatchAction({
        type: 'highlight',
        name: name,
      })
    },
    init_view_options(typeLists, numbersList) {
      this.calltype_options = {
        grid: {
          left: "2%",
          right: "0",
          bottom: "10",
          top: "5%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#a8d5e4",
              },
            },
            splitLine: {
              show: false,
            },
            // axisTick: {
            //   show: false,
            // },
            axisLine: {
              show: true,
            },
            // data: ["意见类", "建议类", "咨询类", "诉求类"],
            data: typeLists,
          },
          {
            type: "category",
            inverse: true,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
              // formatter: function (value) {
              //   if (value >= 1000) {
              //     return (value / 1000).toLocaleString() + "K";
              //   } else {
              //     return value.toLocaleString();
              //   }
              // },
            },
            data: numbersList,
            // data: [50000000, 22000000, 10000000, 5000000],
          },
        ],
        series: [
          {
            name: "来电类别",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)",
                  },
                ]),
              },
              emphasis: {
                show: true,
                borderWidth: 2,
                borderColor: '#3796aa',
                color: "#2b9b7c",
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              animationDelay: function (idx) {
                return idx * 100;
              }
            },
            barWidth: 10,
            data: numbersList,
            // data: [50000000, 22000000, 10000000, 5000000],
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 10,
            barGap: "-100%",
            data: numbersList,

            // data: [50000000, 50000000, 50000000, 50000000],
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,1)",
              },
            },
          },
        ],
        animationEasing: 'exponentialIn',
        animationDelayUpdate: function (idx) {
          return idx * 100;
        },
        animationDuration: 1000
      };
    },
  },

  mounted() {
    // this.init_view_options();
    // this.draw_calltype_view();
  },
};
</script>
<style scoped>
#callerType {
  width: 100%;
  height: 100%;
}
#callerTypeContent {
  width: 100%;
  height: 90%;
}
</style>
