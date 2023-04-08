<template>

    <v-row style="padding-top: 12px; padding-bottom: 12px ;margin-bottom: 2px; 
    border: 1px solid #EDE7F6;
    border-radius: 10px;
    " >
      <v-col cols="3" >
        <router-link :to="`/user/${userInfo.id}`">
            <v-col
            cols="12"
            md="8"
          >
            <v-avatar size="40" style="float: left;">
              <v-img :src="userInfo.avatarUrl" />
            </v-avatar>
            <h4 style="margin-top: 10px;margin-left: 50px;">
              {{ userInfo.username }}
            </h4>
          </v-col>
        </router-link>
      </v-col>
      <v-col >
        <div>
            <span>关注:{{userInfo.follwedCount}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>粉丝数:{{userInfo.fansCount}}</span>
            
          </div>
          <div>{{userInfo.description}}</div>
      </v-col>
    <v-col>
        <el-button type="primary" size="small" round="true" style="background-color:  red;">已关注</el-button>

    </v-col>
      
     
    </v-row>
  
  </template>
  
  <script>
  import TimeUtil from '@/utils/time-util.vue'
  import StringUtils from '@/utils/string-utils.vue'
  export default {
    name: 'UserList',
    props: {
      user: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        TimeUtil,
        StringUtils,
        userInfo: this.user
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  