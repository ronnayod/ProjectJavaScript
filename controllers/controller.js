const User = require('../models/subscriber')
const Room = require('../models/room_Schema')

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id

    User.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: 'Erro retrieving user with id ' + id })
      })
  } else {
    User.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'Error Occurred while retriving user information' })
      })
  }
}

exports.findRoom = (req, res) => {
  if (req.query.id) {
    const id = req.query.id

    Room.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: 'Erro retrieving user with id ' + id })
        console.log(err);
      })
  } else {
    Room.find()
      .then(room => {
        res.send(room)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'Error Occurred while retriving user information' })
        console.log(err);
      })
  }
}