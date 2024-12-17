const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const Router = require('./Router')
app.use(bodyparser.json())
app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(bodyparser.json({ limit: '3gb' }));  // For JSON bodies
app.use(bodyparser.urlencoded({ limit: '3gb', extended: true }));
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', Router)
const db = require('./dbconnection')

app.listen(5000, () => {
    console.log("Port running on 5000")
})
