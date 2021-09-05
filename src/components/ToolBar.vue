<template>
  <div>
    <div id="tool-bar">
      <el-row>
        <el-col :span="8" class="v-col">
          <div class="box">
            <el-row class="h-row"> <h1>数组操作</h1> </el-row>
            <el-row class="h-row">
              <el-row class="m-row">
                <el-row class="i-row">
                  <h2>末尾插入随机数</h2>
                </el-row>
                <el-row>
                  <el-col :span="5" class="v-col">
                    <p>插入随机数数量</p>
                  </el-col>
                  <el-col :span="14" class="v-col">
                    <el-input-number
                      v-model="generateNum"
                      :min="1"
                      :max="10"
                      label="插入数量"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="5" class="v-col">
                    <el-button
                      :disabled="disabled"
                      @click="generateArr(generateNum)"
                      >插入</el-button
                    >
                  </el-col>
                </el-row>
              </el-row>
              <el-row class="m-row">
                <el-col :span="19"> <h2>清空数组</h2> </el-col>
                <el-col :span="5" class="v-col">
                  <el-button :disabled="disabled" @click="clearArr"
                    >清空</el-button
                  >
                </el-col>
              </el-row>
              <el-row class="m-row">
                <el-col :span="19"> <h2>打乱数组顺序</h2> </el-col>
                <el-col :span="5" class="v-col">
                  <el-button :disabled="disabled" @click="shuffleArr"
                    >打乱</el-button
                  >
                </el-col>
              </el-row>
              <el-row class="m-row">
                <el-col :span="19"> <h2>数组直接排序</h2> </el-col>
                <el-col :span="5" class="v-col">
                  <el-button :disabled="disabled" @click="sortArr"
                    >排序</el-button
                  >
                </el-col>
              </el-row>
              <el-row class="m-row">
                <el-col :span="19"> <h2>数组分步排序</h2> </el-col>
                <el-col :span="5" class="v-col">
                  <el-button :disabled="disabled" @click="stepSort"
                    >排序</el-button
                  >
                </el-col>
              </el-row>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8" class="v-col">
          <div class="box">
            <el-row class="h-row"> <h1>元素操作</h1> </el-row>
            <el-row class="h-row">
              <el-row class="m-row">
                <el-row class="i-row">
                  <h2>任意位置插入元素</h2>
                </el-row>
                <el-row>
                  <el-col :span="5" class="v-col">
                    <p>插入元素位置</p>
                  </el-col>
                  <el-col :span="19" class="v-col">
                    <el-slider
                      v-model="insertIndex"
                      :min="0"
                      :max="dataArr.length"
                      label="插入元素位置"
                      style="width: 80%"
                    ></el-slider>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" class="v-col">
                    <p>插入元素数值</p>
                  </el-col>
                  <el-col :span="14" class="v-col">
                    <el-input-number
                      v-model="insertValue"
                      :min="-50"
                      :max="50"
                      label="插入元素数值"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="5" class="v-col">
                    <el-button
                      :disabled="disabled"
                      @click="
                        insertElem({ index: insertIndex, value: insertValue })
                      "
                      >插入</el-button
                    >
                  </el-col>
                </el-row>
              </el-row>
              <el-row class="m-row">
                <el-row class="i-row">
                  <h2>删除任意位置元素</h2>
                </el-row>
                <el-row>
                  <el-col :span="5" class="v-col">
                    <p>删除元素位置</p>
                  </el-col>
                  <el-col :span="14" class="v-col">
                    <el-slider
                      v-model="deleteIndex"
                      :min="0"
                      :max="dataArr.length == 0 ? 0 : dataArr.length - 1"
                      label="删除元素位置"
                      style="width: 80%"
                    ></el-slider>
                  </el-col>
                  <el-col :span="5" class="v-col">
                    <el-button
                      :disabled="disabled"
                      @click="deleteElem(deleteIndex)"
                      >删除</el-button
                    >
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8" class="v-col">
          <div class="box last">
            <el-row class="h-row"> <h1>排序选项</h1> </el-row>
            <el-row class="h-row">
              <el-row class="m-row">
                <el-row class="i-row">
                  <h2>排序方向</h2>
                </el-row>
                <el-row class="i-row">
                  <el-radio
                    :disabled="disabled"
                    name="order"
                    v-model="aOrder"
                    :label="true"
                    >非降序</el-radio
                  >
                  <el-radio
                    :disabled="disabled"
                    name="order"
                    v-model="aOrder"
                    :label="false"
                    >非升序</el-radio
                  >
                </el-row>
              </el-row>
              <el-row class="m-row">
                <el-row class="i-row">
                  <h2>排序种类</h2>
                </el-row>
                <el-row class="i-row">
                  <el-cascader
                    :disabled="disabled"
                    v-model="sortMethod"
                    placeholder="请选择排序种类"
                    :options="options"
                  >
                  </el-cascader>
                </el-row>

                <el-row
                  v-show="sortMethod[0] == 0 && sortMethod[1] == 2"
                  class="i-row s-row"
                >
                  <el-col :span="5" class="v-col">
                    <p>增量序列长度</p>
                  </el-col>
                  <el-col :span="19" class="v-col">
                    <el-input-number
                      :disabled="disabled"
                      v-model="dlta.length"
                      :min="1"
                      :max="5"
                      label="插入数量"
                      :step="1"
                      @change="lenChange"
                    ></el-input-number>
                  </el-col>
                </el-row>
                <el-row
                  v-show="sortMethod[0] == 0 && sortMethod[1] == 2"
                  class="i-row"
                  v-for="(value, index) of dlta"
                  :key="index"
                >
                  <el-col :span="5" class="v-col s-line">
                    <p>增量{{ index }}</p>
                  </el-col>
                  <el-col :span="19" class="v-col">
                    <el-input-number
                      :disabled="disabled"
                      v-model="dlta[index]"
                      :min="index == dlta.length - 1 ? 1 : dlta[index + 1] + 1"
                      :max="maxDlta[index]"
                      label="增量值"
                      :step="1"
                      controls-position="right"
                      @change="dltChange(index)"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-row>
              <el-row class="m-row">
                <el-row class="i-row">
                  <h2>动画间隔 / ms</h2>
                </el-row>
                <el-row id="i-row">
                  <el-slider
                    :disabled="disabled"
                    v-model="aniInt"
                    :min="200"
                    :max="1000"
                    label="动画间隔"
                    :step="10"
                  ></el-slider>
                </el-row>
              </el-row>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

function convertToNumList(arr) {
  var numList = [];
  for (var i = 0; i < arr.length; i++) {
    numList.push(arr[i].value);
  }
  return numList;
}

export default {
  name: "ToolBar",
  data() {
    return {
      options: [
        {
          value: 0,
          label: "插入排序",
          children: [
            {
              value: 0,
              label: "直接插入排序",
            },
            {
              value: 1,
              label: "折半插入排序",
            },
            {
              value: 2,
              label: "希尔排序",
            },
          ],
        },
        {
          value: 1,
          label: "交换排序",
          children: [
            {
              value: 0,
              label: "冒泡排序",
            },
            {
              value: 1,
              label: "快速排序",
            },
          ],
        },
        {
          value: 2,
          label: "选择排序",
          children: [
            {
              value: 0,
              label: "简单选择排序",
            },
            {
              value: 1,
              label: "堆排序",
            },
          ],
        },
        {
          value: 3,
          label: "归并排序",
          children: [
            {
              value: 0,
              label: "2-路归并排序",
            },
          ],
        },
      ],
      generateNum: 5,
      insertIndex: 0,
      insertValue: 0,
      deleteIndex: 0,
      aOrder: true,
      sortMethod: [0, 0],
      timer: 0,
      aniInt: 600,
      dlta: [5, 3, 1],
      disabled: false,
    };
  },
  computed: {
    ...mapState("arrayAbout", ["dataArr", "idArr", "ascendingOrder"]),
    maxDlta() {
      var maxDlta = [];
      for (var i = 0; i < this.dlta.length; ++i) {
        if (i == this.dlta.length - 1) {
          maxDlta.push(1);
        } else if (i == 0) {
          maxDlta.push(NaN);
        } else {
          maxDlta.push(this.dlta[i - 1] - 1);
        }
      }
      return maxDlta;
    },
  },
  methods: {
    ...mapMutations("arrayAbout", [
      "generateArr",
      "shuffleArr",
      "sortArr",
      "clearArr",
      "exchangeElem",
      "deleteElem",
      "insertElem",
      "selectElem",
      "deselectElem",
      "selectPart",
      "deselectPart",
      "changeOrder",
      "changeAniInt",
      "editElem",
      "moveElem",
    ]),
    shinePart(start, end, select = true, color = "#E6A23C") {
      if (select) {
        ((l, h) => {
          setTimeout(() => {
            this.selectPart([l, h, color]);
          }, this.aniInt * this.timer - this.aniInt / 4);
        })(start, end);
        ((l, h) => {
          setTimeout(() => {
            this.deselectPart([l, h]);
          }, this.aniInt * this.timer);
        })(start, end);
        ((l, h) => {
          setTimeout(() => {
            this.selectPart([l, h, color]);
          }, this.aniInt * this.timer++ + this.aniInt / 4);
        })(start, end);
      } else {
        ((l, h) => {
          setTimeout(() => {
            this.deselectPart([l, h]);
          }, this.aniInt * this.timer - this.aniInt / 4);
        })(start, end);
        ((l, h) => {
          setTimeout(() => {
            this.selectPart([l, h, color]);
          }, this.aniInt * this.timer);
        })(start, end);
        ((l, h) => {
          setTimeout(() => {
            this.deselectPart([l, h]);
          }, this.aniInt * this.timer++ + this.aniInt / 4);
        })(start, end);
      }
    },
    stepSort() {
      if (this.dataArr.length == 0 || this.dataArr.length == 1) {
        return;
      }
      this.disabled = true;
      // 计数器清零
      this.timer = 0;
      if (this.sortMethod[0] == 0) {
        if (this.sortMethod[1] == 0) {
          this.InsertSort();
        } else if (this.sortMethod[1] == 1) {
          this.BInsertSort();
        } else if (this.sortMethod[1] == 2) {
          this.ShellSort();
        }
      } else if (this.sortMethod[0] == 1) {
        if (this.sortMethod[1] == 0) {
          this.BubbleSort();
        } else if (this.sortMethod[1] == 1) {
          this.QuickSort();
        }
      } else if (this.sortMethod[0] == 2) {
        if (this.sortMethod[1] == 0) {
          this.SelectSort();
        } else if (this.sortMethod[1] == 1) {
          this.HeapSort();
        }
      } else if (this.sortMethod[0] == 3) {
        if (this.sortMethod[1] == 0) {
          this.MergeSort();
        }
      }
      setTimeout(() => {
        this.disabled = false;
      }, this.aniInt * this.timer++);
    },

    // 处理增量序列长度变化
    lenChange(newValue, oldValue) {
      var i,
        newDlta = this.dlta.concat([]);
      console.log(this.dlta);
      this.dlta.length = oldValue;
      if (newValue > oldValue) {
        for (i = 0; i < newValue - oldValue; ++i) {
          this.dlta.unshift(this.dlta[0] + 2);
        }
      } else {
        for (i = 0; i < oldValue - newValue; ++i) {
          newDlta.shift();
        }
        newDlta[newValue - 1] = 1;
        this.dlta = newDlta;
      }
      console.log(this.dlta);
    },

    // 处理增量序列内容变化
    dltChange(newValue, _, index) {
      var newDlta = this.dlta.concat([]);
      newDlta[index] = newValue;
      this.dlta = newDlta;
    },

    // 延时选中单个元素
    selectElemWithDelay(index, color = "#E6A23C") {
      ((i, c) => {
        setTimeout(() => {
          this.selectElem([i, c]);
        }, this.aniInt * this.timer++);
      })(index, color);
    },

    // 延时反选单个元素
    deselectElemWithDelay(index) {
      ((i) => {
        setTimeout(() => {
          this.deselectElem(i);
        }, this.aniInt * this.timer++);
      })(index);
    },

    // 延时选中某部分元素
    selectPartWithDelay(index1, index2, color = "#E6A23C") {
      ((i, j, c) => {
        setTimeout(() => {
          this.selectPart([i, j, c]);
        }, this.aniInt * this.timer++);
      })(index1, index2, color);
    },

    // 延时反选某部分元素
    deselectPartWithDelay(index1, index2) {
      ((i, j) => {
        setTimeout(() => {
          this.deselectPart([i, j]);
        }, this.aniInt * this.timer++);
      })(index1, index2);
    },

    // 直接插入排序
    InsertSort() {
      // 深拷贝原数组
      var newDataArr = convertToNumList(this.dataArr);
      newDataArr.unshift(0);
      this.selectElemWithDelay(0);
      var i, j;
      for (i = 2; i <= newDataArr.length - 1; i++) {
        this.shinePart(i - 1, i - 1, true, "#F56C6C");
        if (
          (this.ascendingOrder && newDataArr[i] < newDataArr[i - 1]) ||
          (!this.ascendingOrder && newDataArr[i] > newDataArr[i - 1])
        ) {
          newDataArr[0] = newDataArr[i];
          newDataArr[i] = newDataArr[i - 1];
          ((i) => {
            setTimeout(() => {
              this.exchangeElem([i - 1, i]);
            }, this.aniInt * this.timer++);
          })(i - 1);
          for (
            j = i - 2;
            (this.ascendingOrder && newDataArr[0] < newDataArr[j]) ||
            (!this.ascendingOrder && newDataArr[0] > newDataArr[j]);
            j--
          ) {
            newDataArr[j + 1] = newDataArr[j];
            ((j) => {
              setTimeout(() => {
                this.exchangeElem([j + 1, j]);
              }, this.aniInt * this.timer++);
            })(j - 1);
          }
          newDataArr[j + 1] = newDataArr[0];
          this.selectElemWithDelay(j);
        } else {
          this.selectElemWithDelay(i - 1);
        }
      }
      setTimeout(() => {
        this.deselectPart([0, this.dataArr.length - 1]);
      }, this.aniInt * this.timer++);
    },

    // 折半插入排序
    BInsertSort() {
      var m, low, high, left, right;
      // 深拷贝原数组
      var newDataArr = convertToNumList(this.dataArr);
      newDataArr.unshift(0);
      for (var i = 2; i <= newDataArr.length - 1; ++i) {
        newDataArr[0] = newDataArr[i];
        // this.selectElemWithDelay(i - 1);
        this.shinePart(i - 1, i - 1, true, "#F56C6C");
        low = 1;
        high = i - 1;
        ((l, h) => {
          setTimeout(() => {
            this.selectPart([l, h]);
          }, this.aniInt * this.timer++);
        })(low - 1, high - 1);
        while (low <= high) {
          m = Math.floor((low + high) / 2);
          if (
            (this.ascendingOrder && newDataArr[0] < newDataArr[m]) ||
            (!this.ascendingOrder && newDataArr[0] > newDataArr[m])
          ) {
            this.deselectPartWithDelay(m - 1, high - 1);
            high = m - 1;
          } else {
            this.deselectPartWithDelay(low - 1, m - 1);
            low = m + 1;
          }
        }
        left = high == i - 1 ? high + 1 : high;
        right = high + 1;
        this.shinePart(left - 1 < 0 ? 0 : left - 1, right - 1, left !== right);
        if (left === right) {
          continue;
        }
        for (var j = i - 1; j >= high + 1; --j) {
          newDataArr[j + 1] = newDataArr[j];
        }
        ((i, h) => {
          setTimeout(() => {
            this.moveElem([i, h + 1]);
          }, this.aniInt * this.timer++);
        })(i - 1, high - 1);
        this.deselectPartWithDelay(
          left - 1 < 0 ? 0 : left - 1,
          right < this.dataArr.length ? right : this.dataArr.length - 1
        );
        newDataArr[high + 1] = newDataArr[0];
      }
      console.log(newDataArr);
    },

    // 希尔排序
    ShellSort() {
      var newDataArr = convertToNumList(this.dataArr);
      newDataArr.unshift(0);
      for (var k = 0; k < this.dlta.length; ++k) {
        this.ShellInsert(newDataArr, this.dlta[k]);
      }
      console.log(newDataArr);
    },
    ShellInsert(newDataArr, dk) {
      for (var i = dk + 1; i < newDataArr.length; ++i) {
        this.shinePart(i - 1, i - 1, true, "#F56C6C");
        // this.selectElemWithDelay(i - 1, "#F56C6C");
        this.selectElemWithDelay(i - 1 - dk);
        if (
          (this.ascendingOrder && newDataArr[i] < newDataArr[i - dk]) ||
          (!this.ascendingOrder && newDataArr[i] > newDataArr[i - dk])
        ) {
          newDataArr[0] = newDataArr[i];
          for (
            var j = i - dk;
            j > 0 &&
            ((this.ascendingOrder && newDataArr[0] < newDataArr[j]) ||
              (!this.ascendingOrder && newDataArr[0] > newDataArr[j]));
            j -= dk
          ) {
            newDataArr[j + dk] = newDataArr[j];
            ((i, j) => {
              setTimeout(() => {
                this.exchangeElem([i, j]);
              }, this.aniInt * this.timer++);
            })(j - 1, j - 1 + dk);
            ((j, dk) => {
              setTimeout(() => {
                this.deselectElem(j - 1 + dk);
                console.log(j - 1 - dk);
                if (j - 1 - dk >= 0) {
                  this.selectElem([j - 1 - dk]);
                }
              }, this.aniInt * this.timer++);
            })(j, dk);
          }
          newDataArr[j + dk] = newDataArr[0];
        }
        this.deselectPartWithDelay(0, this.dataArr.length - 1);
      }
      ((len) => {
        setTimeout(() => {
          this.deselectPart([0, len - 1]);
        }, this.aniInt * this.timer++);
      })(this.dataArr.length);
    },

    // 冒泡排序
    BubbleSort() {
      var newDataArr = convertToNumList(this.dataArr);
      for (var j = 0; j < newDataArr.length - 1; ++j) {
        this.shinePart(0, 0, true, "#F56C6C");
        for (var i = 0; i < newDataArr.length - 1 - j; ++i) {
          ((i) => {
            setTimeout(() => {
              this.selectElem([i + 1]);
              // this.selectPart(i + 1, i + 1);
              // this.selectPart([i, i + 1]);
            }, this.aniInt * this.timer++);
          })(i);
          if (
            (this.ascendingOrder && newDataArr[i] > newDataArr[i + 1]) ||
            (!this.ascendingOrder && newDataArr[i] < newDataArr[i + 1])
          ) {
            [newDataArr[i], newDataArr[i + 1]] = [
              newDataArr[i + 1],
              newDataArr[i],
            ];
            ((i) => {
              setTimeout(() => {
                this.exchangeElem([i, i + 1]);
              }, this.aniInt * this.timer++);
            })(i);
          } else {
            ((i) => {
              this.shinePart(i + 1, i + 1, true, "#F56C6C");
            })(i);
          }
          ((i) => {
            setTimeout(() => {
              this.deselectElem(i);
            }, this.aniInt * this.timer);
          })(i);
        }
        ((j, l) => {
          setTimeout(() => {
            this.selectElem([l - j - 1]);
          }, this.aniInt * this.timer++);
        })(j, newDataArr.length);
      }
      setTimeout(() => {
        this.deselectPart([0, newDataArr.length - 1]);
      }, this.aniInt * this.timer++);
      console.log(newDataArr);
    },

    // 快速排序
    QuickSort() {
      var newDataArr = convertToNumList(this.dataArr);
      newDataArr.unshift(0);
      this.QSort(newDataArr, 1, newDataArr.length - 1);
      newDataArr.shift();
      console.log(newDataArr);
    },
    QSort(L, low, high) {
      if (low < high) {
        this.shinePart(low - 1, high - 1);
        var pivotloc = this.Partition(L, low, high);
        this.deselectPartWithDelay(low - 1, high - 1);
        this.QSort(L, low, pivotloc - 1);
        this.QSort(L, pivotloc + 1, high);
      }
    },
    Partition(L, low, high) {
      L[0] = L[low];
      ((l, h) => {
        setTimeout(() => {
          this.selectElem([l, "#F56C6C"]);
          this.selectElem([h, "#F56C6C"]);
        }, this.aniInt * this.timer++);
      })(low - 1, high - 1);
      var pivotkey = L[low];
      while (low < high) {
        while (
          low < high &&
          ((this.ascendingOrder && L[high] >= pivotkey) ||
            (!this.ascendingOrder && L[high] <= pivotkey))
        ) {
          --high;
          ((h) => {
            setTimeout(() => {
              this.selectElem([h + 1]);
              this.selectElem([h, "#F56C6C"]);
            }, this.aniInt * this.timer++);
          })(high - 1);
        }
        L[low] = L[high];
        ((l, h) => {
          setTimeout(() => {
            this.exchangeElem([l, h]);
          }, this.aniInt * this.timer++);
        })(low - 1, high - 1);
        while (
          low < high &&
          ((this.ascendingOrder && L[low] <= pivotkey) ||
            (!this.ascendingOrder && L[low] >= pivotkey))
        ) {
          ++low;
          ((l) => {
            setTimeout(() => {
              this.selectElem([l - 1]);
              this.selectElem([l, "#F56C6C"]);
            }, this.aniInt * this.timer++);
          })(low - 1);
        }
        L[high] = L[low];
        ((l, h) => {
          setTimeout(() => {
            this.exchangeElem([l, h]);
          }, this.aniInt * this.timer++);
        })(low - 1, high - 1);
      }
      L[low] = L[0];
      return low;
    },

    // 选择排序
    SelectSort() {
      var newDataArr = convertToNumList(this.dataArr);
      newDataArr.unshift(0);
      for (var i = 1; i < newDataArr.length; i++) {
        // this.shinePart(i - 1, this.dataArr.length - 1);
        var m = i;
        newDataArr[0] = newDataArr[i];
        this.selectElemWithDelay(i - 1, "#F56C6C");
        for (var j = i + 1; j < newDataArr.length; j++) {
          ((j) => {
            setTimeout(() => {
              this.selectElem([j]);
            }, this.aniInt * this.timer++);
          })(j - 1);
          if (
            (this.ascendingOrder && newDataArr[j] < newDataArr[m]) ||
            (!this.ascendingOrder && newDataArr[j] > newDataArr[m])
          ) {
            console.log("test1");
            // this.deselectElemWithDelay(m - 1);
            ((j, m) => {
              setTimeout(() => {
                this.deselectElem(m);
                this.selectElem([j, "#F56C6C"]);
              }, this.aniInt * this.timer++);
            })(j - 1, m - 1);
            m = j;
            newDataArr[0] = newDataArr[j];
          } else {
            console.log("test2");
            ((j) => {
              setTimeout(() => {
                this.deselectElem(j - 1);
              }, this.aniInt * this.timer);
            })(j);
          }
        }
        [newDataArr[i], newDataArr[m]] = [newDataArr[m], newDataArr[i]];
        ((i, m) => {
          setTimeout(() => {
            this.exchangeElem([i, m]);
            this.selectElem([i]);
            // this.deselectPart([i, len]);
          }, this.aniInt * this.timer++);
        })(i - 1, m - 1);
      }
      newDataArr.shift();
      console.log(newDataArr);
      this.deselectPartWithDelay(0, newDataArr.length - 1);
    },

    // 堆排序
    HeapSort() {
      var i,
        newDataArr = convertToNumList(this.dataArr);
      newDataArr.unshift(0);
      for (i = Math.floor((newDataArr.length - 1) / 2); i > 0; --i) {
        this.HeapAdjust(newDataArr, i, newDataArr.length - 1, i === 1);
      }
      for (i = newDataArr.length - 1; i > 1; --i) {
        [newDataArr[1], newDataArr[i]] = [newDataArr[i], newDataArr[1]];
        ((i) => {
          setTimeout(() => {
            this.selectElem([0]);
            this.selectElem([i]);
          }, this.aniInt * this.timer++);
          setTimeout(() => {
            this.exchangeElem([0, i]);
            this.deselectPart([0, i]);
          }, this.aniInt * this.timer++);
        })(i - 1);
        this.HeapAdjust(newDataArr, 1, i - 1, false);
      }
      newDataArr.shift();
      console.log(newDataArr);
    },
    HeapAdjust(H, s, m) {
      var s1 = s,
        m1 = m;
      console.log("s", s, "m", m);
      if (s === m) {
        return;
      }
      this.shinePart(s - 1, m - 1);
      var rc = H[s];
      this.selectElemWithDelay(s - 1, "#F56C6C");
      for (var j = 2 * s; j <= m; j *= 2) {
        ((j) => {
          setTimeout(() => {
            this.selectElem([j, "#F56C6C"]);
          }, this.aniInt * this.timer++);
        })(j - 1);
        if (
          j < m &&
          ((this.ascendingOrder && H[j] < H[j + 1]) ||
            (!this.ascendingOrder && H[j] > H[j + 1]))
        ) {
          ++j;
          ((j) => {
            setTimeout(() => {
              this.selectElem([j - 1]);
              this.selectElem([j, "#F56C6C"]);
            }, this.aniInt * this.timer++);
          })(j - 1);
        }
        if (
          !(
            (this.ascendingOrder && rc < H[j]) ||
            (!this.ascendingOrder && rc > H[j])
          )
        ) {
          break;
        }
        H[s] = H[j];
        ((s, j) => {
          setTimeout(() => {
            this.exchangeElem([s, j]);
            this.selectElem([s]);
          }, this.aniInt * this.timer++);
        })(s - 1, j - 1);
        s = j;
      }
      H[s] = rc;
      this.deselectPartWithDelay(s1 - 1, m1 - 1);
    },

    // 归并排序
    MergeSort() {
      var a = convertToNumList(this.dataArr),
        b = a.concat([]),
        len = a.length,
        temp,
        arr = a;
      var seg, start, low, mid, high, k, start1, end1, start2, end2;
      for (seg = 1; seg < len; seg += seg) {
        for (start = 0; start < len; start += 2 * seg) {
          low = start;
          mid = Math.min(start + seg, len);
          high = Math.min(start + 2 * seg, len);
          k = low;
          start1 = low;
          end1 = mid;
          start2 = mid;
          end2 = high;

          this.shinePart(start1, end1 - 1);
          this.shinePart(start2, end2 - 1, true, "#F56C6C");

          while (start1 < end1 && start2 < end2) {
            if (
              (this.ascendingOrder && a[start1] <= a[start2]) ||
              (!this.ascendingOrder && a[start1] >= a[start2])
            ) {
              console.log("choose 1");
            } else {
              ((from, to) => {
                setTimeout(() => {
                  this.moveElem([from, to]);
                }, this.aniInt * this.timer++);
              })(start2, k);
            }
            b[k++] =
              (this.ascendingOrder && a[start1] <= a[start2]) ||
              (!this.ascendingOrder && a[start1] >= a[start2])
                ? a[start1++]
                : a[start2++];
          }
          ((start, end) => {
            setTimeout(() => {
              this.deselectPart([start, end - 1]);
            }, this.aniInt * this.timer++);
          })(low, high);
          while (start1 < end1) {
            b[k++] = a[start1++];
          }
          while (start2 < end2) {
            b[k++] = a[start2++];
          }
        }
        temp = a;
        a = b;
        b = temp;
        console.log(a, b);
      }
      if (a != arr) {
        for (var i; i < len; i++) {
          b[i] = a[i];
        }
      }
    },
  },
  watch: {
    aOrder(newValue) {
      this.changeOrder(newValue);
    },
  },
};
</script>

<style scoped>
#tool-bar {
  margin: 30px auto;
  width: auto;
  height: auto;
}
.box {
  width: 95%;
  margin-left: 20px;
  border-width: 2px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: left;
}
.box.last {
  margin-right: 20px;
}
.v-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  margin-top: 18px;
  margin-bottom: 5px;
}
h2 {
  font-size: 17px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  color: #1f2f3d;
  margin-bottom: 2px;
}
p {
  padding: 0 0 5px 0px;
  text-align: center;
  color: #1f2f3d;
}
.h-row {
  margin-bottom: 5px;
  padding: 1% 6% 0 6%;
}
.i-row {
  margin-top: 5px;
  margin-bottom: 5px;
}
.i-row.s-row {
  margin-top: 15px;
}
.m-row {
  margin-bottom: 15px;
}
.block {
  text-align: center;
}
.s-line {
  line-height: 44px;
}
</style>