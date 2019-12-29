const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');



// Telling the server how to parse entries.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Telling the server how to render the frontend
app.set('view engine', 'ejs');

// Defining Routes
const indexRouter = require('./routes/index');
const journalsRouter = require('./routes/journals');

// Exposing routes
app.use('/', indexRouter);
app.use('/journals', journalsRouter);

// Connecting to DB, Logging success or failure to console.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Database connected!`)
});

// Loading static files
app.use(express.static('public'))

// Creating the server.
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
})

