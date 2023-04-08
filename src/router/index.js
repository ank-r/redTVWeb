import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutView from '@/views/layout/index2.vue' 
import Home from '@/views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LayoutView,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: '/hot',
        name: 'Hot',
        component: () => import('@/views/home/hot.vue'),
        meta: { title: '推荐' }
      },
      {
        path: '/subscribe',
        name: 'Subscribe',
        component: () => import('@/views/home/subscribe.vue'),
        meta: { title: '关注',
        requireAuth:true }
      },
      {
        path: '/video/:id',
        name: 'Vide',
        component: () => import('@/views/video/video.vue'),
        meta: { title: '播放' }
      },
      {
        path: '/user/setting',
        name: 'User',
        component: () => import('@/views/user/setting.vue'),
        meta: { title: '用户设置',
               requireAuth:true

            },
      },
      {
        path: '/user/:id',
        name: 'User',
        component: () => import('@/views/user/user.vue'),
        meta: { title: '用户中心',
        requireAuth:true },
      },
      {
        path: '/upload',
        name: 'videoUpload',
        component: () => import('@/views/video/upload.vue'),
        meta: { title: '视频上传' ,
        requireAuth:true},
      },
      {
        path: '/search/:searchWorld',
        name: 'videoSearch',
        component: () => import('@/views/home/search.vue'),
        meta: { title: '视频搜索' },
      },
      {
        path: '/category/:id',
        name: 'category',
        component: () => import('@/views/home/category.vue'),
        meta: { title: '视频分类' },
      }
    
      
    ]
  },
  {
    path: '/studio',
    name: 'Studio',
    component: () => import('@/views/layout/studio.vue'),
    meta: { title: 'RedTV管理中心' },
    children: [
      {
        path: '/studio',
        name: 'StudioIndex',
        component: () => import('@/views/studio/index.vue'),
        meta: {
          title: 'RedTV管理中心',
          requireAuth: true
        }
      },
      {
        path: '/studio/upload',
        name: 'Upload',
        component: () => import('@/views/studio/upload.vue'),
        meta: {
          title: '影视上架',
          requireAuth: true
        }
      },
      {
        path: '/studio/admin/invitation',
        name: 'invitation',
        component: () => import('@/views/admin/invitation.vue'),
        meta: {
          title: '邀请码管理',
          requireAuth: true
        }
      },
      {
        path: '/studio/admin/examine',
        name: 'Examine',
        component: () => import('@/views/admin/examine.vue'),
        meta: {
          title: '审核视频',
          requireAuth: true
        }
      },
      {
        path: '/studio/admin/videolist',
        name: 'Examine',
        component: () => import('@/views/admin/video-list.vue'),
        meta: {
          title: '视频列表',
          requireAuth: true
        }
      },
      {
        path: '/studio/admin/userlist',
        name: 'Examine',
        component: () => import('@/views/admin/user-list.vue'),
        meta: {
          title: '用户列表',
          requireAuth: true
        }
      },
      {
        path: '/studio/admin/userdata',
        name: 'Examine',
        component: () => import('@/views/admin/user-data.vue'),
        meta: {
          title: '用户数据统计',
          requireAuth: true
        }
      },
      {
        path: '/studio/admin/category',
        name: 'Examine',
        component: () => import('@/views/admin/category.vue'),
        meta: {
          title: '分类管理',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/message/:id',
    name: 'Message',
    component: () => import('@/views/message/message.vue'),
    meta: { title: '消息中心' ,
    requireAuth:true},
  }
]

const router = new VueRouter({
  routes
})


// 路由导航守卫
router.beforeEach((to, from, next) => {
  // const token = window.localStorage.getItem('user')
  // console.log(this.$store.state.webInfo.name)
  // router.app.$options.store
  // 获取网页信息

  // 路由发生变化修改页面title
  if (to.meta.title) {
    if (to.meta.title === '首页') {
      document.title = 'redTV-'+ '首页'
    } else {
      document.title = 'redTV-'+ to.meta.title
    }
  }



  //用户是否登录
  // const date = new Date().getTime()
  // if (router.app.$options.store.state.userInfo != null) {
  //   // console.log(router.app.$options.store.state.userInfo.expireTime > date, router.app.$options.store.state.userInfo.expireTime, date)
    
    
  //   if (router.app.$options.store.state.userInfo.expireTime > date) {
  //     if (to.path === '/login') {
  //       return next({ path: '/' })
  //     }
  //     return next()
  //   } else {
  //     router.app.$options.store.commit('setUserInfo', null)
  //     return next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   }
  // } else {
  //   if (to.meta.requireAuth) {
  //     return next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   } else {
  //     return next()
  //   }
  // }
  
  if(router.app.$options.store.state.userInfo != null){
    return next()
  }else{
    if(to.path ==='/login'){
      return next()
    }

    if(!to.meta.requireAuth){
        return next()
    }

    return next({path:'/login'})

  }



    // // 取出token(vuex)
    // const token = store.state.user.token
    // if (token) {
    //   // 去登录页
    //   if (to.path === '/login') {
    //     console.log('你已经登录了，就不能去login，转到主页')
    //     next('/')
    //   } else {
    //     next()
    //   }
    // } else {
    //   // 没有登录，只能去白名单(那些不需要token就可以访问的页面)
    //   if (to.path === whiteList) {
    //     next()
    //   } else {
    //     console.log('你没有登录，转到登录页')
    //     next('/login')
    //   }
    //   // next() // 重点强调next一定要调用
  
    // }


  
})

export default router
