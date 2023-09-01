const router = require('express').Router()
const Room = require('../models/room_Schema')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (neq, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const upload = multer({
  storage: storage
}).single('image')

router.post('/create', upload, async (req, res) => {
  const newProduct = new Room({
    nameroom: req.body.nameroom,
    namemovie: req.body.namemovie,
    time: req.body.time,
    image: req.file.filename
  })
  try {
    await newProduct.save()
    res.redirect('/managerroom')
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
