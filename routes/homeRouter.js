const express = require('express')
const router = express.Router()
const controller = require('../controllers/homeController')
const auth = require('../middleware/auth.js')
const authAdmin = require('../middleware/authAdmin.js')
const multer = require('multer')

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },

  filename: (require, file, cb) => {
    cb(null, 'image_' + file.originalname)
  }

})

const restrictions = function (req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
    console.log('Sparar bild')
  } else {
    cb(null, false)
    throw new Error('Felaktig bildtyp')
  }
}

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 3 }, fileFilter: restrictions })

// GET
router.get('/', controller.index)
router.get('/about', controller.about)
router.get('/profile', auth, controller.profile)

router.get('/library', auth, controller.library)
router.post('/library', auth, controller.libraryPost)

router.get('/plant', auth, controller.plant)
router.post('/plant', auth, controller.plantPost)

router.get('/plants', auth, controller.plants)
router.post('/plants', auth, controller.plantsPost)

router.get('/settings', auth, controller.settings)
router.post('/settings', auth, upload.single('file'), controller.settingsPost)

router.get('/publish', authAdmin, controller.publish)
router.post('/publish', authAdmin, controller.publishPost)

router.get('/logout', controller.logout)

module.exports = router
