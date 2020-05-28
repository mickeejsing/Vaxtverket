const template = document.createElement('template').innerHTML = `
<form action="" method="post" class="form">
<input type="text" name="title" placeholder="Skriv din titel" required>
<textarea name="message" placeholder="Skriv ditt meddelande här" required></textarea>
<input type="submit" value="Posta inlägg">
</form>
`

/**
 * Zooms form.
 *
 * @param {string} element - The element to be clicked.
 *
 */
function zoomForm (element) {
  window.document.querySelector(element).addEventListener('click', function ref (event) {
    this.innerHTML = template
    this.removeEventListener('click', ref)
    this.id = 'postForm'
    this.firstElementChild.className = 'formCategory'
  })
}

export { zoomForm }
