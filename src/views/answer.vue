<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div id="building2">
<div id="back">
<el-page-header @back="redirectToLogin('/')" content="评论内容" class="custom-page-header">
</el-page-header>
</div>
<div>
 <div class="navigator">
 <h1 class="title">问答社区 | Ferdinand</h1>
 </div>
<div class="outer-container1">
  <div class="question-list3">
  <div v-if="notnull">
    <div v-for="answer in answers" :key="answer.answerid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-content">评论内容: {{ answer.answer }}</p>
        <p class="question-username">
          {{ answer.pid == '0' ? '发布者: ' + answer.username : '发布者:' + answer.username + '回复 ' + answermap[answer.pid] }}
        </p>
        <button @click="showanswerdialog(answer.answerid)" class="answer-button">评论
        <i class="el-icon-chat-dot-square"></i>
        </button>
      </div>
      <el-divider id="dj"></el-divider>
    </div>
    </div>
    <div v-else>
    <el-empty description="空空如也"></el-empty>
   </div>
  </div>
</div>
</div>
<el-dialog
    title="回复评论"
    :visible.sync="answerdialogvisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <el-input v-model="answer" placeholder="请输入评论"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="answerdialogvisible = false">取消</el-button>
      <el-button type="primary" @click="Answer">确认</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { getanswer, answer } from '@/api/answer'
export default {
  data() {
    return {
      answers: [], // 存储从后端获取的数据
      answer: '',
      questionDialogVisible: false,
      answerdialogvisible: false,
      questionid: '',
      currentanswerid: '',
      nowquestionid: '',
      notnull: true,
      answermap: {}
    }
  },
  created() {
    this.Getanswer()
  },
  methods: {
   goBack() {
        console.log('go back')
      },
   async redirectToLogin(name) {
      this.$router.push(name)
    },
    showQuestionDialog() {
      this.questionDialogVisible = true
    },
    showanswerdialog(n) {
    this.answerdialogvisible = true
    this.currentanswerid = n
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      async Getanswer() {
       const questionId = this.$route.params.questionid
       this.nowquestionid = questionId
       console.log(questionId)
       const postData = new URLSearchParams()
       postData.append('questionid', questionId)
        const { data: res } = await getanswer(postData)
        if (res.res == null || res.res == 'null') {
           this.notnull = false
        } else {
        this.answers = res.res.reverse()
        for (const answer of this.answers) {
        this.$set(this.answermap, answer.answerid, answer.username)
        }
        console.log(res)
        }
       },
      async Answer() {
       const postData = new URLSearchParams() // 创建一个 postform 数据对象
       postData.append('questionid', this.nowquestionid)
       postData.append('answer', this.answer)
       postData.append('pid', this.currentanswerid)
        const { data: res } = await answer(postData)
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
           this.Getanswer()
        }
      }
}
}
</script>
<style>
#building2 {
  background: url("../../background-head.jpg");
  width: 100%;
  height: 100%; /* 将高度设置为80% */
  position: fixed;
  background-size: cover; /* 使用cover来缩放背景图片,保持图片比例,填满整个背景框 */
  background-position: center bottom; /* 将背景图片向下移动并保持在底部 */
}
.question-list3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5F5F5;
  opacity: 0.7;
}
.back {
  color: white;
}
.outer-container1{
  height: 600px; /* 调整为您希望的容器高度 */
  overflow-y: auto;
}
</style>
