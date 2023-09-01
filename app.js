const express = require('express')  // ใช้งาน module express
const app = express()  // สร้างตัวแปร app เป็น instance ของ express
const path = require('path') // เรียกใช้งาน path module
const port = 5000  // port 
 
// ส่วนของการใช้งาน router module ต่างๆ 
const indexRouter = require('./routes/index')
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {delimiter: '?'});
 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
 
// เรียกใช้งาน indexRouter
app.use('/', indexRouter)
 
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})