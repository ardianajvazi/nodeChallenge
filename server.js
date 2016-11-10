const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');

const offersRouter = require(__dirname + '/routes/offers_router');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/offers_app_dev');

const PORT = 5000;

app.use(express.static(__dirname + '/build'));

app.use('/api', offersRouter);

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
