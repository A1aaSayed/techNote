const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');

// Database
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/assignment')

const route = require('./routes/route')
app.use(route)
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

// //////////////////////////////////////////////////////////////////////////////////
