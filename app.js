const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const fs = require("fs")
const port = 8000
const path = require('path')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/GymWebsite');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine' , 'pug')
app.set('/views',path.join(__dirname),'views')

var contactSchema = new mongoose.Schema({
  name : String,
  email : String,
  number : Number
})

var contact = mongoose.model('contact',contactSchema)

app.get('/', (req, res) => {
    const thing = {}
    res.render('home', thing) 
})
app.get('/contact', (req, res) => {
    const thing = {}
    res.render('contact', thing) 
})
app.post('/contact', (req, res) => {
  var myData = new contact(req.body)
  myData.save()
  const thing = {}
  res.render('contact', thing) 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})