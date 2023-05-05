<template>
<div>

    <div style="margin-bottom: 10px;">
      <TalkInput ref="talkInput"  @func="getMsgFormSon"></TalkInput>
    </div>
     <div     v-for="messageInfo in commentList"   style="background-color: aliceblue;width: 700px;height: 100;border-radius: 9px;">
        <v-row>
          <v-col cols="1">
            <v-avatar size="50" style="float: left;">
              <v-img :src="messageInfo.notifierUser.avatarUrl" />
              </v-avatar>
          </v-col>
          <v-col style="margin-left: 10px;" >
            <v-row style="margin-top: 5px;">
                <span style="font-size: 15px;">{{ messageInfo.notifierUser.username }}</span>  <span style="font-size: 15px;font-size: 17px; margin-left: 19px;" v-text="TimeUtil.renderTime(messageInfo.createTime)"/>
            </v-row>
            <v-row style="background-color: aqua;max-width: 500px;margin-top: 20px;">            
                <span style="max-width: 500px;font-size: 18px;">{{messageInfo.comment}}</span>
            </v-row>
          </v-col>

        </v-row>
      </div>

</div>

  </template>
  
  <script>
  import TimeUtil from '@/utils/time-util.vue'
  import StringUtils from '@/utils/string-utils.vue'
  import TalkInput from '@/components/message/inputBox.vue'
  export default {
    name: 'VideoComment',
    props: {
      videoInfo:{
      type: Object,
      default: () => {}
    }},
    components: {
        TalkInput
    },
    data() {
      return {
        TimeUtil,
        StringUtils,
        userInfo:{},
        videoInfo:this.videoInfo,
        messageContent:'',
        commentList:[],
      }
    },
    created() {
      this.userInfo = this.$store.state.userInfo
      this.getCommentList()

    },
    methods:{
      addMessage(){
                    // bug: 内容不能为空。
                    if(this.messageContent == ''){
                        alert('请输入内容...')
                        return;
                    }
                    var message = {
                        "commentUser":this.userInfo.id,
                        "articleId":this.videoInfo.id,
                        "content":this.messageContent,
                        "authorId":this.videoInfo.userInfo.id
                    }

                   
                  this.$axios({
                 url:"/comment/send",
                 method:'post',
                 data:message
                }).then(re=>{
                  if(re.status != 200){
                    alert(re.message)
                    
                    return
                  }
                })
                this.getCommentList()
                    // 添加完内容，清空
                    this.messageContent = '',
                    this.$refs.talkInput.clearMessage();
                },

      getCommentList(){

        this.$axios({
          url:'/comment/get/list/'+this.videoInfo.id,
          method:'get'
        }).then(re=>{
          if(re.status == 200){
            this.commentList = re.data;
          }

        })

      },

      getMsgFormSon(data){
        this.messageContent = data
        console.log(this.messageContent)
        this.addMessage();
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  