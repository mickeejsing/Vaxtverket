/**
 * Locks tasks.
 *
 */
function lockTasks () {
  const inactives = Array.from(document.querySelectorAll('.inactive'))

  for (let i = 0; i < inactives.length; i++) {
    document.querySelectorAll('.inactive')[i].children[1].style.display = 'none'
    document.querySelectorAll('.inactive')[i].querySelector('.imgDiv').style.display = 'none'
    document.querySelectorAll('.inactive')[i].querySelector('.latin').innerText = 'Väntar på nästa steg...'
  }
}

// Exports
export { lockTasks }
