<template>
    <div>


  <v-container>
    <v-row style="padding-top: 12px; padding-bottom: 12px">
      <v-col style="padding-bottom: 0px;">

        <DPlayer v-if="videoData != null"   :article="videoData.id" :video="videoData" :picurl="videoData.imgUrl" />

      </v-col>
    </v-row>

  </v-container>
  

  <v-container fill-height style="padding-top: 0px;">
    <v-row v-resize="onResize" no-gutters style="padding-top: 12px; padding-bottom: 12px">
      <v-col :cols="colsWidth">
        <v-row>
          <v-col>
            <h3 v-text="videoData.title" />
          </v-col>
        </v-row>
        <v-row>
          <v-col style="color: #999;font-size: 12px;padding-top: 0px;">
            <!-- <router-link v-if="videoData.childrenCategory.fatherId !== 0" :to="`/v/${videoData.fatherCategory.id}`" class="category-link">
              <span v-text="videoData.fatherCategory.name" />
            </router-link> -->
            <!-- /
            <router-link :to="`/v/${videoData.childrenCategory.id}`" class="category-link">
              <span v-text="videoData.childrenCategory.name" />
            </router-link> -->
            <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;'" />
            发布于：
            <span v-text="TimeUtil.renderTime(videoData.createTime)" />
            <br>
            <span v-text="videoData.viewCount" /> 次观看 <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;'" /> <span v-text="videoData.danmakuCount" /> 弹幕
          </v-col>
        </v-row>
        <v-divider />
        <v-row style="padding-top: 5px; padding-bottom: 5px">
          <v-col cols="2" align-self="end">
            <router-link :to="`/user/${videoData.userId}`">
              <v-avatar size="62">
                <v-img :src="videoData.userInfo.avatarUrl" />
              </v-avatar>
            </router-link>
          </v-col>
          <v-col>
            <router-link :to="`/user/${videoData.userId}`">
              <span v-text="videoData.userInfo.username" />
            </router-link>
            <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;'" />
            <span style="color: #999;font-size: 12px;" v-text="videoData.introduction" /><span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;'" />
            <v-btn small outlined color="primary">
              <span>关注</span><span v-html="'&nbsp;&nbsp;'" />
              <span v-text="videoData.followCount" />
            </v-btn><br>
            <br>
            <span v-text="videoData.describes" />
          </v-col>
        </v-row>
        <v-col />
        <v-divider />
        <v-row>
     
        </v-row>
      </v-col>
      <v-col cols="1" />
      <v-col cols="3">
        <!-- <v-rating v-model="score" color="orange" background-color="orange lighten-3" /> -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="doLike"
            >
              <v-icon :color="likeColor" >mdi-thumb-up</v-icon>
          
              <span v-text="videoData.likeCount" />
            </v-btn>
          </template>
          <span>点赞</span>
        </v-tooltip>
        
   

      </v-col>
    </v-row>
    <v-col />
    <v-row style="padding-top: 12px; padding-bottom: 12px">
      <v-col :cols="colsWidth">
        评论
        <Comment :videoInfo="videoData"  />
      </v-col>
      <!-- <v-col>
        相关视频：
      </v-col> -->
    </v-row>
  </v-container>



    </div>
  </template>
  
  <script>
  import DPlayer from '@/components/player/player2.vue'
  import TimeUtil from '@/utils/time-util.vue'
  import Comment from '@/components/comment/video-comment.vue'
  
  export default {
    name: 'Video',
    components: {
      DPlayer,
      Comment
    },
    data() {
      return {
        score: 0,
        TimeUtil,
        id: 0,
        videoData: null, 
        isLike:false, 
        likeColor:"",     
        userInfo: {},
        windowSize: {
  
        },
        colsWidth: 8
      }
    },
    created() {
      this.$vuetify.goTo(0)
      this.id = parseInt(this.$route.params.id)
      this.videoInfo()

      this.onResize()
    },

    
    methods: {

      doLike(){
        if(this.isLike){         
          this.$axios({
            url:"/video/unLike/"+this.id,
            method:'get'
          }).then(re=>{
            if(re.status == 200){
              this.isLike = false;
              this.likeColor=""
            }
          })          

        }else{

           this.$axios({
            url:"/video/doLike/"+this.id,
            method:'get'
          }).then(re=>{
            if(re.status == 200){
              this.isLike = true;
              this.likeColor="#f44434"
            }
          })
        }


      },

      isLike(){
        this.$axios({
            url:"/video/isLike/"+this.id,
            method:'get'
          }).then(re=>{
            if(re.status == 200){
              if(re.isLike == 1){
                this.isLike = true;
              this.likeColor="#f44434"
              }else{
                this.isLike = false;
              this.likeColor=""
              }

              
            }
          })
      },

      // 控制页面大小
      onResize() {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        if (this.windowSize.x < 900) {
          this.colsWidth = 12
        } else {
          this.colsWidth = 8
        }
      },
      videoInfo() {
        this.$axios({
            url:"/video/getVideoById/"+this.id,
            method:'get'
          }).then(re=>{
            console.log(re.data)
            this.videoData = re.data
            this.userInfo = re.data.userInfo;
          })


          this.$axios({
            url:"/video/isLike/"+this.id,
            method:'get'
          }).then(re=>{
            if(re.status == 200){
              if(re.isLike == 1){
                this.isLike = true;
              this.likeColor="#f44434"
              }else{
                this.isLike = false;
              this.likeColor=""
              }

              
            }
          })
      }
    }
  }
  </script>
  
  <style>
  .category-link {
    color: #999;
  }
  a {
    text-decoration: none;
  }
 
  </style>
  