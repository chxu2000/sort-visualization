//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
import arrayOptions from './array'

//引入Vuex
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
	modules: {
		arrayAbout: arrayOptions,
	}
})
