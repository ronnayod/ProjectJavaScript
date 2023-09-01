const axios = require('axios')
const User = require('../models/subscriber')
const Room = require('../models/room_Schema')
exports.homeRoutes = (req, res) => {
              // Make a get request to /api/users
              axios.get('http://localhost:5000/api/users')
                .then(function (response) {
                res.render('admin.ejs', { users: response.data })
                })
                .catch(err => {
                  res.send(err)
                  console.log(err);
                })
}

exports.homeMovie = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:5000/api/room')
    .then(function (response) {
    res.render('index2.ejs', { movie: response.data })
    })
    .catch(err => {
      res.send(err)
      console.log(err);
    })
}

exports.homeRoom = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:5000/api/room')
    .then(function (response) {
    res.render('managerroom.ejs', { room: response.data })
    })
    .catch(err => {
      res.send(err)
      console.log(err);
    })
}

exports.member_update = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:5000/api/users', { params: { id: req.query.id } })
    .then(function (response) {
    res.render('member_update.ejs', { users: response.data })
    })
    .catch(err => {
      res.send(err)
      console.log(err);
    })
}

exports.movie_update = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:5000/api/room', { params: { id: req.query.id } })
    .then(function (response) {
    res.render('movie_update.ejs', { movie: response.data })
    })
    .catch(err => {
      res.send(err)
      console.log(err);
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
      } else {
        res.redirect('back')
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id
      })
    })
}

exports.deleteMovie = (req, res) => {
  const id = req.params.id

  Room.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
      } else {
        res.redirect('back')
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id
      })
    })
}