<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col>
        <v-card
          class="mx-auto"
          outlined
        >
          <div id="top" />
          <v-row justify="center">
            <div id="top" />
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="videoList"
                hide-default-footer
                :items-per-page="size"
                :page.sync="page"
              >
                <template v-slot:item.createTime="{ item }">
                  {{ TimeUtil.renderTime(item.createTime) }}
                </template>
                <template v-slot:item.type="{ item }">
                  {{ getType(item.type) }}
                </template>
                <template v-slot:item.userId="{ item }">
                  <a :href="`/user/${item.userId}`" target="_blank"> {{ item.userInfo.username }} </a>
                </template>
                <template v-slot:item.imgUrl="{ item }">
                  <v-img :src="item.imgUrl" max-height="200px" aspect-ratio="1.77" />
                </template>
       
                <template v-slot:item.actions="{ item }">
            
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        
                        @click="videoDetail(item)"
                      >
                      <i class="el-icon-more"></i>
                      </v-btn>
                    </template>
                    <span>视频详细信息</span>
                  </v-tooltip>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        @click="removeVideo(item)"
                      >
                      <i class="el-icon-delete"></i>
                      </v-btn>

                    </template>
                    <span>下架视频</span>
                  </v-tooltip>
                </template>

                <template v-slot:no-data>
                  <v-btn color="primary" @click="init">重新加载</v-btn>
                </template>
              </v-data-table>
            </v-col>

            <el-dialog
  :title="videoInfo.title"
  :visible.sync="centerDialogVisible"
  width="500px"
  center>
  
  <div style="width: 500px">
  <v-row style="width: 100%;">
    <v-col cols="5">
      <router-link :to="`/video/${videoInfo.id}`">
        <v-img
          :src="videoInfo.imgUrl"
          outlined
          aspect-ratio="1.77"
          class="white--text align-end"
          style="width: 100%;"
        >
        </v-img>
      </router-link>
    </v-col>
    <v-col cols="5" >
      {{videoInfo.describes}}
    </v-col>

  </v-row>
  
    <v-row style="padding-top: 12px; padding-bottom: 12px">
      <v-col cols="2">
      </v-col>
      <v-col cols="10">
        <p style="font-size: 20px; margin-bottom: 0px;color: black;">
          <router-link :to="`/video/${videoInfo.id}`" style="color: black;">
            {{ videoInfo.title }}
          </router-link>
        </p>
        <p style="font-size: 18px; color: #606060;">
          {{ videoInfo.viewCount }} 观看 <span v-html="`&nbsp;&nbsp;`" />
          {{ videoInfo.danmakuCount }} 条弹幕 <span v-html="`&nbsp;&nbsp;`" />
          {{ videoInfo.commentCount }} 条评论 <span v-html="`&nbsp;&nbsp;`" />
          <br>
          <span v-text="TimeUtil.timeToNowStrning(videoInfo.createTime)" />
        </p>
      </v-col>
    </v-row>
  
  </div>
  <span slot="footer" class="dialog-footer">
    
    <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
  </span>
            </el-dialog>

          </v-row>

          <v-row justify="center" style="padding-top: 12px; padding-bottom: 24px">
            <v-pagination
              v-model="page"
              :length="length"
              @input="pageChange"
            />
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
</template>

<script>
import TimeUtil from '@/utils/time-util.vue'
export default {
  name: 'Examine',
  data() {
    return {
      showMessage: false,
      centerDialogVisible: false,
      message: '',
      errorType: '',
      examineMessage: '',
      examineStatus: ['通过', '不通过'],
      showError: false,
      examineItem: [],
      videoInfo:{},
      dialog: false,
      nowExamineItem: {},
      TimeUtil,
      videoList: [],
      headers: [
        {
          text: '视频ID',
          sortable: false,
          value: 'id'
        },
        { text: '创建时间', sortable: false, value: 'createTime' },
        { text: '作者', sortable: false, value: 'userId' },
        { text: '标题', sortable: false, value: 'title' },
        { text: '封面', sortable: false, value: 'imgUrl' },
        { text: '操作', value: 'actions', sortable: false }
      ],                                                                                                                                                                                                                                                                                                 
      page: 1,
      size: 20,
      length: 1
    }
  },
  created() {
    this.init()
    this.setExamineItem()
  },
  methods: {
    save() {
      let result = true

      if (this.showError === false) {
        result = true
      } else {
        result = false
      }

      const data = {
        videoId: this.nowExamineItem.id,
        result,
        type: this.errorType,
        message: this.examineMessage
      }

      fetch(`/api/admin/examine`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
      }).then(response => response.json())
        .then(json => {
          if (json.status === 200) {
            //
            this.message = '审核结束'
            this.showMessage = true
            this.init()
            this.dialog = false
          } else {
            //
            this.message = '审核失败' + json.message
            this.showMessage = true
            this.init()
            this.dialog = false
          }
        })
        .catch(e => {
          return null
        })
    },
    getErrorString(value) {
      this.errorType = value
      console.log(value)
    },
    getexamineStatus(value) {
      if (value === '不通过') {
        this.showError = true
      } else {
        this.showError = false
      }
      console.log(value)
    },
    examine(value) {
      this.dialog = true
      this.nowExamineItem = value
    },
    removeVideo(value){
      // console.log(value);
      let videoId = value.id
      console.log(videoId)

        let info = "你确定要删除该视频吗"
          this.$confirm(info, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
          url:"/video/delete/"+value.id,
          method:'post'
        }).then(re=>{
          
          if(re.status == 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          }

        }).catch(e=>{
          this.$message({
            type: 'info',
            message: '删除失败'
          });          

          return null
        })
        }).catch((re) => {
          
          console.log("出现错误")
          console.log(re)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    videoDetail(value){
      console.log(value);
      let videoId = value.id
      console.log(videoId)
      this.centerDialogVisible = true
      this.videoInfo = value
    },
    init() {

        this.$axios({
          url:"/video/getVideoList",
          method:'get'
        }).then(re=>{
          this.videoList = re.data
        }).catch(e=>{
          return null
        })
    },
    setExamineItem() {
      fetch(`/api/examine/item`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json())
        .then(json => {
          this.examineItem = json.data
        })
        .catch(e => {
          return null
        })
    },
    pageChange(value) {
      this.page = value
      this.videoList()
      document.querySelector('#top').scrollIntoView()
    },
    getType(code) {
      if (code === 0) {
        return '视频'
      } else if (code === 1) {
        return '图片'
      } else if (code === 2) {
        return '文章'
      } else {
        return '音乐'
      }
    }
  }
}
</script>

<style>

</style>
