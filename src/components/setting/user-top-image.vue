<template>
    <v-row justify="center" align="center">
      <v-col>
        <v-card
          class="mx-auto"
          outlined
        >
          <v-row justify="center" style="padding-top: 12px; padding-bottom: 12px">
            <v-col cols="10">
              <h2>首页顶部大图修改</h2>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
  
              <v-img :src="userInfo.topImgUrl" :aspect-ratio="5.98" />
  
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
                <el-upload
                class="upload-demo"
                action="/api/upload/image"
                :on-success="uploadSuccess"
                accept="image/png, image/jpeg, image/bmp"
                list-type="picture">
                <div style="margin-left:  20px;">
                  <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </div>
              </el-upload>
             
            </v-col>
          </v-row>
          <v-row justify="center" style="padding-top: 12px; padding-bottom: 12px">
            <v-col cols="10">
              <v-btn color="primary" @click="save">
                保存
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
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
    </v-row>
  </template>
  
  <script>
  
  export default {
    name: 'UserTopSetting',
    data() {
      return {
        userInfo: {
          username: ''
        },
        files: [],
        rules: [
          value => !value || value.size < 2000000 || '图片大小必须在2MB以内！'
        ],
        showMessage: false,
        message: ''
      }
    },
    created() {
      this.userInfo = this.$store.state.userInfo
    },
    methods: {
        uploadSuccess(re, file, fileList){
        
        if(re.status == 200){
                        this.userInfo.topImgUrl = re.data.fileUrl;
                        this.message = '上传成功，请点击保存，保存头像设置！'
                        this.showMessage = true
                    }else{
                        this.message = '上传失败，请重试！' + json.message
                        this.showMessage = true
                    }
      },
      save() {

        this.$axios({
            url:'/user/update/info',
            method:'post',
            data:this.userInfo
        }).then(re=>{
            if (re.status === 200) {
            this.$store.commit('setUserInfo', this.userInfo)
            this.message = '保存成功！'
            this.showMessage = true
          } else {
            //
            this.message = '保存失败！' + json.message
            this.showMessage = true
          }

        })
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  