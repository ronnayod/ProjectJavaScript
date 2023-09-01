require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRouter = require('./routes/login')
const movieRouter = require('./routes/movie')
const controller = require('./controllers/controller')
const services = require('./servise/listser')
const bodyParser = require('body-parser')
app.set('views', './views')
app.set ('view-engine', 'ejs')
app.use(express.static('public'))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

const roomRouter = require('./routes/room')
app.use('/room', roomRouter)
app.use(express.static('uploads'))


app.get("/",(req, res) =>{
    res.render("index.ejs");
  });
app.get('/login',(req,res) =>{
    res.render('login.ejs')
})
app.get('/api/users', controller.find)
app.get('/api/room', controller.findRoom)
app.get('/register',(req,res) =>{
  res.render('register.ejs')
})
app.get('/checkroom',(req,res) =>{
  res.render('checkroom.ejs')
})
app.get('/room1',(req,res) =>{
  res.render('room1.ejs')
})
app.get('/room2',(req,res) =>{
  res.render('room2.ejs')
})
app.get('/room3',(req,res) =>{
  res.render('room3.ejs')
})
app.get('/room4',(req,res) =>{
  res.render('room4.ejs')
})
app.get('/success',(req,res) =>{
  res.render('success.ejs')
})
// app.get('/index2',(req,res) =>{
//   res.render('index2.ejs')
// })

app.get('/addmovie',(req,res) =>{
  res.render('addmovie.ejs')
})

app.get('/index2', (services.homeMovie))

app.get('/admin', (services.homeRoutes))

app.get('/managerroom', (services.homeRoom))

app.get('/member_update', (services.member_update))

app.get('/movie_update', (services.movie_update))

app.get('/member_del/:id', services.delete)

app.get('/movie_del/:id', services.deleteMovie)



app.get('/member_add',(req,res) =>{
  res.render('member_add.ejs')
})
app.get('/room',(req,res) =>{
  res.render('room.ejs')
})

app.post('/register',(req,res) =>{})


app.post('/room1',(req,res) =>{})
app.post('/room2',(req,res) =>{})
app.post('/room3',(req,res) =>{})
app.post('/room4',(req,res) =>{})
app.post('/success',(req,res)=>{})
app.post('/index2',(req,res)=>{})


app.post('/member_add',(req,res)=>{})
app.post('/checkroom',(req,res)=>{})
app.post('/managerroom',(req,res)=>{})
app.use('/auth/', authRouter)
app.use('/auth/addMovie', movieRouter)

port = 5000
/////////////////
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// จัดการห้อง
// เชื่อม mongoDB room/room
const { MongoClient } = require("mongodb");

const uri = "mongodb://admin:PKLbly95432@node31026-project.app.ruk-com.cloud:11227";



