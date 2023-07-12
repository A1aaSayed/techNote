const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fsPromises = require('fs').promises;

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '../logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '../logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '../logs', logFileName), logItem)
  } catch (err) {
    console.log(err);
  } 
}

const logger = (req, res, next) => {
  logEvents((`${req.message}\t${req.url}\t ${req.header.origin}`), 'requests.log');
  console.log(`${req.method} ${req.path}`);
  next();
}

module.exports = { logEvents, logger };


// function logEvents() {
//     // Create a log directory if it doesn't exist
//     const logDir = path.join(__dirname, '../logs');
//     if (!fs.existsSync(logDir)) {
//       fs.mkdirSync(logDir);
//     }
  
//     // Create a request log file
//     const requestLog = fs.createWriteStream(path.join(logDir, 'requests.log'));
  
//     // Create an error log file
//     const errorLog = fs.createWriteStream(path.join(logDir, 'errors.log'));
  
//     return (req, res, next) => {
//       const dateTime = new Date().toLocaleString();
//       const id = Math.floor(Math.random() * 1000);
//       const message = `${req.method}\t ${req.originalUrl}\t ${res.statusCode}`;
//       requestLog.write(`${dateTime}\t [${id}]\t ${message}\n`);
  
//       if (res.statusCode >= 400) {
//         errorLog.write(`${dateTime}\t [${id}]\t ${message}\n`);
//       }
  
//       next();
//     };
// }
  
// module.exports = {
//     logEvents,
// };