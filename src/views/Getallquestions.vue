<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div id="building">
<div>
 <div class="navigator">
 <h1 class="title">问答社区 | Ferdinand</h1>
  <el-form>
    <el-form-item class="btns">
    <el-button type="primary" @click="redirectTouser('user')">
    <i class="el-icon-user-solid"></i>用户
    </el-button>
    <el-button type="primary" @click="showQuestionDialog">发起问题</el-button>
      <el-button type="primary" @click="redirectToLogin('login')">登录</el-button>
      <el-button @click="redirectToLogin('register')">注册</el-button>
    </el-form-item>
  </el-form>
 </div>
<div class="outer-container">
  <div class="question-list">
    <div v-for="question in questions" :key="question.questionid" class="question-item">
      <!-- 在这里展示每个 question -->
      <div class="question-info">
        <p class="question-content">问题内容: {{ question.question }}</p>
        <p class="question-username">发布者: {{ question.username }}</p>
        <button @click="like(question.questionid)" class="like-button">点赞
        <i class="el-icon-star-off"></i><span>{{ likenumberMap[question.questionid] }}</span>
        </button>
        <button @click="showanswerdialog(question.questionid)" class="answer-button"> 评论
  <i class="el-icon-chat-dot-square"></i>
</button>
        <button @click="redirectTo('answer', { questionid: question.questionid })" class="details-button"> 查看评论
  <i class="el-icon-chat-dot-square"></i>
</button>
<button @click="chatgptanswer(question.question)" class="gpt-button"> 查看chatgpt的回答
  <i class="el-icon-cpu"></i>
</button>
      </div>
      <el-divider id="dj"></el-divider>
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
  <el-dialog
  title="来自chatgpt的回答"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
    <!-- 显示 this.gptcontent -->
    <span v-if="this.gptcontent !== ''">{{ this.gptcontent }}</span>
        <i v-else class="el-icon-loading"></i>
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>
</div>
</template>
<script>
import { getallquestions, question } from '@/api/question'
import { like, answer, likenumber, islike, unlike } from '@/api/answer'
import { user } from '@/api/user'
export default {
  data() {
    return {
      questions: [], // 存储从后端获取的数据
      question: '',
      questionDialogVisible: false,
      answerdialogvisible: false,
      dialogVisible: false,
      questionid: '',
      currentquestionid: '',
      answer: '',
      gptcontent: '',
      likenumberMap: {},
      islike: ''
    }
  },
  created() {
    this.getallquestions()
  },
  methods: {
   async getallquestions () {
        const { data: res } = await getallquestions()
        this.questions = res.questions.reverse()
        for (const question of this.questions) {
        const likenumber = await this.likenumber(question.questionid)
        this.$set(this.likenumberMap, question.questionid, likenumber)
      }
        console.log(res)
    },
    async redirectTo(name, msg) {
      this.$router.push({ name: name, params: msg })
    },
   async redirectToLogin(name) {
      this.$router.push(name)
    },
    async redirectTouser(name) {
   const { data: res } = await user()
        if (res.status != '200') {
           this.$message({
           message: res.message,
             type: 'error',
            showClose: true,
             duration: 3000
           })
        } else {
              this.$router.push(name)
        }
    },
    async pubquestion() {
    const postData = new URLSearchParams()// 创建一个 postform 数据对象
    postData.append('question', this.question)
    const { data: res } = await question(postData)
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
        this.getallquestions()
        }
        console.log(res)
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
          this.gptcontent = ''
            done()
          })
          .catch(_ => {})
      },
      async like(qid) {
       const postData = new URLSearchParams()// 创建一个 postform 数据对象
       postData.append('questionid', qid)
       const { data: res0 } = await islike(postData)
       console.log(res0.isLike)
       if (res0.isLike === false || res0.isLike === 'false') {
        const { data: res } = await like(postData)
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
         const likenumber = await this.likenumber(qid)
         this.$set(this.likenumberMap, qid, likenumber)
        }
        } else {
        const { data: res2 } = await unlike(postData)
        if (res2.status !== '200') {
           this.$message({
           message: res2.message,
             type: 'error',
            showClose: true,
             duration: 3000
           })
        } else {
        this.$message({
           message: res2.message,
             type: 'success',
            showClose: true,
             duration: 3000
           })
          const likenumber1 = await this.likenumber(qid)
         this.$set(this.likenumberMap, qid, likenumber1)
        }
        }
      },
      async Answer() {
       const postData = new URLSearchParams() // 创建一个 postform 数据对象
       postData.append('questionid', this.currentquestionid)
       postData.append('answer', this.answer)
       postData.append('pid', '0')
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
           this.redirectTo('answer', { questionid: this.currentquestionid })
        }
      },
       async likenumber(qid) {
       const postData = new URLSearchParams()
       postData.append('questionid', qid)
        const { data: res } = await likenumber(postData)
        console.log(res.likes)
        return res.likes
      },
      async chatgptanswer(question) {
        this.dialogVisible = true
         const url = 'https://api.aiproxy.io/v1/chat/completions'
           const token = 'Bearer sk-7YXV6hBPcbWhXS0z3vGTZk3t5PvRpQ1e7XipJHqWRO9ZwUbc'

          const requestData = {
           model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }]
          }
         const response = await fetch(url, {
          method: 'POST',
            headers: {
            Authorization: token,
         'Content-Type': 'application/json'
          },
        body: JSON.stringify(requestData)
         })
        const responseDATA = await response.json()
         this.gptcontent = responseDATA.choices[0].message.content
        console.log(this.gptcontent)
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
