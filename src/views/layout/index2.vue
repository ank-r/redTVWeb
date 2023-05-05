<template>
<div>
    <v-navigation-drawer
    app
    clipped
    >
      <router-link v-for="item in items" :key="item.text" :to="item.link">
        <v-list-item
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </router-link>

      
    </v-navigation-drawer>

    <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="red"
    dark
    style="margin-right: 10px;"
    >

    <!-- 标题 -->

    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

    <v-toolbar-title
    class="hidden-sm-and-down ml-0 pl-4"
    style="width: 300px"
  >
    <span style="cursor:pointer" @click="goToHome()">RedTV</span>
  </v-toolbar-title>


  <!-- 搜索栏 -->
  <v-text-field
  flat
  solo-inverted
  hide-details
  prepend-inner-icon="mdi-magnify"
  clearable
  label="搜索"
  v-model="searchWorld"
  @click:prepend-inner="doSearch"
/>


<v-tooltip bottom>
  <template v-slot:activator="{ on, attrs }">
    <v-btn
      icon
      v-bind="attrs"
      v-on="on"
      @click="goToAdmin"
    >
    
      <v-icon>fas fa-tachometer-alt</v-icon>
    </v-btn>
  </template>
  <span>管理中心</span>
</v-tooltip>

<!-- 发布视频 -->


<v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        @click="goToPublish"
      >
        <v-icon>mdi-video-plus</v-icon>
      </v-btn>
    </template>
    <span>发布</span>
  </v-tooltip>

  <!-- 消息 -->
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">

      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        @click="gotoMessage"
      >       
        <v-icon>mdi-bell</v-icon>
        <el-badge :is-dot="hasMessage" type="primary"></el-badge>
      </v-btn>
      
    </template>
    <span>消息</span>
  </v-tooltip>


  <!-- 已经登录 -->
  <Head v-if="this.$store.state.userInfo" ></Head>
  <!-- 未登录 -->
  <v-btn
    v-if="this.$store.state.userInfo == null"
    outlined
    @click="goToLoginPage"
  >
    <v-icon left dark>mdi-account</v-icon> 登录
  </v-btn>

</v-app-bar>


    <v-main style="padding-left: 10px;" >
      
      <router-view  />

    </v-main>


    <v-footer

    class="font-weight-medium"
  >
    <v-col
      class="text-center"
      cols="12"
    >
      <a href="https://www.buguagaoshu.com" target="_blank"><strong>不挂高数</strong></a> ©2020 - {{ new Date().getFullYear() }}  Created by
      <a href="https://vuetifyjs.com/" target="_blank"><strong>Vuetify</strong></a>
    </v-col>
  </v-footer>

  

</div>
</template>

<script>
import Head from '@/views/layout/components/head.vue'


export default{
    components: {
    Head
    
  },

  data: () => ({
    searchWorld:'',
    hasMessage:true,
    userInfo: {},
    drawer: false,
    items: [
      { icon: 'mdi-home', text: '首页', link: '/' },
      { icon: 'mdi-trending-up', text: '推荐', link: '/hot' },
      { icon: 'mdi-youtube-subscription', text: '关注', link: '/subscribe' }

    ]
  }),
  
  methods: {
    headClick(value) {
      if (value === 0) {
        this.$router.push('/user/' + this.userInfo.id)
      } else if (value === 1) {
        this.$router.push('/studio')
      } else {
        this.logout()
      }
    },
    updateMessage(){
      // 判断是否还有未读消息


      this.hasMessage = true;

    },
    doSearch(){
      //回车搜索
      console.log("do search "+this.searchWorld)
      this.$router.push('/search/'+this.searchWorld)
      this.searchWorld=""

    },
    logout() {
      fetch(`/api/logout`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json())
        .then(json => {
          if (json.status === 200) {
            this.$store.commit('setUserInfo', null)
            if (this.$route.path === '/') {
              location.reload()
            } else {
              this.$router.push('/')
            }
          } else {
            //
          }
        })
        .catch(e => {
          return null
        })
    },
    goToLoginPage() {
      this.$router.push('/login')
    },
    goToPublish() {
      this.$router.push('/upload')
    },
    goToHome() {
      if (this.$route.path === '/') {
        return
      }
      this.$router.push('/')
    },
    goToUserHome() {
      if (this.$route.path === '/user/' + this.$store.state.userInfo.id) {
        return
      }
      this.$router.push('/user/' + this.$store.state.userInfo.id)
    },
    // 去消息页面
    gotoMessage(){
      this.$router.push('/message/0')
      
      },
      goToAdmin(){
        this.$router.push('/studio')
      }

  }




}


</script>