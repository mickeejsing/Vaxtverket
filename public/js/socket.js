'use strict'
const socket = window.io()

socket.on('notification', function (data) {
  const profileID = window.document.querySelector('#bar').firstElementChild.getAttribute('id')
  var audio = new window.Audio('../audio/notification.mp3')

  if (data.userID === profileID) {
    audio.play()
  }
})

socket.on('post', function (data) {
  var audio = new window.Audio('../audio/notification.mp3')

  const role = window.document.querySelector('#bar').children[1].getAttribute('id')

  if (role === 'admin') {
    audio.play()
    document.title = data.author + ' hur publicerat ett inlägg.'
  }
})

socket.on('comment', function (data) {
  const profileID = window.document.querySelector('#bar').firstElementChild.getAttribute('id')
  var audio = new window.Audio('../audio/notification.mp3')

  if (data.authorID === profileID) {
    audio.play()
    document.title = data.author + ' har kommenterat ditt inlägg.'
  }
})
