const User = require('../models/subscriber')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Room = require('../models/room_Schema')
exports.Login = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const aa = req.body.username
    const user = await User.findOne({ username: req.body.username })
    console.log(aa);
    if (user) {
      console.log('Found User');
    }
    if (!user) {
      //req.flash('msg', 'อีเมลไม่ถูกต้อง')
      console.log('Notfound User');
      res.redirect('/login')
    }
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (validated === false) {
      //req.flash('msg', 'รหัสผ่านไม่ถูกต้อง')
      res.redirect('back')
    }
    const admin = user.isAdmin
    if (admin === true) {
      res.redirect('/admin')
    } else { 
      res.redirect('/index2') 
      console.log('Login Success');
    }
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
  }
}

exports.Register = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: hashPass

    })
    res.redirect('/login')
    // createUserToken(newUser, 201, req, res)
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
    res.redirect('/register')
  }
}

exports.RegisterAdmin = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: hashPass

    })
    res.redirect('/admin')
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
    res.redirect('/member_add')
  }
}

exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to update can not be empty' })
  }

  const id = req.body.id
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
        console.log(id);
      } else {
        res.redirect('/admin')
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect('back')
    })
}

exports.updateMovie = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to update can not be empty' })
  }
  const id = req.body.id
  let new_image = ''
  if (req.file) {
    new_image = req.file.filename
    try {
      fs.unlinksync('./uploads/' + req.body.old_image)
    } catch (err) {
      console.log(err)
    }
  } else new_image = req.body.old_image

  Room.findByIdAndUpdate(id, {
    nameroom: req.body.nameroom,
    namemovie: req.body.namemovie,
    time: req.body.time,
    image: new_image
  }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
      } else {
        res.redirect('/managerroom')
      }
    })
    .catch(err => {
      res.redirect('back')
    })
}