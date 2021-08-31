<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Chart",
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    ...mapState("arrayAbout", ['dataArr', 'idArr', 'aniInt']),
  },
  mounted() {
    this.initChart()
    this.generateArr(10)
  },
  methods: {
    ...mapMutations('arrayAbout', ['generateArr']),
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.chart);
      const initOption = {
        grid: {
          show: true,
        },
        title: {
          text: "数组排序可视化演示",
        },
        xAxis: {
          type: "category",
          data: this.idArr,
          show: false,
          // scale: false
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: function (arg) {
            if (
              arg.componentType === "markPoint" ||
              arg.componentType === "markLine"
            ) {
              return (arg.data.name + ": " + arg.data.value).toString();
            }
            return (arg.dataIndex + ": " + arg.data).toString();
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {}, // 导出图片
            // dataView: {}, // 数据视图
            restore: {}, // 重置
            dataZoom: {}, // 区域缩放
            magicType: {
              type: ["bar", "line"],
            }, // 动态图表类型的切换
          },
        },
        series: [
          {
            name: "元素数值",
            type: "bar",
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "最大值",
                  itemStyle: {
                    color: '#909399'
                  }
                },
                {
                  type: "min",
                  name: "最小值",
                  itemStyle: {
                    color: '#909399'
                  },
                  symbolRotate: 180,
                  label: {
                    padding: [23, 0, 0, 0]
                  }
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                  itemStyle: {
                    color: '#909399'
                  },
                },
              ],
            },
            label: {
              show: true,
              rotate: 30,
              position: "inside",
            },
            barWidth: 30,
            data: this.dataArr,
          },
        ],
      };
      this.chartInstance.setOption(initOption);

      window.onresize = () => {
        this.chartInstance.resize();
      };
    },
  },
  watch: {
    dataArr: {
      deep: true,
      handler(newValue) {
        var newOption = {
          xAxis: {
            data: this.idArr,
          },
          series: [{
            data: newValue
          }],
        }
        this.chartInstance.setOption(newOption);
      },
    },
  },
};
</script>

<style scoped>
#chart {
  margin: 10px;
  height: 100%;
  width: auto;
}
</style>