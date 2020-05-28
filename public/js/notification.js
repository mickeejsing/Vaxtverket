/**
 * For notifications.
 *
 */
function notification () {
  if (window.localStorage.data) {
    const data = JSON.parse(window.localStorage.getItem('data'))
    const profileID = window.document.querySelector('#bar').firstElementChild.getAttribute('id')

    if (data.userID === profileID) {
      window.document.querySelector('#notification').src = '/images/icons/mylistNotification.png'
    }
  }
}

export { notification }
