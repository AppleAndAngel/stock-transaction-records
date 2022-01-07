<template>
  <div id="mapContent">
      <div v-if="active === 'acceptanceMap'" style="position: absolute;top: 22px;display: inline-block;z-index: 99;">
          <el-radio v-model="mapType" label="1">全部</el-radio>
          <el-radio v-model="mapType" label="2">区县</el-radio>
      </div>
      <div style="position: absolute;top: 22px;right:20px;display: inline-block;z-index: 99;">
          <div type="primary" size="mini" @click="changeMap" id="changeTypeIcon"></div>
      </div>
      <div key="'dispatchMap'" class="animate__animated animate__flipInX"  v-if="active === 'dispatchMap'" id="dispatchMap" style="width: 100%; height: 100%"></div>
      <div key="'acceptanceMap'" class="animate__animated animate__flipInX"  v-else id="acceptanceMap" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import heilongjiangMapData from './mapJson/heilongjiang.json'
export default {
  name: "TheMap",
  props: {
    dispatchInfo:{
      type:Array,
      default(){
          return [];
      },
    },
    acceptanceInfo:{
      type:Array,
      default(){
        return [];
      },
    }
  },
  watch:{
    dispatchInfo:{
      handler(newVal){
          if(newVal && this.active === 'dispatchMap') {
              this.dispatchMapInit();
            // this.acceptanceMapInit();
          }else {
            if(this.active === 'dispatchMap') {
              this.myChart && this.myChart.dispose && this.myChart.dispose();
            }
          }
      },
      // immediate: true,
      deep: true,
    },
    acceptanceInfo:{
      handler(newVal){
        if(newVal && this.active === 'acceptanceMap') {
          this.acceptanceMapInit();
        } else {
          if(this.active === 'acceptanceMap') {
            this.myChart && this.myChart.dispose && this.myChart.dispose();
          }
        }
      },
      // immediate: true,
      deep: true,
    },
    '$parent.searchParams.countryName'(val){
      this.setSelectCountry(val)
    },
     'mapType':{
         handler(newVal){
             if(this.active === 'acceptanceMap') {
                 this.mapTypeChange(newVal);
             }
         },
     }
  },
  data() {
    return {
      myChart: null,
      active: 'dispatchMap', //dispatchMap
        mapType: '1',
    };
  },
  mounted() {
  },
  methods: {
    // 迁徙地图初始化
    dispatchMapInit(){
      echarts.registerMap('dispatchMap',heilongjiangMapData);
      echarts.init(document.getElementById('dispatchMap')).dispose()
      var chart = echarts.init(document.getElementById('dispatchMap'));
      this.myChart = chart;
      let markdata= this.convertData(heilongjiangMapData.features);
      let series = this.creatSeriesByData();
      // {
      //   type: 'map',
      //           map: 'dispatchMap',
      //         roam: true,
      //         itemStyle:{
      //   normal:{label:{show:true, color: '#0190bf',fontSize: 16}}, // 区县字体设置
      //   emphasis:{label:{show:true}}
      // },
      //   data:markdata,
      //   // 标记
      /*  markPoint:{
          symbolSize: 20,
          itemStyle: {
            normal: {
              borderColor: '#33CBFF',
              color:'#33CBFF',
              borderWidth: 1,            // 标注边线线宽，单位px，默认为1
              label: {
                show: true
              }
            }
          },
          data:markdata
        }*/
      // }

      chart.setOption({
        geo: {
          type: 'map',
          // itemStyle:{
          //   normal:{label:{show:true, color: '#0190bf',fontSize: 16}}, // 区县字体设置
          //   emphasis:{label:{show:true}}
          // },
          map: 'dispatchMap',
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          // aspectScale: 0.75,
          zoom: 1.3,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#0190bf',
                fontSize: 16
              }
            },
              select: {
                  show: false,
              },
            emphasis: { // 对应的鼠标悬浮效果
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 16
              }
            },
          },
            select:{
                label:{
                    color: '#0190bf',fontSize: 16
                },
                itemStyle:{
                    areaColor: '#152041',
                    borderColor: '#3796aa',
                    color: '#0190bf',fontSize: 16
                }
            },

          itemStyle: {
            normal: {
              areaColor: '#152041',
              borderColor: '#3796aa',
              label:{show:true, color: '#0190bf',fontSize: 16}
            },
            emphasis: {
              show: true,
              borderWidth: 2,
              borderColor: '#3796aa',
              // areaColor: "#10172b",
              areaColor: "#014d82",// #014d82  #2b9b7c
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
          },
          // markPoint:{
          //   symbolSize: 20,
          //   itemStyle: {
          //     normal: {
          //       borderColor: '#33CBFF',
          //       color:'#33CBFF',
          //       borderWidth: 1,            // 标注边线线宽，单位px，默认为1
          //       label: {
          //         show: true
          //       }
          //     }
          //   },
          //   data:[{
          //     coord: this.geoCoordByName('南岗区'),
          //     name: '南岗区',
          //     value: 99,
          //   }]
          // },
        },

        // dataRange: {
        //   min: 0,//颜色区间的最小值
        //   max: 50,//颜色区间的最大值，和data中的最大值一致
        //   x: 'left',
        //   y: 'bottom',
        //   // text:['高','低'], // 文本，默认为数值文本
        //   calculable : true,
        //   inRange: {
        //     //颜色区间
        //     color: ['lightskyblue','yellow', 'orangered','red']
        //   }
        // },
        // tooltip : {
        //   show:true,
        //   formatter: '在建工程<br /> {b}: {c0}'
        // },
        series: series
      });
      this.clickEventInit();
    },
    clickEventInit(){
      this.myChart.on('click', (params,e) =>{
        this.$parent.$refs.countiesRank.countryNameChange(params);
          params.event.stop()
      });
    },
    /**
     * 组装Series
     * @returns {Array}
     */
    creatSeriesByData(){
      let result = [];
      let data = [
        ['南岗区', this.dispatchInfo]
      ]; // 南岗区往各区县派单
      data.forEach((item,i)=>{
        result.push({
          // 系列名称，用于tooltip的显示
          name: item[0],
          type: 'lines',
          zlevel: 1, // 用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中
          // effect出发到目的地 的白色尾巴线条
          // 线特效的配置
          effect: {
            show: true,
            period: 3, // 特效动画的时间，单位为 s
            trailLength: 0.1, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
            color: '#f6ae0c', // 移动箭头颜色
            symbol: 'arrow', // // 箭头的svg
            symbolSize: 10 // 特效标记的大小
          },
          // lineStyle出发到目的地 的线条颜色
          lineStyle: {
            normal: {
              color: '#46bee9',
              width: 0,
              curveness: 0.2 //幅度
            }
          },
          data: this.convertDispatchData(item[1]) //开始到结束数据
        }, {
          //出发地信息
          name: item[0],
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 3,
            trailLength: 0,
            symbol: 'arrow',
            symbolSize: 6
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right',
          //     formatter: '{b}'
          //   }
          // },
          lineStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FFFFA8' // 出发
              }, {
                offset: 1,
                color: '#58B3CC ' // 结束 颜色
              }], false),
              width: 1.5,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: this.convertDispatchData(item[1])
        }, {
          // 目的地信息
          name: item[0],
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function(val) {
            let result = (val[2] / 8) > 99 ? 99 : (val[2] / 8);
            return result;
          },
          itemStyle: {
            normal: {
              color: '#FFFFA8'
            }
          },
          data: item[1].map((dataItem) => {
            return {
              name: dataItem[1].name,
              value: this.geoCoordByName(dataItem[1].name).concat([dataItem[1].value])
            };
          })
        })
      });

      result.push({
        name: '标记起始点',
        type: 'map',
        geoIndex: 0,
        markPoint:{
          symbolSize: 20,
          data:[{
                coord: this.geoCoordByName('南岗区'),
                name: '南岗区',
                value: '南岗区',
              }]
        }
      })
      return result;
    },

    // 区县数据和地图数据匹配
    convertData(arrs){
      var markdata=[];
      var valuess=[50,20,0,30,15,25,48,10,5,38];
      for(var i=0; i<arrs.length; i++){
        markdata.push({})
        markdata[i].coord=arrs[i].properties.center;
        markdata[i].name=arrs[i].properties.name;
        markdata[i].value=valuess[i]
      }
      return markdata
    },

    // push进去线路开始-结束地点-经纬度
    convertDispatchData(data){
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.geoCoordByName(dataItem[0].name);
        var toCoord = this.geoCoordByName(dataItem[1].name);
        if (fromCoord && toCoord) {
          res.push([{
            coord: fromCoord
          }, {
            coord: toCoord
          }]);
        }
      }
      return res;
    },

    //根据区县名字获取经纬度
    geoCoordByName(name){
      for(let i=0; i<heilongjiangMapData.features.length;i++) {
        if(heilongjiangMapData.features[i].properties.name === name) {
          return heilongjiangMapData.features[i].properties.center;
          break;
        }
      }
      return false;
    },
    //地图切换
    changeMap(type){
      this.myChart.dispose();
      this.mapType = '1';
        this.active = (this.active === 'dispatchMap') ? 'acceptanceMap' : 'dispatchMap';
      if(this.active === 'acceptanceMap') {
        this.$nextTick(()=>{
          this.acceptanceMapInit();
          try {
            this.setSelectCountry(this.$parent.searchParams.countryName);
          }catch (e) {
          }
        })
      } else {
        this.$nextTick(()=>{
          this.dispatchMapInit();
          try {
            this.setSelectCountry(this.$parent.searchParams.countryName);
          }catch (e) {
          }
        })
      }
    },

    /************************************ 受理情况地图 **********************************/
    // 受理情况地图初始化
    acceptanceMapInit(){
      echarts.init(document.getElementById('acceptanceMap')).dispose()
      echarts.registerMap('acceptanceMap',heilongjiangMapData);
      var chart = echarts.init(document.getElementById('acceptanceMap'));
      this.myChart = chart;
      let {markdata,max,min}= this.convertAcceptanceData(heilongjiangMapData.features);
      // let series = this.creatSeriesByData();

      chart.setOption({
        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        // aspectScale: 0.75,
          zoom: 1.3,
        dataRange: {
          min: min,//颜色区间的最小值
          max: max,//颜色区间的最大值，和data中的最大值一致
          x: 'left',
          y: 'bottom',
          text:['高','低'], // 文本，默认为数值文本
          calculable : false,
          show: false,
          inRange: {
            //颜色区间
            //   color: ["rgba(220,220,220,1)","rgba(255,204,204,1)", "rgba(255,153,153,1)", "rgba(255,102,102,1)", "rgba(255,49,49,1)", "rgba(206,4,8,1)"],
            //   color: ['#0a0e1a','#05325c'],  // '#0a0e1a','#05325c'
              color: ['#3282be'],  // '#0a0e1a','#05325c'
            //   color: ['#f0a8a6','#e9eb94','#66a8cb'],  // '#0a0e1a','#05325c'
            //   color: ['#c0d6eb','#09529f'],  // '#0a0e1a','#05325c'
          }
        },
          select:{
              label:{
                  // color: '#0190bf',fontSize: 16,
                  color: '#3282be',fontSize: 16,
              },
              itemStyle:{
                  // areaColor: '#153b6b',
                  areaColor: '#ccc',
                  borderColor: '#3796aa',
                  label:{show:true, color: '#0190bf',fontSize: 12, borderColor: '#3796aa',}
              }
          },
        series: [{
          type: 'map',
          map: 'acceptanceMap',
          zoom: 1.3,
          itemStyle: {
            normal: {
              // areaColor: '#153b6b',
              areaColor: '#3282be', // '#0a0e1a'
              borderColor: '#0a0e1a',
              label:{
                  show:true, color: '#fff',fontSize: 12, borderColor: '#0a0e1a',
                  rich:{
                      num:{
                          // padding: [0, 10, 10, 10],
                          color:'#ff7f37',
                          fontSize: 22,
                          fontWeight: 700
                      },
                  },
                  formatter(a,b,c) {
                      let val = a.value ? a.value : '';
                      val = '{num|'+val+'}\n'
                      return val + a.name;
                  }
              }
            },
              select: {
                  show: false,
                  areaColor: '#153b6b',
                  borderColor: '#3796aa',
                  label:{show:true, color: '#0190bf',fontSize: 12, borderColor: '#3796aa',}
              },
            emphasis: {
              show: true,
              borderWidth: 2,
              borderColor: '#3796aa',
              // color: "#0190bf",
              label:{show:true, color: '#fff',fontSize: 16, borderColor: '#3796aa',},
              areaColor: "#014d82", // #014d82  #2b9b7c
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
          },
          data:markdata,
        }]
      });
      this.clickEventInit();
    },
    // 区县数据和地图数据匹配
    convertAcceptanceData(arrs){
      var markdata=[];
      let max = 0, min = 0;
      this.acceptanceInfo.forEach((item,index)=>{
        arrs.forEach((child,i)=>{
          if(item.name === child.properties.name) {
            markdata.push({
              coord:child.properties.center,
              name:child.properties.name,
              value:item.acceptanceNum,
            });
            max = (item.acceptanceNum > max) ? item.acceptanceNum : max;
            min = (item.acceptanceNum < min) ? item.acceptanceNum : min;
          }
        })
      })
      return {
        markdata,
        max,
        min
      }
    },
    setSelectCountry(countryName){
      this.myChart.dispatchAction({
        type: 'downplay',

        // 用 index 或 id 或 name 来指定系列。
        // 可以使用数组指定多个系列。
        // seriesIndex?: number | number[],
        // seriesId?: string | string[],
        // seriesName?: string | string[],

        // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
        // dataIndex?: number | number[],
        // 可选，数据项名称，在有 dataIndex 的时候忽略
        // name: countryName,
      })
      this.myChart.dispatchAction({
        type: 'highlight',

        // 用 index 或 id 或 name 来指定系列。
        // 可以使用数组指定多个系列。
        // seriesIndex?: number | number[],
        // seriesId?: string | string[],
        // seriesName?: string | string[],

        // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
        // dataIndex?: number | number[],
        // 可选，数据项名称，在有 dataIndex 的时候忽略
        name: countryName,
      })
    },

      mapTypeChange(val) {
        if(val == '2'){
            this.myChart.setOption({
                // roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                center: [126.652098,45.755971],
                series:[{
                    zoom: 3,
                    // itemStyle:{
                    //     normal:{
                    //         label:{
                    //             rich:{
                    //                 num:{
                    //                     // padding: [0, 10, 10, 10],
                    //                     color:'#ff7f37',
                    //                     fontSize: 22,
                    //                     fontWeight: 700
                    //                 },
                    //             },
                    //             formatter(a,b,c) {
                    //                 let val = a.value ? a.value : '';
                    //                 val = '{num|'+val+'}\n'
                    //                 return val + a.name;
                    //             }
                    //         }
                    //     }
                    // }
                }]
            });
        } else {
            // this.myChart.setOption({
            //     // roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            //     center: [126.642464,45.756967],
            //     series:[{
            //         zoom: 1.3,
            //     }]
            // });
            this.acceptanceMapInit();
        }
          this.setSelectCountry(this.$parent.searchParams.countryName);

      }
  },
};
</script>
<style scoped>
#mapContent{
  width: 100%;
  height: 100%;
  padding: 20px;
    position: relative;
}
#changeTypeIcon{
    background-image: url("../../images/change.png");
    background-size: 100% 100%;
    background-repeat:no-repeat;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>
