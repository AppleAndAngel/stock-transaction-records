<template>
  <div id="countiesRank">
        <span class="title-center">
            <span v-show="!countryName">各区县{{ chartTitle }}办理情况排名</span>
            <span v-show="countryName">【{{ countryName }}】{{ chartTitle }} 办理趋势分析</span>
            <span v-if="countryName" class="detail-info" @click="thirdDepartmentShow">详细信息</span>
        </span>
    <!-- legend小标题   -->
    <ul class="legend_box" v-show="showLegend" @click="changeLegend($event.target)">
      <li v-for="(item) in legendList" :class="{'unactive': unactiveList.includes(item.type)}">
        <i :data-type="item.type"
           :class="{'department-i': item.type === 'department', 'enterprise-i': item.type === 'enterprise', 'county-i': item.type === 'county'}"
        ></i>
        <span :data-type="item.type">{{ item.value }}</span>
      </li>
    </ul>
    <!--区县排名-->
    <div key="'countiesRankContent'" class="animate__animated animate__flipInX" v-if="!countryName" id="countiesRankContent"></div>
    <!--区县详情趋势图-->
    <div key="'countryDetail'" class="animate__animated animate__flipInX" v-else id="countryDetail"></div>

    <!--三级部门-->
    <transition
        name="fade"
        enter-active-class="animate__animated animate__rotateInDownLeft"
        leave-active-class="animate__animated animate__rotateOutDownLeft"
    >
        <thirdDepartment
            v-if="thirdDepartmentShowStatus"
            :country-name="countryName"
            @closeDialog="closeDialog"
        ></thirdDepartment>
    </transition>
  </div>
</template>
<script>
import * as echarts from "_echarts@5.1.2@echarts/index";
import api from '../../apis/api'
import thirdDepartment from './thirdDepartment'

export default {
  name: "countiesRank",
  components: {
    thirdDepartment
  },
  props: {
    countiesRank: {
      type: Array,
      default() {
        return []
      },
    },
  },
  watch: {
    countiesRank: {
      handler(dataLists) {
        if (dataLists && dataLists.length && !this.countryName) {
          let typeLists = [];
          let numbersList = [];
          let yoyList = [];
          let qoqList = [];

          if (!this.cancheRankLists.length) {
            this.cancheRankLists = dataLists;
          }

          dataLists.map((item) => {
            typeLists.push(item.name);
            let legendString = JSON.stringify(this.legendList);

            // 当月保存同比环比的数据
            if (this.$parent.dateActiveType === 'month') {
              yoyList.push(item.yoyValue);
              qoqList.push(item.qoqValue);
            }

            if (item.type === 'department') {
              numbersList.push({
                value: item.value,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: "#2fa276"},
                    {offset: 1, color: "#005aaf"},
                  ]),
                },
              });
              if (!legendString.includes(item.type)) {
                this.legendList.push({value: '部门', type: 'department'})
              }
            } else if (item.type === 'enterprise') {
              numbersList.push({
                value: item.value,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: "#9cfe29"},
                    {offset: 1, color: "#2ca905"},
                  ]),
                },
              });
              if (!legendString.includes(item.type)) {
                this.legendList.push({value: '市属企业', type: 'enterprise'})
              }
            } else {
              numbersList.push(item.value);


              if (!legendString.includes(item.type)) {
                this.legendList.push({value: '区县', type: 'county'})
              }
            }
          });

          this.init_view_options(typeLists, numbersList);

          // 当月增加显示同比环比
          if (this.$parent.dateActiveType === 'month') {
              this.calltype_options.legend =  {
                  data: ['同比', '环比'],
                      left: 'right',
                      itemWidth: 13,
                      itemHeight: 13,
                      itemGap: 5,
                      textStyle: {
                    color: '#005aaf'
                  },
                  selected: {
                    '同比': false,
                    '环比': false
                  }
              };
            this.calltype_options.series[1] = this.getCompareOption('同比', yoyList, ['#f5f524', '#d0ad0a'])
            this.calltype_options.series[2] = this.getCompareOption('环比', qoqList, ['#f5f524', '#d0ad0a'])
          } else {
            this.calltype_options.series = this.calltype_options.series.splice(0, 1);
          }
          this.draw_calltype_view();
        } else {
          try {
            echarts.init(document.getElementById('countiesRankContent')).dispose()
          } catch (e) {

          }
        }
      },
      immediate: true,
      deep: true,
    },
    '$parent.theChooseDate': {
      handler(val) {
        let result;
        switch (this.$parent.dateActiveType) {
          case 'day':
            if (val === this.newDate) {
              result = '当日'
            } else {
              let temp = val.split('-');
              result = temp[0] + '年' + temp[1] + '月' + temp[2] + '日';
            }
            break;
          case 'month':
            if (val === this.newDate.slice(0, 7)) {
              result = '当月'
            } else {
              let temp = val.split('-');
              result = temp[0] + '年' + temp[1] + '月';
            }
            break;
          case 'year':
            if (val === this.newDate.slice(0, 4)) {
              result = '当年'
            } else {
              let temp = val.split('-');
              result = temp[0] + '年';
            }
            break;
          case 'all':
            break;
        }
        this.chartTitle = result;
      },
      immediate: true,
      deep: true,
    }
  },
  computed: {},
  data() {
    return {
      calltype_options: null,
      calltype_view: null,
      countryName: '',
      countryDetailChar: null,
      thirdDepartmentShowStatus: false,
      chartTitle: '',
      newDate: this.dataFormat(new Date()),
      unactiveList: [], // 当前选中的tab
      legendList: [], // legent集合
      cancheRankLists: [], // 缓存排行数据
      showLegend: true, // 是否展示小标题
    };
  },
  mounted() {
  },
  methods: {
    init_view_options(typeLists, numbersList) {
      this.calltype_options = {
        grid: {
          height: "90%",
          left: "4%",
          right: "4%",
          bottom: "0",
          top: "5%",
          containLabel: true,
        },
        color: ['#f5f524', '#f5f524'],
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
          boundaryGap: [0, 0.1],
          max: function(value) {//设置y轴的最大值
            const str = parseInt(value.max).toString();
            const len = str.length;
            const fistNum = parseInt(str.substring(0,1)) + 1;
            return  (fistNum + 1) * Math.pow(10, len-1)
          },
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
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
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
          document.getElementById("countiesRankContent") &&
          echarts.init(document.getElementById("countiesRankContent"), "macarons");

      this.legendEventInit();
      this.calltype_view && this.calltype_view.setOption(this.calltype_options);
      this.clickEventInit();

    },
      // 点击区县事件初始化
      clickEventInit(){
          this.calltype_view.on('click', (params) =>{
              this.countryNameChange(params);
          });
      },
      countryNameChange(params){
          this.countryName = params.name;
          this.$nextTick(()=>{
              this.showLegend = false;
              this.$parent.childSearch({
                  countryName: params.name,
              })
              this.countryDetailChartInit();
              this.clickCityEventInit();
          })
      },
      // 城市详情趋势图事件初始化
      clickCityEventInit(){
          let _this =this;
          this.countryDetailChar.getZr().on('click', (params) =>{
              // 点击画布的空白处
              if(!params.target){
                  this.countryName = '';
                  this.$nextTick(()=>{
                    this.showLegend = true;
                    this.$parent.childSearch({
                          countryName: '',
                      })
                      this.countryDetailChar && this.countryDetailChar.dispose(); // 销毁其他地图
                      this.draw_calltype_view();
                  })
              }
          });
      },
    // 同比环比事件
    legendEventInit() {
      let _this = this;
      if (this.$parent.dateActiveType === 'month') {
        this.calltype_view.on('legendselectchanged', function (params) {
          let keys = Object.keys(params.selected);
          let currIndex = keys.indexOf(params.name);
          _this.calltype_options.legend.selected = {[params.name]: true, [keys[Number(!currIndex)]]: false}
          _this.calltype_view.setOption(_this.calltype_options);
        });
      }
    },
    //城市详情趋势图初始化
    countryDetailChartInit() {
      this.calltype_view && this.calltype_view.dispose(); // 销毁其他地图
      this.countryDetailChar = echarts.init(document.getElementById("countryDetail"), "macarons");
      let params = {
        countryName: this.countryName,
        time: this.$parent.theChooseDate,
      }
      api.getCountryTrend().then(res => {
        if (res.errcode === 0) {
          let {xAxisData, valueArr} = this.getChartXYData(res.data);
          this.countryDetailChar.setOption({
            grid: {
              height: "90%",
              left: "4%",
              right: "4%",
              bottom: "0",
              top: "5%",
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
        } else {
          this.$message.error(res.errmsg)
        }
      })
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
    // 同比、环比的比较数据
    getCompareOption(name, compareData, colorList) {
      let seriesData = {
        name: name,
        label: {
          show: true,
          position: "top",
          textStyle: {color: "#a8d5e4"}, // 标签颜色
          distance: 1,
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: colorList[0]},
            {offset: 1, color: colorList[1]},
          ]),
        },
        type: "bar",
        data: compareData,
        // barWidth: 30, //柱图宽度
        showBackground: false,
      }

      return seriesData;
    },

    // 选择legend小标题时的事件
    changeLegend(e) {
      let value = e.getAttribute('data-type')
      if (this.unactiveList.includes(value)) {
        this.unactiveList.splice(this.unactiveList.indexOf(value), 1);
      } else {
        this.unactiveList.push(value)
      }

      this.$parent.allChartData.countiesRank = this.cancheRankLists.concat();
      this.$parent.allChartData.countiesRank = this.$parent.allChartData.countiesRank.filter(item => {
        return (!this.unactiveList.includes(item.type))
      })
    },


    /*************************** 三级部门（详细信息） *****************************/
    thirdDepartmentShow() {
      this.thirdDepartmentShowStatus = true;
    },
    closeDialog() {
      this.thirdDepartmentShowStatus = false;
    },
    dataFormat(d) {
      const year = d.getFullYear();
      let month = d.getMonth() + 1 + '';
      let date = d.getDate() + '';
      month = month.length < 2 && '0' + month || month;
      date = date.length < 2 && '0' + date || date;
      return year + '-' + month + '-' + date;
    },
  },
};
</script>
<style scoped lang="scss">
#countiesRank {
  width: 100%;
  height: 100%;
  position: relative;

  .title-center {
    position: relative;

    .detail-info {
      font-size: 12px;
      display: inline-block;
      color: #fff;
      border: 1px solid #0190bf;
      line-height: 20px;
      padding: 3px 5px;
      border-radius: 5px;
      border-left: 2px solid #0190bf;
      border-right: 2px solid #0190bf;
      position: absolute;
      right: 4px;
      cursor: pointer;
      top: 7px;
      z-index: 99;
    }
  }

  .legend_box {
    position: absolute;
    z-index: 1;
    left: 20%;
    display: flex;
    justify-content: space-around;
    transform: translate(0, 3px);

    li {
      display: flex;
      align-items: center;
      cursor: pointer;

      i {
        display: inline-block;
        width: 13px;
        height: 13px;
        margin-right: 3px;
        border-radius: 50%;
        background-color: #f5f524;
        background-image: -moz-radial-gradient(#f5f524, #d0ad0a);
        background-image: -webkit-gradient(radial, center center, 0, center center, 220, from(#f5f524), to(#d0ad0a)); /* old */
        background-image: -webkit-radial-gradient(#f5f524, #d0ad0a); /* new syntax */
        background-image: radial-gradient(#f5f524, #d0ad0a);

        &.enterprise-i{
          background-color: #9cfe29;
          background-image: -moz-radial-gradient(#9cfe29, #2ca905);
          background-image: -webkit-gradient(radial, center center, 0, center center, 220, from(#9cfe29), to(#2ca905)); /* old */
          background-image: -webkit-radial-gradient(#9cfe29, #2ca905); /* new syntax */
          background-image: radial-gradient(#9cfe29, #2ca905);
        }

        &.department-i{
          background-color: #2fa276;
          background-image: -moz-radial-gradient(#2fa276, #005aaf);
          background-image: -webkit-gradient(radial, center center, 0, center center, 220, from(#2fa276), to(#005aaf)); /* old */
          background-image: -webkit-radial-gradient(#2fa276, #005aaf); /* new syntax */
          background-image: radial-gradient(#2fa276, #005aaf);
        }
      }

      span {
        display: inline-block;
        margin-right: 5px;
        color: #005aaf;
      }

      &.unactive {
        color: #ccc;

        i {
          background: #cccccc;
        }

        span {
          color: #ccc;
        }
      }

    }
  }
}

#countiesRankContent, #countryDetail {
  width: 100%;
  height: 100%;
  position: relative;
  top: -44px;
  padding-top: 44px;
}
</style>
