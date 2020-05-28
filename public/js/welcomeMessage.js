/**
 * Setting a welcome message.
 *
 */
function welcomeMessage () {
  // Clear localstorage welcome.
  if (window.localStorage.getItem('welcome')) {
    if (JSON.parse(window.localStorage.getItem('welcome')).id !== window.document.querySelector('#profileText').firstElementChild.innerText) {
      window.localStorage.removeItem('welcome')
    }
  }

  if (!JSON.parse(window.localStorage.getItem('welcome'))) {
    const name = window.document.querySelector('#profileText').firstElementChild.innerText
    const data = {}
    data.message = 'Hej ' + name + '! Välkommen till din profil på Växtverket. I Växtbiblioteket kan du hitta dina favoritväxter och sedan lägga till dem i din växtlista. Lycka till med dina växter!'
    data.seen = false
    data.id = window.document.querySelector('#profileText').firstElementChild.innerText
    window.localStorage.setItem('welcome', JSON.stringify(data))
  } else {
    const welcome = JSON.parse(window.localStorage.getItem('welcome'))
    welcome.seen = true
    window.localStorage.setItem('welcome', JSON.stringify(welcome))
  }

  runWelcomeMessage()
}

/**
 * Displays a welcome message if seen equals false.
 *
 */
function runWelcomeMessage () {
  const welcome = JSON.parse(window.localStorage.getItem('welcome'))

  if (welcome.seen === false) {
    const layer = window.document.createElement('div')
    layer.className = 'layer'

    const div = window.document.createElement('div')
    div.className = 'welcome'

    const img = window.document.createElement('img')
    img.src = '../images/icons/close.png'
    img.alt = 'Stäng den här rutan.'
    img.className = 'closeBox'

    const p = window.document.createElement('p')
    const pContent = document.createTextNode(welcome.message)

    const h1 = window.document.createElement('h1')
    const h1Content = document.createTextNode('Välkommen!')

    h1.appendChild(h1Content)
    p.appendChild(pContent)
    div.appendChild(img)
    div.appendChild(h1)
    div.appendChild(p)
    layer.appendChild(div)

    window.document.querySelector('body').insertBefore(layer, window.document.querySelector('main'))

    setListener()
  }
}

/**
 * Listener.
 *
 */
function setListener () {
  window.document.querySelector('.closeBox').addEventListener('click', function () {
    window.document.querySelector('.layer').style.display = 'none'
  })
}

export { welcomeMessage }
