<template>
    <v-container fill-height fluid style="padding-left: 24px; padding-right: 24px">
            <!-- 分区 -->

        <div v-if="videoList == null"> 
            <h1>搜索中</h1>
        </div>
        <div v-if="videoList.length == 0"> 
            <h1>没有对应的数据</h1>
        </div>
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
              @input="pageChange"
            />
          </v-row>
          <v-col>
            &nbsp;
          </v-col>
    
      
    </v-container>
  </template>


  <script>
    import VideoCared from '@/components/player/video-card.vue'  
    export default{
        components: {
        
        VideoCared
      },
    
      data: () => ({
        searchWorld:'',
        userInfo: {},
        drawer: false,
        items: [
          { icon: 'mdi-home', text: '首页', link: '/' },
          { icon: 'mdi-trending-up', text: '推荐', link: '/hot' },
          { icon: 'mdi-youtube-subscription', text: '关注', link: '/subscribe' }
    
        ],
        videoList:null,
       
      }),
      //在页面的创建之前，
    created() {
    console.log(this.$route.query.page)
    //分页标签的初始化页
    if (this.$route.query.page === undefined) {
      this.page = 1
    } else {
      this.page = this.$route.query.page
    }


    //获取搜索关键词
    this.searchWorld = this.$route.params.searchWorld;

    console.log("搜索关键字"+this.searchWorld);
    this.getSearchList();
  },
      methods: {
      
        //获取搜索视频列表
        getSearchList(){
          this.$axios({
            url:"/video/getSearchList",
            method:'get',
            params:{
                searchWorld:this.searchWorld  
            }
          }).then(re=>{
            this.videoList = re.data
          })
          
        },

      }
    
    
    }
    
    
    </script>