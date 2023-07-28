<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div id="building3">
<div id="page-header">
<el-page-header @back="redirectToLogin('/')" content="用户">
</el-page-header>
</div>
<div id="usermessage">
    <el-descriptions title="用户信息" id = "usertitle">
    <el-descriptions-item label="用户名">{{ this.username }}</el-descriptions-item>
</el-descriptions>
</div>
<h1 class="list-title">我的评论</h1>
<el-divider id="dj"></el-divider>
  <div class="question-list1">
  <div v-if="notnull1">
    <div v-for="answer in answers" :key="answer.answerid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-content">评论内容: {{ answer.answer }}</p>
        <p class="question-username">发布者: {{ answer.username }}</p>
        <button @click="showanswerDialog(answer.answerid)">
        <i class="el-icon-edit"></i>编辑
        </button>
        <button @click="showalertDialog(answer.answerid)">
        <i class="el-icon-delete"></i>删除
        </button>
      </div>
      <el-divider id="dj"></el-divider>
    </div>
    </div>
  <div v-else>
    <el-empty description="空空如也"></el-empty>
   </div>
</div>
<h1 class="list-title">我的问题</h1>
<el-divider id="dj"></el-divider>
<div class="question-list2">
<div v-if="notnull2">
    <div v-for="question in questions" :key="question.questionid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-content">问题内容: {{ question.question }}</p>
        <p class="question-username">发布者: {{ question.username }}</p>
        <button @click="showquestionDialog(question.questionid)">
        <i class="el-icon-edit"></i>编辑
        </button>
        <button @click="showalertDialog2(question.questionid)">
        <i class="el-icon-delete"></i>删除
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
    title="修改问题"
    :visible.sync="questionDialogVisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <el-input v-model="question" placeholder="请输入问题"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="questionDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="modifyq">确认</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="警告"
    :visible.sync="alertdialogvisible2"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <span>确认要删除?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="alertdialogvisible2 = false">取消</el-button>
      <el-button type="primary" @click="deleteq">确认</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="修改评论"
    :visible.sync="answerdialogvisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <el-input v-model="answer" placeholder="请输入评论"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="answerdialogvisible = false">取消</el-button>
      <el-button type="primary" @click="modifya">确认</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="警告"
    :visible.sync="alertdialogvisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <span>确认要删除?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="alertdialogvisible = false">取消</el-button>
      <el-button type="primary" @click="deletea">确认</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { useranswer } from '@/api/answer'
import { userquestion } from '@/api/question'
import { user, modifya, deletea, modifyq, deleteq } from '@/api/user'
export default {
  data() {
    return {
      answers: [], // 存储从后端获取的数据
      questions: [],
      answer: '',
      question: '',
      questionDialogVisible: false,
      answerdialogvisible: false,
      questionid: '',
      currentquestionid: '',
      username: '',
      currentanswerid: '',
      alertdialogvisible: false,
      alertdialogvisible2: false,
      notnull1: true,
      notnull2: true
    }
  },
  created() {
    this.getusername()
    this.Getuserquestion()
    this.Getuseranswer()
  },
  methods: {
   goBack() {
        console.log('go back')
      },
   async redirectToLogin(name) {
      this.$router.push(name)
    },
    showquestionDialog(id) {
      this.questionDialogVisible = true
      this.currentquestionid = id
    },
    showanswerDialog(id) {
      this.answerdialogvisible = true
      this.currentanswerid = id
    },
    showalertDialog2(id) {
     this.alertdialogvisible2 = true
     this.currentquestionid = id
     },
     showalertDialog(id) {
     this.alertdialogvisible = true
     this.currentanswerid = id
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
      async Getuseranswer() {
        const { data: res } = await useranswer()
        if (res.res == null || res.res == 'null') {
           this.notnull1 = false
        } else {
        this.answers = res.res.reverse()
        console.log(this.answer)
        console.log(res)
        }
      },
      async Getuserquestion() {
      const { data: res } = await userquestion()
      if (res.res == null || res.res == 'null') {
           this.notnull2 = false
        } else {
        this.answers = res.res.reverse()
        console.log(this.answer)
        console.log(res)
        }
      },
      async modifya() {
        const postData = new URLSearchParams()// 创建一个 postform 数据对象
        postData.append('answer', this.answer)
        postData.append('answerid', this.currentanswerid)
         const { data: res } = await modifya(postData)
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
        this.Getuseranswer()
        }
        console.log(res)
      },
      async deletea() {
       const postData = new URLSearchParams()// 创建一个 postform 数据对象
        postData.append('answerid', this.currentanswerid)
         const { data: res } = await deletea(postData)
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
            this.Getuseranswer()
        }
        console.log(res)
      },
      async deleteq() {
      const postData = new URLSearchParams()// 创建一个 postform 数据对象
        postData.append('questionid', this.currentquestionid)
         const { data: res } = await deleteq(postData)
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
            this.Getuserquestion()
        }
        console.log(res)
      },
      async modifyq() {
        const postData = new URLSearchParams()// 创建一个 postform 数据对象
        postData.append('question', this.question)
        postData.append('questionid', this.currentquestionid)
         const { data: res } = await modifyq(postData)
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
        this.Getuserquestion()
        }
        console.log(res)
      }
}
}
</script>
<style>
#usermessage{
   background-color: #FFF0F5;
   display: flex;
justify-content: centor;
   margin:0 auto;
   opacity: 0.8;
}
.question-list1{
  height: 250px; /* 调整为您希望的容器高度 */
  overflow-y: auto;
  background-color: #F5F5F5;
  opacity: 0.8;
}
.question-list2{
  height: 250px; /* 调整为您希望的容器高度 */
  overflow-y: auto;
  background-color: #F5F5F5;
  opacity: 0.8;
}
#building3 {
  background: url("../../background-uni.png");
  width: 100%;
  height: 100%; /* 将高度设置为80% */
  position: fixed;
  background-size: cover; /* 使用cover来缩放背景图片，保持图片比例，填满整个背景框 */
  background-position: center bottom; /* 将背景图片向下移动并保持在底部 */
}
</style>
