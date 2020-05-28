/**
 * Adds plant.
 *
 * @param {string} element - The element to be clicked.
 * @param {string} update - The element to be updated.
 */
function addPlant (element, update) {
  const ref = window.document.querySelector(update)

  window.document.querySelector(element).addEventListener('click', (event) => {
    event.preventDefault()

    const cloned = ref.lastElementChild.cloneNode()

    const space = cloned.placeholder.indexOf(' ')
    const number = cloned.placeholder[space + 1]

    cloned.placeholder = 'Steg ' + (Number(number) + 1)

    ref.appendChild(cloned)
  })
}

export { addPlant }
