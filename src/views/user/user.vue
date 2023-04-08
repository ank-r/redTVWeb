<template>
    <div>

      <v-container fill-height fluid style="padding: 0px;">
        <v-row>
          <v-col style="padding: 0px;">
            <v-img :src="userInfo.topImgUrl" :aspect-ratio="5.98" />
          </v-col>
        </v-row>
  
      </v-container>
      <v-container fill-height>
  
        <v-row align="center" style="padding-top: 12px; padding-bottom: 12px">
  
          <v-col
            cols="12"
            md="8"
          >
            <v-avatar size="80" style="float: left;">
              <v-img :src="userInfo.avatarUrl" />
            </v-avatar>
            <h2 style="margin-top: 20px;margin-left: 100px;">
              {{ userInfo.username }}
            </h2>
            <v-row style="margin-top: 10px;margin-left: 100px;">  
              <div>
              
                <el-button @click="doFollow" type="info"  v-show="showFollow" plain>{{followMeaasge}}</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button v-if="canMessage" @click="gotoMessage(userInfo.id)" type="info" plain>私信</el-button>
               
              </div>
            </v-row> 

           <v-row style="margin-top: 20px;margin-left: 100px;">  
            <div>
            
              <button @click="showCard(1)">关注 {{userInfo.followCount}}</button>
              <el-divider direction="vertical"></el-divider>
              <button  @click="showCard(2)">粉丝数 {{userInfo.fansCount}}</button>
            
            </div>
          </v-row> 
        
          <el-dialog
          
          :visible.sync="dialogVisible"
          width="50%"
          >
          <v-row style="margin-bottom: 30px;">
            <button @click="changeCard(1)"  style="margin-left: 20px;font-size: 20px;">关注(12)</button>
            <button @click="changeCard(2)" style="margin-left: 25px;font-size: 20px;">粉丝(221)</button>
          </v-row>

          <v-row v-if="followORFans == 1" >
            <v-col
              v-for="item in userList"
              :key="item.id"
              cols="12"
            >
    
            <UserList :user="item" />
            </v-col>
  
          </v-row>
          <v-row v-if="followORFans == 2" >
            <v-col
            v-for="item in userList"
            :key="item.id"
            cols="12"
          >
  
          <UserList :user="item" />
          </v-col>
  
          </v-row>
         
        </el-dialog>
         

          </v-col>
   
        </v-row>
  
        <v-tabs>
          <v-tab @click="setType(0)">发布视频列表</v-tab>
          <v-tab @click="setType(1)">点赞视频列表</v-tab>
          <v-tab @click="setType(2)">消息列表<v-badge  content="12" color = "#D50000"></v-badge>  </v-tab>
        </v-tabs>
      </v-container>
      <v-divider />
      <v-container fill-height>
        <div id="top" ></div>
        <v-row v-if="type == 0">
          <v-col
            v-for="item in videoList"
            :key="item.id"
            cols="12"
          >
  
          <VideoList :video="item" />
          </v-col>

          
        </v-row>
        <v-row v-if="type == 1">
          <v-col
            v-for="item in videoList"
            :key="item.id"
            cols="12"
          >
  
          <VideoList :video="item" />
          </v-col>

        </v-row>

        <v-row v-if="type == 2">
          消息列表

        </v-row>
        <v-snackbar
        v-model="showMessage"
        :top="true"
        :timeout="3000"
      >
        {{ message }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="showMessage = false"
          >
            关闭
          </v-btn>
        </template>
      </v-snackbar>

        <v-row justify="center" style="padding-top: 12px; padding-bottom: 12px">
          <v-pagination
  
            v-model="page"
            :length="length"
            @input="pageChange"
          />
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import Power from '@/utils/check-power.vue'
  import VideoList from '@/components/player/video-list.vue'
  import UserList from '@/components/user/user-list.vue'
  import TimeUtil from '@/utils/time-util.vue'
  export default {
    name: 'UserHome',
    components: {
      VideoList,
      UserList
    },
    data() {
      return {
        TimeUtil,
        Power,
        id: 0,
        userInfo: {},
        localUser:{},
        showFollow:true,
        followMeaasge:'已关注',
        isFollow : 1,
        videoList: [],
        userList:[
        {
            id:12,
            topImgUrl:"https://picsum.photos/id/11/500/300",
            avatarUrl:"https://picsum.photos/id/11/500/300",
            username:"王五",
            fansCount:19,
            follwedCount:90,
            description:"用户的个人简介",
            sex:1
        },
          { id:20,
            topImgUrl:"https://picsum.photos/id/11/500/300",
            avatarUrl:"https://picsum.photos/id/11/500/300",
            username:"王五",
            fansCount:19,
            follwedCount:90,
            description:"用户的个人简介"
          }
        ],
        page: 1,
        size: 20,
        length: 1,
        totalCount: 0,
        type: 0,
        dialogVisible: false,
        cardData:"qq",
        followORFans:1,
        message: '',
        showMessage: false,
        canMessage:true
        
      }
    },
    created() {
      this.id = this.$route.params.id
      this.id = parseInt(this.$route.params.id)
      this.getUserInfo()
      this.checkFollow()
      this.geUserList()
      this.geVideoList()

      
      

    },
    methods: {
      doFollow(){
        if(this.isFollow == 1){         
          this.openConfirm()
        }else{
          this.$axios({
          url:"/user/doFollow/"+this.id,
          method:"get",
        }).then(re=>{
          if(re.status == 200){
            if(re.isFollow == 1){
                this.followMeaasge = '已关注'
                this.isFollow = 1
                this.message = "关注成功!"
                this.showMessage = true

              }else{
                this.message = "关注失败!"
                this.showMessage = true
              }

          }

        })          

        }

      },
      unFollow(){

        this.$axios({
          url:"/user/unFollow/"+this.id,
          method:"get",
        }).then(re=>{
          if(re.status == 200){
            if(re.isFollow == 0){
              this.followMeaasge = '关注他'
              this.isFollow = 0
              this.message = "取消关注成功!"
              this.showMessage = true

              }else{
                this.message = "取消关注失败!"
                this.showMessage = true
              }

          }

        })          

      },
      checkFollow(){
        if(this.id == this.$store.state.userInfo.id){
        //是本人
        this.showFollow = false;
      }else
      {
        // p判断是否关注
        this.showFollow = true;        
        this.$axios({
          url:"/user/isFollow/"+this.id,
          method:"get",
          
        }).then(re=>{

          if (re.status === 200) {
              if(re.isFollow == 1){
                this.followMeaasge = '已关注'
                this.isFollow = 1
              }
              else {
              this.followMeaasge = '关注他'
              this.isFollow = 0
            }
            }

        })
      }
      },
      getUserInfo() {
        this.$axios({
          url:"/user/getUserInfo/"+this.id,
          method:"get",
          
        }).then(re=>{

          if (re.status === 200) {
              this.userInfo = re.data

              this.localUser = this.$store.state.userInfo

              //用户本身不能自己给自己发消息
              if(this.localUser.id == this.userInfo.id){
                canMessage = false
              }
              
            } else {
              
            }
        })

      },
      geVideoList() {
        {
          this.$axios({
            url:"/video/getVideoList",
            method:'get'
          }).then(re=>{
            this.videoList = re.data
          })
          
        }
      },
      geUserList() {
        {
          this.$axios({
            url:"/user/get/list",
            method:'get'
          }).then(re=>{
            this.userList = re.data
          })
          
        }
      },
      openConfirm() {
        this.$confirm('是否取消关注该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("unFollow user")
          this.unFollow()
        }).catch(() => {          
        });
      },
      pageChange(page) {
        this.page = page
        this.geVideoList(this.type)
        this.$vuetify.goTo(0)
      },
      setType(type) {
        this.type = type
        this.page = 1
        if (type === 4) {
          return
        }
        this.geVideoList()
        this.$vuetify.goTo(0)
      },
      //第一次的卡片的展示的内容
      showCard(choose){
    
        this.dialogVisible = true
        if(choose == 1){
          this.cardData = "关注列表"
          this.followORFans=1;
        }else{
          this.cardData = "粉丝列表"
          this.followORFans=2;
        }

      },
      //在卡片内部切换展示内容
      changeCard(choose){
        if(choose == 1){
          this.cardData = "关注列表"
          this.followORFans=1;
        }else{
          this.cardData = "粉丝列表"
          this.followORFans=2;
        }

      },
      // 去消息页面
      gotoMessage(userId){
         
        // this.$router.push('/')
        this.$router.push('/message/'+this.userInfo.id)
      
    
      }
     
    }
  }
  </script>
  
  <style>
  
  </style>
  