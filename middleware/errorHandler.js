function globalError(err, req, res, next) {
    const specialId = Math.floor(Math.random() * 1000);
    const { date, time } = getCurrentDateTime();
    const message = `Error, ${err.message}`;
    const errLog = [`${specialId}   ${date}   ${time}   ${message}`];

    fs.appendFile(errorFile, errLog, (err) => {
        if (err) {
            console.error(`Error, Can't write in log file`)
        }
    });
    res.status(err.status || 500).json({error: err.message})
};

module.exports = globalError;