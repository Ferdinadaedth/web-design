<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div id="building">
<div>
 <div class="navigator">
 <h1 class="title">问答社区 | Ferdinand</h1>
 </div>
<div class="outer-container">
  <div class="question-list">
    <div v-for="answer in answers.res" :key="answer.answerid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-content">评论内容: {{ answer.answer }}</p>
        <p class="question-username">发布者: {{ answer.username }}</p>
        <button @click="showanswerdialog(question.questionid)" class="answer-button"> 评论
  <i class="el-icon-chat-dot-square"></i>
</button>
      </div>
      <el-divider id="dj"></el-divider>
    </div>
  </div>
</div>
</div>
  <el-dialog
    title="评论"
    :visible.sync="answerdialogvisible"
    width="30%"
    :before-close="handleClose"
  id ="ans">
    <el-input v-model="answer" placeholder="请输入评论"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="answerdialogvisible = false">取消</el-button>
      <el-button type="primary" @click="Answer">确认</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { getanswer } from '@/api/answer'
export default {
  data() {
    return {
      answers: [], // 存储从后端获取的数据
      answer: '',
      questionDialogVisible: false,
      answerdialogvisible: false,
      questionid: '',
      currentquestionid: ''
    }
  },
  created() {
    this.Getanswer()
  },
  methods: {
   async redirectToLogin(name) {
      this.$router.push(name)
    },
    showQuestionDialog() {
      this.questionDialogVisible = true
    },
    showanswerdialog(n) {
    this.answerdialogvisible = true
    this.currentquestionid = n
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      async Getanswer() {
        const { data: res } = await getanswer()
        this.answers = res
        console.log(res)
      }
}
}
</script>
#building {
  background: url("../../background-head.jpg");
  width: 100%;
  height: 100%; /* 将高度设置为80% */
  position: fixed;
  background-size: cover; /* 使用cover来缩放背景图片，保持图片比例，填满整个背景框 */
  background-position: center bottom; /* 将背景图片向下移动并保持在底部 */
}
.question-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5F5F5;
  opacity: 0.7;
}
