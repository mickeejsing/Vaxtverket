import { toggle } from './toggle.js'
import { togglePlant } from './togglePlant.js'
import { addPlant } from './addPlant.js'
import { submitOnChange } from './submitOnChange.js'
import { welcomeMessage } from './welcomeMessage.js'
import { zoomForm } from './zoomForm.js'
import { lockTasks } from './lockTasks.js'

/**
 * Main function.
 *
 */
function main () {
  // Toggle main nav.
  toggle(window.document.querySelector('#hamburger'), window.document.querySelector('#items'))

  if (window.document.querySelectorAll('.myPlant')) {
    for (let i = 0; i < window.document.querySelectorAll('.myPlant').length; i++) {
      togglePlant(window.document.querySelectorAll('.imgDiv')[i], window.document.querySelectorAll('.togglePlant')[i])
    }
  }

  if (window.document.querySelector('#addCultivate')) {
    addPlant('#addCultivate', '#plantStepsCultivate')
    addPlant('#addReplant', '#plantStepsReplant')
    addPlant('#addPlantout', '#plantStepsPlantout')
    addPlant('#addHarvest', '#plantStepsHarvest')
  }

  if (window.document.querySelector('#change')) {
    submitOnChange('#change')
  }

  if (window.document.querySelector('#profileText')) {
    welcomeMessage()
  }

  if (window.document.querySelector('#postBtn')) {
    zoomForm('#postBtn')
  }

  if (window.document.querySelector('.myPlant')) {
    lockTasks()
  }
}

main()
