const mongoose = require('mongoose')

const room_Schema = new mongoose.Schema({

  nameroom: {
              type: String,
              required: true
  },
  image: {
               type: String,
              required: true
},
namemovie: {
              type: String,
              required: true
  },
  time: {
              type: String,
              required: true
  }
})

module.exports = mongoose.model('room_Schema', room_Schema)