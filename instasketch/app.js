'use strict';

const log = console.log;
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); // middleware for parsing HTTP body from client


const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());

const testRoutes = require('./routes/tests');
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
/* ----------------------- Register routes ----------------------- */
// Import my test routes into the path '/test' (https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express/37309212#37309212)
app.use('/tests', testRoutes);
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
