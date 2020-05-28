const Personal = require('../../models/personal')
const User = require('../../models/user')
const Plant = require('../../models/plant')
const Notification = require('../../models/notifications')
const socket = require('../../app.js')

/**
 * Check for date matches in DB. Update steps on match. Sends updated plant.
 *
 * @param {*} callback - Callback function.
 */
async function updateDB (callback) {
  console.log('Running updateDB')
  searchForDates()
}

/**
 * Searches for dates of today.
 *
 */
async function searchForDates () {
  console.log('Searches for todays date.')
  const today = new Date().toDateString()
  const result = await Personal.find()

  // If there are no personals, don't run code.
  if (result != null) {
    result.forEach(async personal => {
      const dates = personal.alerts
      const personID = personal.userID
      const updates = []

      dates.forEach(async date => {
        if (typeof date === 'string') {
          if (date.includes(today)) {
            const index = dates.indexOf(date)
            updates.push(index)

            const plant = await Plant.findOne({ _id: personal.plantID[index] })

            const not = new Notification({
              userID: personal.userID,
              plantID: personal.plantID[index],
              message: 'Din ' + plant.name + ' har en notifikation.',
              seen: null
            })

            socket.io.emit('notification', not)

            await not.save()
          }
        }
      })

      if (updates.length > 0) {
        const user = await User.findOne({ _id: personal.userID })
        const steps = user.steps
        const states = personal.states

        updates.forEach(update => {
          steps[update]++
          states[update] = 'active'
        })

        await User.updateOne({ _id: personID }, {
          steps: steps
        })

        await Personal.updateOne({ userID: personID }, {
          states: states
        })
      }
    })
  } // End of if.
}

// Exports
module.exports = updateDB
