<template>
    <v-container fill-height fluid style="padding-left: 24px; padding-right: 24px">
            <!-- 分区 -->
    <v-row >
      <v-col>
        <v-menu
          v-for="item in categoryList"
          :key="item.id"
          open-on-hover
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              color="primary"
              v-bind="attrs"
              @click="setCategory(item)"
              v-on="on"
            >
              {{ item.name }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="c in item.children"
              :key="c.id"
            >
              <v-list-item-title>
                <router-link :to="`/category/${c.id}`">
                  {{ c.name }}
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-divider />
    </v-row>


      <!-- <v-btn text @click="getVideoList">获取视频数据</v-btn> -->
        <v-row no-gutters style="padding-top: 18px; padding-bottom: 12px; padding-left: 20px;">
            <v-col
              v-for="item in videoList"
              :key="item.id"
            >
              <VideoCared :video="item" />
            </v-col>
    
          </v-row>
          <!-- 分页展示 -->
          <v-row justify="center">
            <v-pagination
              v-model="page"
              :length="length"
             
            />
          </v-row>
          <v-col>
            &nbsp;
          </v-col>
    
      
    </v-container>
  </template>


  <script>
    import Head from '@/views/layout/components/head.vue'
    import VideoCared from '@/components/player/video-card.vue'
    
    export default{
        components: {
        Head,
        VideoCared
      },
    
      data: () => ({
        userInfo: {
            id:12,
            topImgUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            avatarUrl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            username:"王五",
            fansCount:19,
            follwedCount:90,
            description:"用户的个人简介",
            sex:1,
            worksCount:22}
        ,
        drawer: false,
        items: [
          { icon: 'mdi-home', text: '首页', link: '/' },
          { icon: 'mdi-trending-up', text: '推荐', link: '/hot' },
          { icon: 'mdi-youtube-subscription', text: '关注', link: '/subscribe' }
    
        ],
        videoList:[
        ],
        categoryList:{}    
      
    
      }),
      //在页面的创建之前，
    created() {
    // console.log(this.$route.query.page)
    // //分页标签的初始化页
    // if (this.$route.query.page === undefined) {
    //   this.page = 1
    // } else {
    //   this.page = this.$route.query.page
    // }
    this.getCategory()
    this.getVideoList()
    // this.testLogin()
  },
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
        logout() {
          //logout

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

        //获取首页的推荐视频列表
        getVideoList(){
          this.$axios({
            url:"/video/getVideoList",
            method:'get'
          }).then(re=>{
            this.videoList = re.data
          })
          
        },
        // 获取分类列表
        getCategory(){

          this.$axios({
            url:"/category/tree",
            method:'get',
          }).then(re=>{

            this.categoryList = re.data;

          })

        },

        addUser(){
          // this.$store.commit("setUserIfo",this.userInfo)
        },
        goToLoginPage() {
          this.$router.push('/login')
        },
        goToPublish() {
          this.$router.push('/video/upload')
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
        }
      }
    
    
    
    
    }
    
    
    </script>