import router from '@/router';
import store from '@/store';
import axios from 'axios'
import { Message, Loading } from 'element-ui'
const ConfigBaseURL = 'http://localhost:8000/' //默认路径，这里也可以使用env来判断环境
//做一些常规设置
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

axios.defaults.baseURL='/api'
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'loading...'
  })
   var user = null  ;

   if(localStorage.getItem('user')!=null && 
   localStorage.getItem('user') != 'undefined' &&
    localStorage.getItem('user') !='' ){
      user = JSON.parse(localStorage.getItem('user'))
    }
    // console.log("开始请求"+user);

     let Authorization = '';
     if(user!=null){
      Authorization = user.token;
      
     }
    //  console.log("开始请求"+Authorization);

  // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Authorization'] = Authorization
    // console.log("开始请求"+config.headers['Authorization']);
    
  return config
})

// 添加响应拦截器
Service.interceptors.response.use(response => {
  loadingInstance.close()
  // console.log(response)

  if(response.data == '403'){
    Message({
      message:  '请登录！',
      type: 'error',
      duration: 3 * 1000
    })
    console.log("not login")
    store.commit("setUserInfo",null)
    router.replace({
      path:'/login',
      query: {redirect: router.currentRoute.fullPath}
    })

  }

  console.log(response.data)

  return response.data
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})