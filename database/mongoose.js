const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://mazedm80:mazedm80@cluster0.3qvv8.mongodb.net/Camplocation?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
        // eslint-disable-next-line
        console.log('MongoDB Connected');
    })
    .catch(err => {
        // eslint-disable-next-line
        console.log(err);
    });

module.exports = mongoose;