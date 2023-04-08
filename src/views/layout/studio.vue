<template>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
      >
        <router-link :to="`/user/${this.$store.state.userInfo.id}`">
          <v-row justify="center" align="center">
            <v-col cols="12" style="text-align: center;margin-top: 12px;">
              <v-avatar size="62">
                <v-img :src="this.$store.state.userInfo.avatarUrl" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12" style="text-align: center">
              {{ this.$store.state.userInfo.username }}
            </v-col>
          </v-row>
        </router-link>
        <router-link v-for="item in items" :key="item.text" :to="item.link">
          <v-list-item
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
  
          </v-list-item>
        </router-link>
       
        <div >
          <router-link v-for="item in adminList" :key="item.text" :to="item.link">
            <v-list-item
              link
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
  
            </v-list-item>
          </router-link>
        </div>
      </v-navigation-drawer>
  
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="red"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
        >
          <span class="hidden-sm-and-down">RedTV管理中心</span>
        </v-toolbar-title>

        <v-spacer />


        <!--  登陆后 -->
        <Head v-if="this.$store.state.userInfo" />
        <!-- 未登录 -->
        <v-btn
          v-if="this.$store.state.userInfo == null"
          outlined
          @click="goToLoginPage"
        >
          <v-icon left dark>mdi-account</v-icon> 登录
        </v-btn>
  
      </v-app-bar>
  
      <v-main>
  
        <router-view />
  
      </v-main>
    </div>
  </template>
  
  <script>
  import Head from '@/views/layout/components/head.vue'
  export default {
    components: {
      Head
    },
    data: () => ({
  
      drawer: true,
      items: [
        { icon: 'mdi-application', text: 'RedTV管理中心', link: '/studio' },
        { icon: 'mdi-upload', text: '影视上架', link: '/studio/upload' }
      ],
      adminList: [
        { icon: 'mdi-application', text: '邀请码管理', link: '/studio/admin/invitation' },
        { icon: 'mdi-video', text: '审核视频', link: '/studio/admin/examine' },
        { icon: 'mdi-filmstrip-box-multiple', text: '视频列表', link: '/studio/admin/videolist' },
        { icon: 'mdi-account-multiple', text: '用户列表', link: '/studio/admin/userlist' },
        { icon: 'mdi-account-multiple', text: '用户数据', link: '/studio/admin/userdata' },
        { icon: 'mdi-playlist-edit', text: '分类管理', link: '/studio/admin/category' }
      ]
    }),
    mounted() {
  
    },
    created() {
      this.$vuetify.theme.dark = this.$store.state.darkThemOpen
    },
    methods: {
      goToLoginPage() {
        this.$router.push('/login')
      },
      goToPublish() {
        if (this.$route.path === '/studio/upload') {
          return
        }
        this.$router.push('/studio/upload')
      },
      goToUserHome() {
        this.$router.push('/user/' + this.$store.state.userInfo.id)
      }
  
    }
  }
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  </style>
  