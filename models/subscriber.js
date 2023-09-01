const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
   type: String,
   required: true
},
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)