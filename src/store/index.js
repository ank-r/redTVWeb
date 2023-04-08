import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    webInfo:{//上传文件的位置
      fileServe:'http://localhost:8000'
    },
    userInfo:(localStorage.getItem('user')!=null && 
    localStorage.getItem('user') != 'undefined' &&
     localStorage.getItem('user') !='' ) ? JSON.parse(localStorage.getItem('user')) : null

  },
  getters: {
  },
  mutations: {
    setUserInfo(state,userInfo){
      //先将数据存储在localStorage
  
      //localStorage 里面存储的是字符串类型的
      localStorage.setItem('user',JSON.stringify(userInfo))
      //state.userInfo 内容是个对象
      state.userInfo = userInfo

    }
  },
  actions: {
  },
  modules: {
  }
})
