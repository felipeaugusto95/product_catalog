const express  = require('express');
const morgan   = require('morgan');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
require('dotenv/config');

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'upload')));

const url = process.env.DB_CONNECTION;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log('Error in db connection: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Aplication disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('Aplication connected successfully');
});

require('./controllers/index')(app);

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});


