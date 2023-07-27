<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div id="building">
<div>
 <div class="navigator">
 <h1 class="title">问答社区 | Ferdinand</h1>
  <el-form>
    <el-form-item class="btns">
    <el-button type="primary" @click="showQuestionDialog">发起问题</el-button>
      <el-button type="primary" @click="redirectToLogin('login')">登录</el-button>
      <el-button @click="redirectToLogin('register')">注册</el-button>
    </el-form-item>
  </el-form>
 </div>
 <div class="outer-container">
  <div class="question-list">
    <div v-for="question in questions.questions" :key="question.questionid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
              <p class="question-content">问题内容: {{ question.question }}</p>
        <p class="question-username">发布者: {{ question.username }}</p>
      </div>
      <el-divider id='dj'></el-divider>
      </div>
  </div>
  </div>
</div>
  <el-dialog
    title="提出问题"
    :visible.sync="questionDialogVisible"
    width="30%"
    :before-close="handleClose"
  id ="ques">
    <el-input v-model="question" placeholder="请输入问题"></el-input>

    <span slot="footer" class="dialog-footer">
      <el-button @click="questionDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="pubquestion">确认</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { getallquestions, question } from '@/api/question'
export default {
  data() {
    return {
      questions: [], // 存储从后端获取的数据
      question: '',
      questionDialogVisible: false
    }
  },
  created() {
    this.getallquestions()
  },
  methods: {
   async getallquestions () {
        const { data: res } = await getallquestions()
        this.questions = res
        console.log(res)
    },
   async redirectToLogin(name) {
      this.$router.push(name)
    },
   async pubquestion() {
    const postData = new URLSearchParams()// 创建一个 postform 数据对象
  postData.append('question', this.question)
     const { data: res } = await question(postData)
        if (status !== '200') {
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
           this.questionDialogVisible = false
        }
        console.log(res)
    },
    showQuestionDialog() {
      this.questionDialogVisible = true
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
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
  opacity: 0.7;
}
#dj{
width:100vw
}
.navigator{
width: 100vw;
opacity: 0.9;
}
.btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 10%;
  height: 60px;
}
.title {
  font-size: 30px; /* 可根据需要调整标题的字体大小 */
  color: #E6E6FA; /* 设置标题颜色为蓝色，您可以根据需要更改颜色值 */
  margin-bottom: 20px; /* 可根据需要调整标题与按钮之间的间距 */
}
#building {
  background: url("../../background-spiderman.png");
  width: 100%;
  height: 100%; /* 将高度设置为80% */
  position: fixed;
  background-size: cover; /* 使用cover来缩放背景图片，保持图片比例，填满整个背景框 */
  background-position: center bottom; /* 将背景图片向下移动并保持在底部 */
}
#ques{
z-index: 999;
}
.outer-container {
  height: 600px; /* 调整为您希望的容器高度 */
  overflow-y: auto;
}
</style>
