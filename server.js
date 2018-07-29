const express = require('express');
const app = express();
const bp = require('body-parser');
const config = require('./config/config');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.use(bp.json());
require('./config/routes')(app)


if(process.env.NODE_ENV === "test") {
	mongoose.connect(config.test_db);
	app.listen(config.test_port, (err)=>{
	  if(err) throw err;
	  console.log(`App listening on port ${config.test_port}`);
	});
} else {
 	mongoose.connect(config.db);
        app.listen(config.port, (err)=>{
	  if(err) throw err;
	  console.log(`App listening on port ${config.port}`);
	});
}

module.exports = app;