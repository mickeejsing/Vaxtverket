'use strict'

const Plant = require('../models/plant')
const Notification = require('../models/notifications')
const Personal = require('../models/personal')
const User = require('../models/user')
const datesFromNow = require('../public/js/datesFromNow')
const bcrypt = require('bcrypt')

const homeController = {}

homeController.index = async (req, res) => {
  res.render('pages/index')
}

homeController.about = (req, res) => {
  res.render('pages/about')
}

homeController.profile = async (req, res) => {
  if (req.session.data) {
    const id = req.session.data.id

    try {
      const nots = await (await Notification.find({ userID: id })).length

      if (nots === 0) {
        res.render('pages/profile')
      } else {
        res.render('pages/profile', { nots })
      }
    } catch (error) {
      console.error(error)
    }
  }
}

homeController.library = (req, res) => {
  res.render('pages/library')
}

/**
 * Displays the libraryPost page (POST).
 *
 * @param {object} req - Request object.
 * @param {object} res - Response objekt.
 * @param {Function} next - Middleware.
 */
homeController.libraryPost = async (req, res, next) => {
  const setMonth = req.body.categories

  try {
    const data = {
      plants: (await Plant.find({ $and: [{ setFrom: { $lte: setMonth } }, { setTo: { $gte: setMonth } }] }))
        .map(plant => ({
          id: plant._id,
          name: plant.name,
          latin: plant.latin
        })).sort((a, b) => {
          if (a.name < b.name) {
            return -1
          } if (a.name > b.name) {
            return 1
          }
        })
    }

    res.render('pages/library', { data })
  } catch (error) {
    console.error(error)
    res.redirect('back')
  }
}

/**
 * Displays one plant based on id.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response objekt.
 *
 */
homeController.plant = async (req, res) => {
  try {
    const data = (await Plant.findOne({ _id: req.query.id })).toObject()

    res.render('pages/plant', { data })
  } catch (error) {
    console.error(error)
  }
}

/**
 * Add selected plant to personal.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response objekt.
 */
homeController.plantPost = async (req, res) => {
  try {
    // Finds personal.
    const search = await Personal.findOne({ userID: req.session.data.id })

    // Creates new personal if none.
    if (search === null) {
      const personal = new Personal({
        userID: req.session.data.id,
        plantID: req.body.plantID,
        alerts: 0,
        states: 'active'
      })

      await personal.save()

      req.session.flash = {
        type: 'success',
        message: `${req.body.name} har lagts till.`
      }

      await User.updateOne({ _id: req.session.data.id }, {
        $push: { steps: 0 }
      })

      res.redirect('/plants')
    // If there already exists a personal.
    } else {
      const existingPlant = await Personal.findOne({ userID: req.session.data.id, plantID: req.body.plantID })
      if (!existingPlant) {
        await Personal.updateOne({ userID: req.session.data.id }, {
          $push: { plantID: req.body.plantID, alerts: 0, states: 'active' }
        })

        req.session.flash = {
          type: 'success',
          message: `${req.body.name} har lagts till.`
        }

        await User.updateOne({ _id: req.session.data.id }, {
          $push: { steps: 0 }
        })

        res.redirect('/plants')
      } else {
        req.session.flash = {
          type: 'fail',
          message: `${req.body.name} finns redan i din växtsamling.`
        }
        res.redirect('/plants')
      }
    }
  } catch (error) {
    req.session.flash = {
      type: 'fail',
      message: `${req.body.name} kunde inte läggas till.`
    }

    console.error(error)

    res.redirect('/plants')
  }
}

homeController.plants = async (req, res) => {
  try {
    await Notification.deleteMany({ userID: req.session.data.id })
    const data = (await Personal.findOne({ userID: req.session.data.id }))

    // If there are any plants.
    if (data !== null) {
      const user = (await User.findOne({ _id: req.session.data.id }))
      const steps = user.steps

      const plantsID = Array.from(data.plantID)
      var plants = {}
      var states = data.states

      for (let i = 0; i < plantsID.length; i++) {
        const plant = await (await Plant.findOne({ _id: plantsID[i] })).toObject()
        const plantSteps = plant.steps

        if (typeof plantSteps[steps[i]] === 'string') {
          const arr = []
          arr.push(plantSteps[steps[i]])

          plant.steps = arr

          plants['plant' + i] = plant
        } else {
          plant.steps = plantSteps[steps[i]]
        }

        plant.state = states[i]
        plants['plant' + i] = plant
      }

      res.render('pages/plants', { plants })
    } else {
      res.render('pages/plants')
    }
  } catch (error) {
    console.error(error)
  }
}

homeController.plantsPost = async (req, res) => {
  try {
    const plantID = req.body.id
    const personalID = req.session.data.id

    let days = await (await Plant.findOne({ _id: plantID })).toObject()
    days = days.alert
    const dates = datesFromNow(days)

    const personal = (await Personal.findOne({ userID: personalID })).toObject()
    var indicator = 1

    for (let i = 0; i < personal.plantID.length; i++) {
      if (plantID === personal.plantID[i]) {
        if (personal.alerts[i] === 0) {
          indicator = 0
          personal.alerts[i] = dates.toString()
        } else {
          const nrAlerts = personal.alerts[i].split(',').length
          const user = (await User.findOne({ _id: req.session.data.id })).toObject()
          var end = false

          if (nrAlerts === user.steps[i] + 1) {
            end = true

            console.log('Steg: ' + user.steps[i])
            console.log('Av steg: ' + nrAlerts)

            console.log('LIKA')
            console.log(personal.alerts.splice(i, i + 1))

            personal.alerts.splice(i, i)

            personal.states.splice(i, i + 1)

            user.steps.splice(i, i + 1)

            personal.plantID.splice(i, i + 1)

            console.log('Alerts: ' + personal.alerts)
            console.log('States: ' + personal.states)
            console.log('Steps: ' + user.steps)
            console.log('PlantID: ' + personal.plantID)

            await Personal.updateOne({ userID: personalID }, {
              alerts: personal.alerts
            })

            await Personal.updateOne({ userID: personalID }, {
              states: personal.states
            })

            await Personal.updateOne({ userID: personalID }, {
              plantID: personal.plantID
            })

            await User.updateOne({ _id: personalID }, {
              steps: user.steps
            })
          }
        }

        if (end === false) {
          personal.states[i] = 'inactive'
        }
      }
    }

    if (indicator === 0) {
      await Personal.updateOne({ userID: personalID }, {
        alerts: personal.alerts
      })
    }

    await Personal.updateOne({ userID: personalID }, {
      states: personal.states
    })

    res.redirect('back')
  } catch (error) {
    console.error(error)
  }
}

homeController.settings = (req, res) => {
  res.render('pages/settings')
}

homeController.settingsPost = async (req, res, next) => {
  try {
    if (req.file) {
      await User.updateOne({ _id: req.session.data.id }, {
        imageSrc: req.file.path
      })

      req.session.data.image = req.file.path

      req.session.flash = {
        type: 'success',
        message: 'Din profilbild har ändrats.'
      }
    }

    if (req.body.oldPassword.length !== 0 && req.body.newPassword.length !== 0) {
      const user = (await User.findOne({ _id: req.session.data.id })).toObject()

      if (await bcrypt.compare(req.body.oldPassword, user.password) === true) {
        await User.updateOne({ _id: req.session.data.id }, {
          password: await bcrypt.hash(req.body.newPassword, 8)
        })

        req.session.flash = {
          type: 'success',
          message: 'Ditt lösenord har uppdaterats.'
        }
      } else {
        req.session.flash = {
          type: 'fail',
          message: 'Du angav ett falaktigt lösenord.'
        }
      }
    }

    res.redirect('/settings')
  } catch (error) {
    console.error(error)
    res.redirect('back')
  }
}

homeController.publish = (req, res) => {
  res.render('pages/publish')
}

/**
 * Displays the publishPost page (POST).
 *
 * @param {object} req - Request object.
 * @param {object} res - Response objekt.
 * @param {Function} next - Middleware.
 */
homeController.publishPost = async (req, res, next) => {
  try {
    const plant = new Plant({
      name: req.body.name,
      latin: req.body.latin,
      general: req.body.general,
      seasons: req.body.season,
      alert: req.body.alerts,
      steps: [req.body.stepCultivate, req.body.stepReplant, req.body.stepPlantout],
      harvest: req.body.stepHarvest,
      water: req.body.water
    })

    await plant.save()

    req.session.flash = {
      type: 'success',
      message: `${plant.name} har skapats.`
    }

    res.redirect('/publish')
  } catch (error) {
    req.session.flash = {
      type: 'fail',
      message: 'Något gick fel vid registrering av inlägg.'
    }

    console.error(error)

    res.redirect('/publish')
  }
}

homeController.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

// Exports
module.exports = homeController
