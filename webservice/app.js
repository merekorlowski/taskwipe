const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
const tasks = require('./routes/tasks');
const login = require('./routes/login');
const projects = require('./routes/projects');
const settings = require('./routes/settings');
const employees = require('./routes/employees');

// uncomment after placing your favicon in /client
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(tasks);
app.use(login);
app.use(projects);
app.use(settings);
app.use(employees);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ err });
});

module.exports = app;
