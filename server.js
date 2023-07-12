const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');
const dbConnection = require('./config/database');
const dotenv = require('dotenv');
const route = require('./routes/route');
const { logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
dotenv.config({ path: 'config.env' });
const notesRoute = require('./routes/notesRoute');
const usersRoute = require('./routes/usersRoute');


// Connect to Database
dbConnection();

app.use(logger);
app.use(cors(corsOptions));
// app.use(route)
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/notes', notesRoute);
app.use('/users', usersRoute);

app.all('*', (req, res) => {
    res.status(400).send(`Can't find this route: ${req.originalUrl}`)
})


app.use(errorHandler);
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})