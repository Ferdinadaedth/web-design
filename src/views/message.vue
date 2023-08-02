<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div id="building4">
<div id="back">
<el-page-header @back="redirectToLogin('user')" content="私信内容" class="custom-page-header">
</el-page-header>
</div>
 <h2 class="title">用户私信</h2>
  <div class="message-list">
    <div v-if="notnull3">
    <div v-for="message in messages" :key="message.messageid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-content">私信内容: {{ message.content }}</p>
        <p class="question-username">发送者: {{ message.sender }}</p>
        <button @click="showmessageDialog(message.sender)" class="message"> 私信
  <i class="el-icon-message"></i>
</button>
      </div>
      <el-divider id="dj"></el-divider>
    </div>
  </div>
    <div v-else>
    <el-empty description="空空如也"></el-empty>
    </div>
    </div>
    <h2 class="title">我发送的</h2>
  <div class="message-list">
    <div v-if="notnull4">
    <div v-for="message in smessages" :key="message.messageid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-content">私信内容: {{ message.content }}</p>
        <p class="question-username">发送给了: {{ message.receiver }}</p>
        <button @click="showmodifyDialog(message.messageid)" class="message"> 编辑
  <i class="el-icon-message"></i>
</button>
        <button @click="showdeleteDialog(message.messageid)" class="message"> 删除
  <i class="el-icon-delete"></i>
</button>
      </div>
      <el-divider id="dj"></el-divider>
    </div>
  </div>
    <div v-else>
    <el-empty description="空空如也"></el-empty>
    </div>
    </div>
    <el-dialog
    title="编辑"
    :visible.sync="modifyvisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <el-input v-model="content" placeholder="请输入修改后的私信"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="modifyvisible = false">取消</el-button>
      <el-button type="primary" @click="modifym">确认</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="警告"
    :visible.sync="deletevisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <span>确认要删除?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deletevisible = false">取消</el-button>
      <el-button type="primary" @click="deletem">确认</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="回复"
    :visible.sync="messageDialogvisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <el-input v-model="message" placeholder="请输入回复"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="messageDialogvisible = false">取消</el-button>
      <el-button type="primary" @click="pubmessage">确认</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { user, getmessage, message, getsendingmessage, modifym, deletem } from '@/api/user'
export default {
  data() {
    return {
      messages: [],
      smessages: [],
      message: '',
      content: '',
      messageDialogvisible: false,
      modifyvisible: false,
      deletevisible: false,
      questionid: '',
      currentquestionid: '',
      currentmessageid: '',
      currentmessageid2: '',
      username: '',
      notnull3: true,
      nowusername: '',
      notnull4: true
    }
  },
  created() {
    this.getusername()
    this.Getmessage()
    this.Getsendingmessage()
  },
  methods: {
   goBack() {
        console.log('go back')
      },
   async redirectToLogin(name) {
      this.$router.push(name)
    },
     showmessageDialog(name) {
     this.messageDialogvisible = true
     this.nowusername = name
     },
     showmodifyDialog(id) {
     this.modifyvisible = true
     this.currentmessageid = id
     },
     showdeleteDialog(id) {
     this.deletevisible = true
     this.currentmessageid2 = id
     console.log(id)
     },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      async getusername() {
      const { data: res } = await user()
      this.username = res.username
      console.log(this.username)
      },
      async Getmessage() {
        const { data: res1 } = await getmessage()
        if (res1.message == null || res1.message == 'null') {
           this.notnull4 = false
        } else {
        this.messages = res1.message
        console.log(this.messages)
        }
      },
      async Getsendingmessage() {
        const { data: res1 } = await getsendingmessage()
        if (res1.message == null || res1.message == 'null') {
           this.notnull4 = false
        } else {
        this.smessages = res1.message
        console.log(this.smessages)
        }
      },
      async pubmessage() {
        const postData = new URLSearchParams() // 创建一个 postform 数据对象
       postData.append('receiver', this.nowusername)
       postData.append('message', this.message)
        const { data: res } = await message(postData)
        if (res.status !== '200') {
           this.$message({
           message: res.message,
             type: 'error',
            showClose: true,
             duration: 3000
           })
        } else {
        this.$message({
           message: res.message,
             type: 'success',
            showClose: true,
             duration: 3000
           })
           this.Getsendingmessage()
        }
      },
       async modifym() {
        const postData = new URLSearchParams()// 创建一个 postform 数据对象
        postData.append('content', this.content)
        postData.append('messageid', this.currentmessageid)
         const { data: res } = await modifym(postData)
        if (res.status !== '200') {
           this.$message({
           message: res.message,
             type: 'error',
            showClose: true,
             duration: 3000
           })
        } else {
        this.$message({
           message: res.message,
             type: 'success',
            showClose: true,
             duration: 3000
           })
        this.Getsendingmessage()
        }
        console.log(res)
      },
       async deletem() {
       const postData = new URLSearchParams()// 创建一个 postform 数据对象
        postData.append('messageid', this.currentmessageid2)
         const { data: res } = await deletem(postData)
        if (res.status !== '200') {
           this.$message({
           message: res.message,
             type: 'error',
            showClose: true,
             duration: 3000
           })
        } else {
        this.$message({
           message: res.message,
             type: 'success',
            showClose: true,
             duration: 3000
           })
            this.Getsendingmessage()
        }
        console.log(res)
      }
}
}
</script>
<style>
.outer-container {
  height: 600px; /* 调整为您希望的容器高度 */
  overflow-y: auto;
}
.message-list {
  height: 280px; /* 调整为您希望的容器高度 */
  overflow-y: auto;
  background-color: #F5F5F5;
  opacity: 0.8;
}
#building4 {
  background: url("../../background-head.jpg");
  width: 100%;
  height: 100%; /* 将高度设置为80% */
  position: fixed;
  background-size: cover; /* 使用cover来缩放背景图片，保持图片比例，填满整个背景框 */
  background-position: center bottom; /* 将背景图片向下移动并保持在底部 */
}
.title {
color: white;
        }
</style>
