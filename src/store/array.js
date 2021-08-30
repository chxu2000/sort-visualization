import { nanoid } from 'nanoid'

//数组相关配置
export default {
  namespaced: true,
  actions: {

  },
  mutations: {
    // 修改排序方式
    changeOrder(state, order) {
      console.log(order)
      state.ascendingOrder = order
    },
    // 生成随机数组
    generateArr(state, length) {
      for (var i = 0; i < length; i++) {
        state.idArr.push(nanoid())
        state.dataArr.push({
          value: Math.floor(Math.random() * 100) - 50,
          itemStyle: {
            color: null
          }
        })
      }
    },
    // 打乱数组
    shuffleArr(state) {
      var newIdArr = []
      var newDataArr = state.dataArr.concat([])
      newDataArr.sort(() => (0.5 - Math.random()))
      for (var i = 0; i < state.dataArr.length; i++) {
        var index = state.dataArr.indexOf(newDataArr[i])
        newIdArr.push(state.idArr[index])
        state.dataArr[index] = 'checked'
      }
      state.idArr = newIdArr
      state.dataArr = newDataArr
    },
    // 数组直接排序
    sortArr(state) {
      var newIdArr = []
      var newDataArr = state.dataArr.concat([])
      newDataArr.sort((a, b) => (state.ascendingOrder ? a.value - b.value : b.value - a.value))
      for (var i = 0; i < state.dataArr.length; i++) {
        var index = state.dataArr.indexOf(newDataArr[i])
        newIdArr.push(state.idArr[index])
        state.dataArr[index] = 'checked'
      }
      state.idArr = newIdArr
      state.dataArr = newDataArr
    },
    // 清空数组
    clearArr(state) {
      state.idArr.splice(0, state.idArr.length)
      state.dataArr.splice(0, state.dataArr.length)
    },
    // 交换数组两元素
    exchangeElem(state, [index1, index2]) {
      [state.idArr[index1], state.idArr[index2]] = [state.idArr[index2], state.idArr[index1]];
      var newDataArr = state.dataArr.concat([]);
      [newDataArr[index1], newDataArr[index2]] = [newDataArr[index2], newDataArr[index1]];
      state.dataArr = newDataArr
    },
    // 删除数组某元素
    deleteElem(state, index) {
      state.idArr.splice(index, 1)
      state.dataArr.splice(index, 1)
    },
    // 向数组添加某元素
    insertElem(state, { index, value }) {
      console.log(index, value)
      state.idArr.splice(index, 0, nanoid())
      state.dataArr.splice(index, 0, {
        value: value,
        itemStyle: {
          color: null
        }
      })
    },
    // 修改某元素值
    editElem(state, { index, value }) {
      var newDataArr = state.dataArr.concat([])
      newDataArr[index].value = value
      state.dataArr = newDataArr
    },
    // 选中某元素
    selectElem(state, index) {
      console.log("selectElem", index)
      var newDataArr = state.dataArr.concat([])
      newDataArr[index].itemStyle.color = 'green'
      state.dataArr = newDataArr
    },
    // 反选某元素
    deselectElem(state, index) {
      console.log("deselectElem", index)
      var newDataArr = state.dataArr.concat([])
      newDataArr[index].itemStyle.color = null
      state.dataArr = newDataArr
    },
    // 选中某部分
    selectPart(state, [index1, index2]) {
      console.log("selectPart", index1, index2)
      var newDataArr = state.dataArr.concat([])
      for (var i = index1; i <= index2; i++) {
        newDataArr[i].itemStyle.color = 'green'
      }
      state.dataArr = newDataArr
    },
    // 反选某部分
    deselectPart(state, [index1, index2]) {
      console.log("deselectPart", index1, index2)
      var newDataArr = state.dataArr.concat([])
      for (var i = index1; i <= index2; i++) {
        newDataArr[i].itemStyle.color = null
      }
      state.dataArr = newDataArr
    },
    // 选中某元素
    selectElems(state, [index1, index2]) {
      var newDataArr = state.dataArr.concat([])
      for (var i = index1; i < index2; i++) {
        newDataArr[i].itemStyle.color = 'green'
      }
      state.dataArr = newDataArr
    },
    // 反选某元素
    deselectElems(state, [index1, index2]) {
      var newDataArr = state.dataArr.concat([])
      for (var i = index1; i < index2; i++) {
        newDataArr[i].itemStyle.color = null
      }
      state.dataArr = newDataArr
    },
  },
  state: {
    idArr: [],
    dataArr: [],
    ascendingOrder: true,
  }
}