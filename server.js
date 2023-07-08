const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');
const dbConnection = require('./config/database');
const dotenv = require('dotenv');
const route = require('./routes/route');
const {logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler');
dotenv.config({ path: 'config.env' });


// Connect to Database
dbConnection();


app.use(route)
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logEvents());
app.use(errorHandler);

// Allow the server to accept requests from a few specified origins only using cors.
const specifiedOrigins = [
    'http://localhost:5000',
    'http://server.com'
]
app.use(cors(specifiedOrigins))



const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})