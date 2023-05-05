<template>
    <div>
      <v-row  >
        <v-col
        v-for="item in userList"
        :key="item.id"
        cols="12"
      >

      <UserList :user="item" />
      </v-col>

      </v-row>
    </div>
  </template>
  
  <script>
    import UserList from '@/components/admin/user-list.vue'
  export default {
    name: 'LogInUserList',
    components: {
          UserList
    },
    data() {
      return {
        userList:[]
      }
    },
    created() {
  
      this.geUserList()
  
    },
    methods:{
      geUserList() {
        {
          this.$axios({
            url:"/user/get/list",
            method:'get'
          }).then(re=>{
            this.userList = re.data
            console.log(this.userList)
          })
          
        }
      }
    }

  }
  </script>
  
  <style>
  
  </style>