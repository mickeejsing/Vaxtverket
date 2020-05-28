/**
 * Toggles the menu.
 *
 * @param {string} clicked - The clicked item.
 * @param {string} toggled - The item to be toggled.
 */
function toggle (clicked, toggled) {
  clicked.addEventListener('click', function () {
    if (toggled.className === 'hidden') {
      toggled.className = 'visible'
    } else {
      toggled.className = 'hidden'
    }
  })
}

export { toggle }
