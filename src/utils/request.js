import axios from 'axios'
const request = axios.create({
  // baseURL: 'http://127.0.0.1:8088',
   baseURL: '/api',
  //   baseURL: 'http://ten.ferdinandaedth.top:100',
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data
  }]

})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = sessionStorage.getItem('token')
  config.headers.Authorization = `Bearer ${config.headers.Authorization}`
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const data = response.data
  const responseData = JSON.parse(data)
  return {
    data: responseData
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
