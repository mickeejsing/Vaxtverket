/**
 * Toggles the plant.
 * Icons by <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>.
 *
 * @param {string} clicked - The clicked item.
 * @param {string} toggled - The item to be toggled.
 */
function togglePlant (clicked, toggled) {
  clicked.addEventListener('click', function () {
    if (toggled.className === 'hidden') {
      toggled.className = 'visible'
      clicked.style.backgroundImage = "url('/images/icons/down.png')"
    } else {
      toggled.className = 'hidden'
      clicked.style.backgroundImage = "url('/images/icons/up.png')"
    }
  })
}

export { togglePlant }
