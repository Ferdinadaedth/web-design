import request from '../utils/request'
export function getallquestions () {
  return request({
    method: 'post',
    url: '/getallquestions'
  })
}
export function question () {
  return request({
    method: 'post',
    url: '/question'
  })
}
