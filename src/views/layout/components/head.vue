<template>
  <v-menu v-if="this.$store.state.userInfo" top offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        v-bind="attrs"
        icon
        large
        v-on="on"
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            :src="userInfo.avatarUrl"
            :alt="userInfo.username"
            :title="userInfo.username"
          /></v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in headItem"
        :key="index"
        link
        @click="headClick(item.id)"
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
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Head',
  data() {
    return {
      
      userInfo: {
            
        },
      headItem: [
        { icon: 'mdi-account', text: '个人主页', link: '/user/', id: 0 },
        { icon: 'mdi-wrench', text: '设置', link: '/user/setting', id: 1 },
        { icon: 'mdi-logout', text: '退出', link: '/logout', id: 2 }
      ]
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo
  },
  methods: {
    headClick(value) {
      if (value === 0) {
        this.$router.push('/user/' + this.userInfo.id)
        // location.replace('/user/' + this.userInfo.id)
        console.log("去个人主页")
        return
      } else if (value === 1) {
        if (this.$route.path === '/user/setting') {
          return
        }
        console.log("去设置页")
        this.$router.push('/user/setting')
        // location.replace('/user/setting')
        return
      } 
      this.logout()
  
    },
    logout() {
      this.$store.commit('setUserInfo', null)
      console.log("用户退出")
    }
  }
}
</script>

<style>

</style>
