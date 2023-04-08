<template>

    <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="2" class="navbar">
              <i class="el-icon-menu"></i>
              <span slot="title">
                <router-link to="/" >首页</router-link></span>
              </span>
            </el-menu-item>
            <el-menu-item index="3"  class="navbar" >
              <i class="el-icon-document"></i>
              <span slot="title">
                <router-link to="/" >推荐</router-link></span>
              </span>
            </el-menu-item>
            <el-menu-item index="4"  class="navbar">
              <i class="el-icon-setting"></i>
              <span slot="title">
                <router-link to="/about" class = "navbar" >关注</router-link>
              </span>
            </el-menu-item>

            <el-menu-item index="4"  class="navbar">
                <i class="el-icon-setting"></i>
                <span slot="title">
                  <router-link to="/about" class = "navbar" >分类</router-link>
                </span>
              </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>


</template>

<script>
export default {
  name: 'Indexnav',
  components: {
    
  },

  data() {
    return {
    

  
    }
  },
  created() {
  },
  methods: {
   
  }
}




</script>

<style>

.navbar{

color: #000;
text-decoration: none;
height: 50px;
width: 200px;
border: #000 solid 1px;
margin: auto; 



}

</style>