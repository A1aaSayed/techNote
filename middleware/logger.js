const fs = require('fs');
const path = require('path');

function logEvents() {
    // Create a log directory if it doesn't exist
    const logDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
  
    // Create a request log file
    const requestLog = fs.createWriteStream(path.join(logDir, 'requests.log'));
  
    // Create an error log file
    const errorLog = fs.createWriteStream(path.join(logDir, 'errors.log'));
  
    return (req, res, next) => {
      const dateTime = new Date().toLocaleString();
      const id = Math.floor(Math.random() * 1000);
      const message = `${req.method}\t ${req.originalUrl}\t ${res.statusCode}`;
      requestLog.write(`${dateTime}\t [${id}]\t ${message}\n`);
  
      if (res.statusCode >= 400) {
        errorLog.write(`${dateTime}\t [${id}]\t ${message}\n`);
      }
  
      next();
    };
}
  
module.exports = {
    logEvents,
};