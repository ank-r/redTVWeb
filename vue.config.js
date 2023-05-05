const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
    port:8081,
    proxy:{
      '/api':{
        target:'http://localhost:8010/',
        changOrigin:true,
        ws:true,
         // 路径重写
         pathRewrite: {
          // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
          '^/api': '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做 
      }
      }
    }

  }
})
