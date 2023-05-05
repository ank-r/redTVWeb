<template>
    <v-container fill-height fluid style="padding-left: 24px; padding-right: 24px">
    

        <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px; padding-left: 20px;">
            <v-col
              v-for="item in videoList"
              :key="item.id"
            >
              <VideoCared :video="item" />
            </v-col>
    
            <!-- <VideoCared :video="videoInfo" /> -->
          </v-row>
    
    
    
          <!-- 分页展示 -->
          <v-row justify="center">
            <v-pagination
              v-model="page"
              :length="length"
              @input="pageChange"
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
        userInfo: {},
        drawer: false,
        items: [
          { icon: 'mdi-home', text: '首页', link: '/' },
          { icon: 'mdi-trending-up', text: '推荐', link: '/hot' },
          { icon: 'mdi-youtube-subscription', text: '关注', link: '/subscribe' },
          { icon: 'mdi-history', text: '历史记录', link: '/history' }
    
        ],
        videoList:[]
      
    
      }),
      created() {
    // console.log(this.$route.query.page)
    // //分页标签的初始化页
    // if (this.$route.query.page === undefined) {
    //   this.page = 1
    // } else {
    //   this.page = this.$route.query.page
    // }
   
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
                //获取首页的推荐视频列表
                getVideoList(){
          this.$axios({
            url:"/video/getFollowVideoList",
            method:'get'
          }).then(re=>{
            this.videoList = re.data
          })
          
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
          this.$router.push('/studio/upload')
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