# 问答社区

## 前端

### 技术栈

vue2 + Element UI

### 页面功能

#### 1.主页面:

主页面展示所有问题

* 问题溢出:采用的是滚动
* 问题搜索功能:通过filter函数实现
* 问题操作:对于每个问题，同时可以进行点赞，评论，私信，查看评论，以及查看chatgpt回答
* chatgpt:通过带着api-keys发起请求得以得到答复
* 跳转:主页面可以跳转到查看评论页面，登录，注册和用户个人信息页面

#### 2.查看评论页面:

查看评论页面展示该问题所有评论

* 问题id保存:以动态路由的方式保存以防止刷新丢失数据
* 该页面可以进行回复评论,
* 评论溢出同样是用的滚动

#### 3.用户页面:

展示用户信息

* 展示用户个人问题和回答
* 编辑或删除用户个人问题或回答

* 跳转:跳转到我的私信界面

#### 4.私信界面:

展示用户私信相关信息

* 展示用户已发送的私信和其他用户发过来的私信

* 编辑或删除用户已发送的私信

#### 5.用户登录注册界面:

进行注册登录
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
