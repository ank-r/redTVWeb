<template>
<div>
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
label="搜索"
/>

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


<v-tooltip bottom>
  <template v-slot:activator="{ on, attrs }">
    <v-btn
      icon
      v-bind="attrs"
      v-on="on"
      @click="gotoMessage"
    >
      <v-icon>mdi-bell</v-icon>
    </v-btn>
  </template>
  <span>消息</span>
</v-tooltip>
<Head ></Head>
  </v-app-bar>
<v-main>
<div style="width: 80%;margin: auto;">
  <v-row style="margin-bottom: 10px;">
    <h1 style="color: red;">消息中心</h1>
  </v-row>
<v-row>
<v-col cols="2" style="background-color: rgb(243, 247, 247);width: 200px;">
<v-row    class="messageRow" >
  <el-button plain icon="el-icon-bell" class="messageButon" @click="changeMessageType(1)"> 系统通知</el-button>
</v-row>
<v-row class="messageRow"><el-button plain icon="el-icon-star-off"class="messageButon"@click="changeMessageType(2)"> 赞和收藏</el-button></v-row>
<v-row class="messageRow"><el-button plain icon="el-icon-circle-plus"class="messageButon"@click="changeMessageType(3)"> 新增关注</el-button></v-row>
<v-row class="messageRow"><el-button plain icon="el-icon-chat-dot-square"class="messageButon"@click="changeMessageType(4)"> 收到评论</el-button></v-row>
<v-row class="messageRow"><el-button plain icon="el-icon-chat-round"class="messageButon"@click="changeMessageType(5)"> 我的私信</el-button></v-row>
</v-col>
<v-col style="background-color: bisque;">
  <div>
    <div v-if="messageType == 1">
     <div class="messageCard">  
      <h4>{{messageInfo.notificationTitle}}</h4>
      
      <bdi class="detail">{{messageInfo.content}}</bdi>
      <el-button plain icon="el-icon-more-outline" style="font-size: 8px;height: 7px;" @click="showSystemMessage">查看更多</el-button>
      <div style="margin-top: 4px;"><span v-text="TimeUtil.renderTime(messageInfo.createTime)"/></div>
     </div>

     <el-dialog
          
     :visible.sync="systemMesageVisible"
     width="50%"
     >
     
     <h4>{{messageInfo.notificationTitle}}</h4>
      
      <bdi >{{messageInfo.content}}</bdi>
      <div style="margin-top: 4px;"><span v-text="TimeUtil.renderTime(messageInfo.createTime)"/></div>
    
    
   </el-dialog>

    </div>
    <div v-if="messageType == 2">
      <div class="messageCard" v-for="messageInfo in this.likeMessageList">
        <v-row> 
          <v-col cols="1">
            <v-avatar size="60" style="float: left;">
              <v-img :src="messageInfo.notifierUser.avatarUrl" />
              </v-avatar>
          </v-col>
          <v-col>
            <h4 style="margin-top: 5px;margin-left: 10px; margin-bottom: 10px;">
              {{ messageInfo.notifierUser.username }}
            </h4>
            <span style="font-size: 15px;" v-text="TimeUtil.renderTime(messageInfo.createTime)"/> <span style="font-size: 15px;" >点赞了我的视频</span>

          </v-col>
          <v-col>
            <div style="position: relative; width: 170px; height: 89px;background-color: aqua;">
              <img :src="messageInfo.articleInfo.imgUrl" style="height: 90px;width: 170px; border-radius: 7px;" alt="">
              <span style="position: absolute; top: 3px; left: 3px;"class="detail">{{messageInfo.articleInfo.describes}}</span>
              </div> 
          </v-col>
      </v-row>
      </div>

    </div>
    <div v-if="messageType == 3">
      <div class="messageCard" v-for="messageInfo in followMessageList">
        <v-row> 
          <v-col cols="1">
            <v-avatar size="60" style="float: left;">
              <v-img :src="messageInfo.notifierUser.avatarUrl" />
              </v-avatar>
          </v-col>
          <v-col>
            <h4 style="margin-top: 5px;margin-left: 10px; margin-bottom: 10px;">
              {{ messageInfo.notifierUser.username }}
            </h4>
            <span style="font-size: 15px;" v-text="TimeUtil.renderTime(messageInfo.createTime)"/> <span style="font-size: 15px;" >关注了我</span>

          </v-col>
          <v-col>

            <el-button plain icon="el-icon-circle-plus" style="height: 50px; width: 100px;"> 回关</el-button>
           
          </v-col>
      </v-row>
      </div>

    </div>
    <div v-if="messageType == 4">
      <div class="messageCard" v-for="messageInfo in commentMessageList">
        <v-row> 
          <v-col cols="1">
            <v-avatar size="60" style="float: left;">
              <v-img :src="messageInfo.notifierUser.avatarUrl" />
            </v-avatar>
          </v-col>
          <v-col>
            <h4 style="margin-top: 5px;margin-left: 10px; margin-bottom: 10px;">
              {{ messageInfo.notifierUser.username }}
            </h4>
            <span style="font-size: 15px;" v-text="TimeUtil.renderTime('2000-11-26')"/> <span style="font-size: 15px;" >评论我的视频</span>
            <span class="detail">{{messageInfo.content}}</span>
      
          </v-col>
          <v-col>
            <div style="position: relative; width: 170px; height: 89px;background-color: aqua;">
              <img :src="messageInfo.articleInfo.imgUrl" style="height: 90px;width: 170px; border-radius: 7px;" alt="">
              <span style="position: absolute; top: 3px; left: 3px;"class="detail">{{messageInfo.articleInfo.describes}}</span>
              </div> 
          </v-col>
      </v-row>
      </div>
    </div>
    <div v-if="messageType == 5">
      <v-row>
        <v-col>
          <div v-for="messageInfo in talkMessageList" style="background-color: aliceblue;width: 350px;height: 100;border-radius: 9px;">
            <v-row>
              <v-col cols="2">
                <v-avatar size="50" style="float: left;">
                  <v-img :src="messageInfo.notifierUser.avatarUrl" />
                  </v-avatar>
              </v-col>
              <v-col cols="3">
                <h4 style="margin-top: 5px;margin-left: 0px; margin-bottom: 10px;">
                  {{ messageInfo.notifierUser.username }}
                </h4>
                <v-row style="background-color: aqua;width: 280px;height: 50px;" @click="chooseUser(messageInfo.notifierUser.id)">
                  <v-col cols="7">
                    <span class="detail" style="width: 150px; -webkit-line-clamp: 1;font-size: 12px;">{{messageInfo.content}}</span>
                  </v-col>
                    <v-col>
                      <p style="font-size: 15px;font-size: 12px;" v-text="TimeUtil.renderTime(messageInfo.createTime)"/>
                    </v-col>
                </v-row>
              </v-col>

            </v-row>
          </div>

        </v-col>
        
        <v-col>
          <div>
            <Talk ref="talk" ></Talk>
          </div>

        </v-col>


      </v-row>


    </div>
    

  </div>

</v-col>


</v-row>



</div>


</v-main>

</div>

</template>
<style>
.messageRow{
  width: 90%;margin: auto;
}
.messageButon{
  height: 60px;width: 165px;margin: auto;
  font-size: 24px;
}

.detail{
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;	
-webkit-line-clamp: 2;	
-webkit-box-orient: vertical;
}
.messageCard{
  width: 90%;height: 130px;background-color: aqua;padding-left: 20px;
}

</style>

<script>
  import Head from '@/views/layout/components/head.vue'
  import TimeUtil from '@/utils/time-util.vue'
  import Talk from '@/components/message/talk.vue'
  import TalkView from '@/components/message/talkView.vue'
    export default {
    name: 'MessageView',
    components: {
      Head,
      Talk,
      TalkView
    },
    data() {
      return {
      
        id: 0,
        systemMesageVisible:false,
        TimeUtil,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        userInfo: {},
        talkuser:{},
        messageInfo:{
        "id": 60,
        "notifier": 33,
        "notifierUser":{
          avatarUrl:"/api/get/file/2023-02-21/ab584810757145bca15af17183b34c92.JPG",
          createTime:1676968295866,
          fansCount:0,
          followCount:0,
          id:33,
          introduction:"好好学习，天天向上",
          isAdmin:0,
          mail:"1726182716@qq.com",
          password:"123456",
          phone:"18315083335",
          submitCount:0,
          token:"fa804f6059f54d7abad58d3dd4fabb37",
          topImgUrl:"/api/get/file/2023-02-22/1dafd8f36b3f4f0189293924a97239f2.JPG",
          username:"admin"
        },
        "receiver": 8,
        "receiverUser":{
          avatarUrl:"/api/get/file/2023-02-15/618e08db4ce1438299b60c3e75bb013b.JPG",
          createTime:1676712057590,
          fansCount:0,
          followCount:0,
          id:2,
          introduction:null,
          isAdmin:0,
          mail:"2837246896@qq.com",
          password:"123456",
          phone:"18315083335",
          submitCount:0,
          token:"7e375239e9e84c72a5a1a6ccc3471e38",
          topImgUrl:"/api/get/file/2023-02-15/618e08db4ce1438299b60c3e75bb013b.JPG",
          username:"nini"
        },
        "outerId": 32,
        "articleInfo":    {
      "id": 3,
      "imgUrl": "/api/get/file/2023-02-21/85ab7112b5474437b4e3b64a93671650.JPG",
      "articleUrl": "/api/get/file/2023-02-21/915986aa03c64c65b85a6e6c5a787a88.MP4",
      "title": "fgf",
      "describes": "gfgf",
      "viewCount": 0,
      "likeCount": 0,
      "danmakuCount": 0,
      "commentCount": 0,
      "examineStatus": 0,
      "examineMessage": null,
      "examineUser": null,
      "category": 39,
      "userId": 2,
      "type": 0,
      "createTime": 1676946308077,
      "updateTime": 1676946308077,
      "status": 1,
      "score": null,
      "scoreCount": null,
      "duration": null,
      "userInfo": {
        "id": 2,
        "username": "nini",
        "mail": "2837246896@qq.com",
        "password": "123456",
        "phone": "18315083335",
        "createTime": 1676712057590,
        "submitCount": 0,
        "followCount": 0,
        "fansCount": 0,
        "avatarUrl": "/api/get/file/2023-02-15/618e08db4ce1438299b60c3e75bb013b.JPG",
        "isAdmin": 0,
        "introduction": null,
        "topImgUrl": "/api/get/file/2023-02-15/618e08db4ce1438299b60c3e75bb013b.JPG",
        "token": null
      }
    },
        "content": "fugiat voluptate reprehenderit in",
        "notificationTitle":"这随便的通知",
        "commentId": 32,
        "type": 55,
        "createTime": 1230431937327,
        "status": 4
        },
        
        messageType:1,
        notificationList:[],
        likeMessageList:[],
        followMessageList:[],
        commentMessageList:[],
        talkMessageList:[]

      }
    },
    created() {
      this.id = this.$route.params.id
      this.id = parseInt(this.$route.params.id)
      console.log("需要交谈的对象是："+this.id)

      this.userInfo = this.$store.state.userInfo
      console.assert(this.id)
      this.getCommentMessage()
      this.getFollowMessage()
      this.getLikeMessage()
      // this.getAllConversation()
      this.chooseTalk()
    //   this.getUserInfo()
    //   this.geVideoList()
    },
    methods: {
        chooseUser(userId){
          this.$refs.talk.chooseUser(userId)
      },
      changeMessageType(type){
        this.messageType = type;
        if(type == 5){
          this.getAllConversation()

        }

      },
      showSystemMessage(){
        this.systemMesageVisible=true;
      },
      goToHome() {
      if (this.$route.path === '/') {
        return
      }
      this.$router.push('/')
    },

      getNotification(){

        this.$axios({
          url:'/message/get/notification',
          method:'get'
        }).then(re=>{
          if(re.status == 200){
            this.notificationList = re.data;
          }

        })
      },
      getLikeMessage(){
        this.$axios({
          url:'/message/get/like',
          method:'get'
        }).then(re=>{
          if(re.status == 200){
            this.likeMessageList = re.data;
          }

        })
      },
      getFollowMessage(){
        this.$axios({
          url:'/message/get/follow',
          method:'get'
        }).then(re=>{
          if(re.status == 200){
            this.followMessageList = re.data;
          }

        })
      },
      getCommentMessage(){
        this.$axios({
          url:'/message/get/comment',
          method:'get'
        }).then(re=>{
          if(re.status == 200){
            this.commentMessageList = re.data;
          }

        })
      },
      getAllConversation(){
        this.$axios({
          url:'/message/get/allConversation',
          method:'get'
        }).then(re=>{
          if(re.status == 200){
            this.talkMessageList = re.data;
          }

        })
      },
      getTalkUser(){
        this.$axios({
          url:"/user/getUserInfo/"+this.id,
          method:"get",
          
        }).then(re=>{
          if (re.status === 200) {
              this.talkuser = re.data              
            } else {
              
            }
        })
      },
     async chooseTalk(){
        if(this.id == 0){
          //普通的进入私信列表
          console.log("普通进入私信列表")

        }else{

          this.messageType = 5
          console.log("开始新的谈论")
          let has = 0;
          for(let item in this.talkMessageList){
              if(item.notifier == this.id){
                has = 1
                console.log("有当前用户")
                this.chooseUser(this.id)
                break;
              }
          }
          console.log("1111111111111")
          if(has == 0 ){
            console.log("新建消息")

            this.$axios({
          url:"/user/getUserInfo/"+this.id,
          method:"get",
          
        }).then(re=>{
          if (re.status === 200) {
              this.talkuser = re.data    
              
                       
        var talkMessage = {
        "id": this.id,
        "notifier": this.id,
        "notifierUser":this.talkuser,
        "content": "",
        "notificationTitle":"",
        "createTime": new Date().getTime(),
        "status": 0
        }
        this.talkMessageList.push(talkMessage)
       this.chooseUser(this.id)




            } else {
              
            }
        })


          }


        }

      },
      gotoMessage(userId){
         
         // this.$router.push('/')
         this.$router.push('/message/'+this.userInfo.id)
       
     
       },
       goToPublish() {
      this.$router.push('/upload')
    },
      
    }
  }
</script>