const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/techNotes')
        .then((conn) => {
            console.log(`Database Connected: ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(`Database Error ${err}`);
            process.exit(1);
    })
}

module.exports = dbConnection;