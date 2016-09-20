var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var MongoStore  = require('connect-mongo')(session);

var routes      = require('./routes/index');
var settings    = require('./settings');  // MongoDB
var flash       = require('connect-flash');


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: settings.cookieSecret,
  key:    settings.db,//cookie name
  resave:             true,
  saveUninitialized:  true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    url: 'mongodb://localhost:27017/helloblog',
    db:     settings.db,
    host:   settings.host,
    port:   settings.port
  })
}));

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
app.post('/upload', upload.fields([
    {name: 'file1'},
    {name: 'file2'},
    {name: 'file3'},
    {name: 'file4'},
    {name: 'file5'}
]), function(req, res, next){
    for(var i in req.files){
        console.log(req.files[i]);
    }
    req.flash('success', '文件上传成功!');
    res.redirect('/upload');
});


/*
app.get('/:uid', function(req, res) {
  res.send('user', { uid: req.params.uid });
});
*/
routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});