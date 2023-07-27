import request from '../utils/request'
export function answer (data) {
    return request({
      method: 'post',
      url: '/answer',
      data
    })
}
export function like (data) {
    return request({
      method: 'post',
      url: '/like',
      data
    })
  }
  export function likenumber (data) {
    return request({
      method: 'post',
      url: '/likenumber',
      data
    })
  }
  export function getanswer () {
    return request({
      method: 'post',
      url: '/getanswer'
    })
  }
  export function answeradmin() {
    return request({
        method: 'post',
        url: '/gptanswer'
      })
  }
