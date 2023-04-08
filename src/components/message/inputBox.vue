<template>
<div>
    <el-popover
    placement="bottom"
    title="标题"
    width="500"
    height="700"
    trigger="click"
    v-model="emojiShow"
  >
    <el-button slot="reference">😀</el-button>
    <div class="browBox">
      <ul>
        <li
          v-for="(item, index) in faceList"
          :key="index"
          @click="getBrow(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
</el-popover>
<el-button
    class="submit-btn"
    type="primary"
    @click="submitMessage"
    :disabled="content == ''"
    >发送
</el-button>
<el-input
    :rows="3"
    type="textarea"
    placeholder="请输入内容"
    @keyup.enter.native="submitMessage"
    v-model="content"
  >
</el-input>

</div>

</template>

<script>
    const appData = require("@/assets/images/emojis.json");
    export default {
      name: 'TalkInput',
      props: {
        id:[String, Number]
      },
      data() {
        return {
          userId: this.id,
                userInfo: {
            id:12,
            topImgUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            avatarUrl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            username:"王五",
            fansCount:19,
            follwedCount:90,
            description:"用户的个人简介",
            sex:1,
            worksCount:22
        },
           //聊天输入内容
      content: "",
      //表情框是否展示
      emojiShow: false,
      //表情列表
      faceList: [],
      //表情文本
      getBrowString: "",
    }
    },
    created() {
    this.loadEmojis();
    },

methods: {
//加载表情，存放到表情列表中
 loadEmojis() {
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
     // 获取用户点击之后的标签 ，存放到输入框内
 getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.content += this.getBrowString;
        }
      }
      this.emojiShow = false;
    },
    submitMessage(){
    //提交。。。
    this.$emit('func',this.content)
    },
    clearMessage(){
      this.content = '';
    }
   }

}
    </script>
    
<style lang="less">
.browBox {
  width: 100%;
  height: 200px;
  background: #e6e6e6;
  position: absolute;
  z-index: 100;
  bottom: 0px;
  overflow: scroll;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    li {
      cursor: pointer;
      width: 10%;
      font-size: 26px;
      list-style: none;
      text-align: center;
    }
  }
}
.submit-btn {
  margin: 0 15px 10px 0;
  float: right;
}

</style>
