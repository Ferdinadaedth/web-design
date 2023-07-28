import request from '../utils/request'
export function login (data) {
  return request({
    method: 'post',
    url: '/login',
    data
  })
}
export function register (data) {
  return request({
    method: 'post',
    url: '/register',
    data
  })
}
  export function user () {
    return request({
      method: 'post',
      url: '/user/get'
    })
  }
  export function modifya (data) {
    return request({
      method: 'post',
      url: '/modifya',
      data
    })
  }
  export function deletea (data) {
    return request({
      method: 'post',
      url: '/deletea',
      data
    })
  }
  export function modifyq (data) {
    return request({
      method: 'post',
      url: '/modifyq',
      data
    })
  }
  export function deleteq (data) {
    return request({
      method: 'post',
      url: '/deleteq',
      data
    })
  }
