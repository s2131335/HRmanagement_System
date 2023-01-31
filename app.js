const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/Index.js');
const indexHelper = require('./routes/Login&Reg/loginAndReg');
const internalRouter = require('./routes/internal/InternalUsers.js');
const compRouter = require('./routes/company/CompanyUser.js');
const upDownloadRouter = require('./routes/UpDownload/UpDownloadRoute.js');
const UserCredential = require('./database/models/UserCredential.js');
const candidateRouter = require('./routes/Candidate/candidate.js');
const testingRouter = require('./routes/Testing/testing.js')
const AptestRouter = require('./routes/Aptest/Aptest.js');
const CalendarRouter = require('./routes/Calendar/Calendar.js')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session(
  {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  },
  ));
  
  app.use('/', indexRouter);
  app.use('/helper', indexHelper);
  app.use('/internal', internalRouter);
  app.use('/comp',compRouter)
  app.use('/candidate', candidateRouter);
  app.use('/upload', upDownloadRouter);
  app.use('/testing', testingRouter);
  app.use('/aptest', AptestRouter);
  app.use('/calendar', CalendarRouter);
  ////////////////////////////////
  // app.use("/comp",express.static(path.join(__dirname,'uploads')));   // enable if local storage is needed
  ////////////////////////////////
// const {fillPdf} = require('./controllers/FillPdf');
// app.use('/fillpdf/:canId/:posId', fillPdf);
 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
if(process.env.MODE == "PROD"){
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('public/error');
    });
}

// const {sendTests} = require('./email/email.js')
// sendTests();

module.exports = app;

