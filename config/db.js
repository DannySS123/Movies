const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/GT5X34', { useNewUrlParser: true });

module.exports = mongoose;