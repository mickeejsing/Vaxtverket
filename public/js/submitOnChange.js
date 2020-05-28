/**
 * Submit on change.
 *
 * @param {string} element - The element to be clicked.
 */
function submitOnChange (element) {
  window.document.querySelector(element).addEventListener('change', function (event) {
    this.submit()
  })
}

export { submitOnChange }
