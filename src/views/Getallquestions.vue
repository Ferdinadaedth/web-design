<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div>
 <div class="navigator">
  <el-form>
    <el-form-item class="btns">
      <el-button type="primary" @click="redirectToLogin('login')">登录</el-button>
      <el-button @click="redirectToLogin('register')">注册</el-button>
    </el-form-item>
  </el-form>
 </div>
  <div class="question-list">
    <div v-for="question in questions.questions" :key="question.questionid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-username">发布者: {{ question.username }}</p>
        <p class="question-content">问题内容: {{ question.question }}</p>
      </div>
      <el-divider id='dj'></el-divider>
    </div>
  </div>
</div>
</template>
<script>
import { getallquestions, question } from '@/api/question'
export default {
  data() {
    return {
      questions: [], // 存储从后端获取的数据
      question: ''
    }
  },
  created() {
    this.getallquestions()
  },
  methods: {
   async getallquestions () {
        console.log('111')
        const { data: res } = await getallquestions()
        this.questions = res
        console.log(res)
    },
   async redirectToLogin(name) {
      this.$router.push(name)
    },
   async pubquestion() {
const { data: res } = await question(this.question)
        if (status !== '200') {
           this.$message({
           message: res.message,
             type: 'success',
            showClose: true,
             duration: 3000
           })
        } else {
        this.$message({
           message: res.message,
             type: 'error',
            showClose: true,
             duration: 3000
           })
        }
        console.log(res)
   }
  }
}
</script>
<style>
/* Add a new CSS class for the container to center align and increase font size */
.question-info {
  text-align: center;
  font-size: 18px; /* Adjust the font size as needed */
}

/* Optional: If you want to center the entire question list */
.question-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5F5F5;
}
#dj{
width:100vw
}
.navigator{
background-color: #2F4F4F;
width: 100vw
}
.btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 10%;
}

</style>
