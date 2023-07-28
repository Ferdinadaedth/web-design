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
  export function islike (data) {
    return request({
      method: 'post',
      url: '/islike',
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
  export function getanswer (data) {
    return request({
      method: 'post',
      url: '/getanswer',
      data
    })
  }
  export function answeradmin() {
    return request({
        method: 'post',
        url: '/gptanswer'
      })
  }
  export function unlike(data) {
    return request({
        method: 'post',
        url: '/unlike',
        data
      })
  }
