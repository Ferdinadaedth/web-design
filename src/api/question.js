import request from '../utils/request'
export function getallquestions () {
  return request({
    method: 'post',
    url: '/getallquestions'
  })
}
export function question (data) {
  return request({
    method: 'post',
    url: '/question',
    data
  })
}
