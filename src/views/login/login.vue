<template>
    <v-main>
      <v-container fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-card
              class="mx-auto"
              max-width="500"
            >
              <v-row style="height: 64px" justify="center">
                <v-col cols="10">
  
                  <v-btn text @click="backHome">
                    <v-icon>
                      mdi-arrow-left
                    </v-icon>
                    返回
                  </v-btn>
  
                </v-col>
              </v-row>
              <!-- <v-row justify="center">
                <img
                  :src="this.$store.state.webInfo.logoUrl"
                  height="36px"
                >
              </v-row> -->
              <!-- <v-row justify="center">
                <h1>{{ this.$store.state.webInfo.name }} &nbsp; &nbsp;  {{ type }}</h1>
              </v-row> -->
              <v-row style="height: 48px" />
              <LoginFrom v-show="showLogin" @login="userLogin" />
              <RegisterFrom v-show="showLogin == false" @register="register" />
              <v-row justify="center">
                <!-- <v-col cols="5">
                  <v-btn text color="primary">忘记密码</v-btn>
  
                </v-col> -->
                <v-col cols="5" style="text-align:right">
                  <v-btn text @click="moveRegister">{{ moveMessage }}</v-btn>
                </v-col>
              </v-row>
  
            </v-card>
          </v-col>
  
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
      </v-container>
    </v-main>
  </template>
  
  <script>
  import LoginFrom from '@/components/login/login-form.vue'
  import RegisterFrom from '@/components/login/register-from.vue'
  
  export default {
    name: 'Login',
    components: {
      LoginFrom,
      RegisterFrom
    },
    data() {
      return {
        verifyImageUrl: '',
        captchaToken:'',
        user: {},
        type: '登录',
        moveMessage: '没有账号，创建账号',
        showLogin: true,
        message: '',
        showMessage: false
      }
    },
    created() {
  
    },
    methods: {
      userLogin(value) {
            this.$axios({
            url:"/login/ordinary",
            method:"post",
            data:value
          }).then(re=>{
            console.log("输出登录返回")
            console.log(re.status)
           if(re.status === 200){
            //保存用户
            this.$store.commit('setUserInfo',re.data)
            // 跳转到首页
            this.$router.push('/')

           }else{
            //出错了，提示错误信息
            console.log("出错的逻辑")
            // console.log(json.message+"出错了")
            // console.log("出错了----")
            this.message = re.message
            this.showMessage = true
           }

          }).catch(e=>{


          })  


      },
      register(value) {
        this.$axios({
          url:"/user/register",
          method:"post",
          data:value
        }).then(re=>{

          if (re.status === 200) {
              this.message = '注册成功，即将为你跳转到登录页面！'
              this.showMessage = true
              this.moveRegister()
            } else {
              this.message = re.message
              this.showMessage = true
            }

        })



      },
      moveRegister() {
        if (this.type === '登录') {
          this.type = '注册'
        } else {
          this.type = '登录'
        }
        if (this.moveMessage === '没有账号，创建账号') {
          this.moveMessage = '已有账号，我要登录'
        } else {
          this.moveMessage = '没有账号，创建账号'
        }
        this.showLogin = !this.showLogin
      },
      backHome() {
        this.$router.push('/')
      }


    }
  }
  </script>
  
  <style>
  
  </style>
  