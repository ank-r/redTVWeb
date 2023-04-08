<template>

    <!-- 这个组件是聊天窗口 -->
    <div>
    <div class="talk_con2">
            <!-- 显示区域 -->
            <div class="talk_show" id="words">
                <!-- 根据vue对象中的数组，遍历出对应的标签。 -->
                <div v-for="i in talkMessageList" :class="i.notifier==targetUserId?'atalk':'btalk'" style="background-color: whitesmoke;" >
                    <v-avatar size="60"  :class="i.notifier==targetUserId?'aimg':'bimg'">
                        <v-img :src="i.notifierUser.avatarUrl" />
                    </v-avatar>
                    <span>{{ i.content }}</span>
                    
                </div>
            </div>
    
            <!-- 发送内容区域 -->
            <div class="talk_input">
                <!-- 请输入内容 -->
                <!-- <input type="text" class="talk_word" id="talkwords" v-model='messageContent'> -->
                <!-- 按钮 -->
                <!-- <input type="button" value="发送" class="talk_sub" id="talksub" @click="add_data()"> -->
                <TalkInput ref="talkInput"  @func="getMsgFormSon"></TalkInput>
            </div>
     </div>


    </div>
    

</template>

<script>

    
    import TalkInput from '@/components/message/inputBox.vue'
    export default {
      name: 'Talk',
      props: {
        id:[String, Number]
      },
      components: {
        TalkInput
    },
      data() {
        return {
        //   聊天对象
          targetUserId: this.id,
          targetUserInfo:{
          avatarUrl:"/api/get/file/2023-02-21/ab584810757145bca15af17183b34c92.JPG",
          createTime:1676968295866,
          fansCount:0,
          followCount:0,
          id:4,
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
        talkMessageList:[
          {
        "id": 60,
        "notifier": 33,
        "notifierUser":{
          avatarUrl:"/api/get/file/2023-02-21/ab584810757145bca15af17183b34c92.JPG",
          createTime:1676968295866,
          fansCount:0,
          followCount:0,
          id:4,
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
        "outerId": 32,
        "content": "fugiat voluptate reprehenderit in",
        "notificationTitle":"这随便的通知",
        "commentId": 32,
        "type": 55,
        "createTime": 1230431937327,
        "status": 4
        },
        {
        "id": 60,
        "notifier": 33,
        "notifierUser":{
          avatarUrl:"/api/get/file/2023-02-21/ab584810757145bca15af17183b34c92.JPG",
          createTime:1676968295866,
          fansCount:0,
          followCount:0,
          id:4,
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
        "outerId": 32,
        "content": "fugiat voluptate reprehenderit in",
        "notificationTitle":"这随便的通知",
        "commentId": 32,
        "type": 55,
        "createTime": 1230431937327,
        "status": 4
        },
                    
         ],
            messageContent:'',
            //本人
            userInfo: {},
            messageInfo:{
        "id": 60,
        "notifier": 33,
        "receiver": 8,
        "outerId": 32,
        "commentContent": "fugiat voluptate reprehenderit in",
        "messageContent": "qui nulla eiusmod",
        "notificationTitle":"这随便的通知",
        "commentId": 32,
        "type": 55,
        "createTime": 1230431937327,
        "status": 4
        }
      }
    },
    created() {
      this.userInfo = this.$store.state.userInfo
      console.log(this.targetUserId)
    },
    methods:{
      chooseUser(id){
        this.targetUserId = id;
        console.log("选择聊天的用户" +this.targetUserId )

        
        this.$axios({
          url:'/message/get/conversationDetail/'+this.targetUserId,
          method:'get'
        }).then(re=>{
          if(re.status == 200){
            this.talkMessageList = re.data;
          }

        })
      

      },
      add_data(){
                    // bug: 内容不能为空。
                    if(this.messageContent == ''){
                        alert('请输入内容...')
                        return;
                    }

                    var message = {
                        "notifier":this.userInfo.id,
                        "receiver":this.targetUserId,
                        "content":this.messageContent
                    }


                   
                  this.$axios({
                 url:"/message/send",
                 method:'post',
                 data:message
                }).then(re=>{
                  if(re.status != 200){
                    alert(re.message)
                    return
                  }
                })
                   var   sendMessage =      {                   
                        "notifier": this.userInfo.id,
                        "notifierUser":this.userInfo,
                        "receiver": this.targetUserId,                                      
                         "content": this.messageContent,
                        "createTime": 1230431937327,}
                    this.talkMessageList.push(sendMessage)

                    // 添加完内容，清空
                    this.messageContent = '',
                    this.$refs.talkInput.clearMessage();
                }
                ,
        getMsgFormSon(data){
        this.messageContent = data
        console.log(this.messageContent)
        this.add_data();
      }

    }
    }
    </script>
    
<style type="text/css">
    .talk_con1{
        width:600px;
        height:500px;
        border:1px solid #666;
        margin: 30px;
        float: left;
        background:#e98080;
    }

    .talk_con2{
        width:600px;
        height:700px;
        border:1px solid #666;
        margin: 10px;
        float: right;
        background:#7adbd3;
    }
    .talk_show{
        width:580px;
        height:420px;
        border:1px solid #666;
        background:#fff;
        margin:10px auto 0;
        overflow:auto;
    }
    .talk_input{
        width:580px;
        margin:10px auto 0;
    }
    .whotalk{
        width:80px;
        height:30px;
        float:left;
        outline:none;
    }
    .talk_word{
        width:420px;
        height:26px;
        padding:0px;
        float:left;
        margin-left:10px;
        outline:none;
        text-indent:10px;
    }        
    .talk_sub{
        width:56px;
        height:30px;
        float:left;
        margin-left:10px;
    }
    .atalk{
       margin:10px; 
    }
    .atalk span{
        display:inline-block;
        background:#0181cc;
        border-radius:10px;
        color:#fff;
        padding:5px 10px;
        max-width: 450px;
    }
    .aimg{
        float: left;
    }
    .btalk{
        margin:10px;
        text-align:right;
    }
    .btalk span{
        display:inline-block;
        background:#ef8201;
        border-radius:10px;
        color:#fff;
        padding:5px 10px;
        max-width: 450px;
    }
    .bimg{
        float: right;
    }
</style>
