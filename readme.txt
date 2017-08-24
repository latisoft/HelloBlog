# My project's readme.txt

$git clone https://navibator@bitbucket.org/hippo128/geek-blog.git

$cd geek-blog
$yarn global add express-generator
(npm install -g express-generator)

$express -e (=> express -e geek-blog)
#.gitignore
node_modules/

#In windows
$npm install
$set DEBUG=geek-blog
$echo %DEBUG% (or $set)
$node ./bin/www

#Open browser [http://localhost:3000/]

====
1. remove /bin/www
2. remove /routes/users.js
3. modify app.js & index.js
4. node ./app.js (replace $node ./bin/www)
5. browser[ localhost:3000 ] 

---- app.js
var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var routes      = require('./routes/index');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

---- index.js
module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
  });
};

---- req.params -> req.body -> req.query
** req.query **
// GET /search?q=allen+nathan
req.query.q => 'allen nathan'

// GET /shoes?order=desc&shoe[color]=gray&shoe[type]=nike
req.query.order => 'shoe'
req.query.color => 'gray'
req.query.shoe.type => "nike"

** req.body **
// POST user[name]=allen&user[email]=allen@taiwan
req.body.user.name  => 'allen'
req.body.user.email => 'allen@taiwan'

// POST { 'name': 'allen' }
req.body.name => 'allen'

** req.params **
// GET /user/hello
req.params.name => 'hello'

// GET /file/js/node.js
req.params[0] => 'js/node.js'

** req.param(name) **
// ?name=allen
req.param('name') => 'allen'

// POST name=allen
req.param('name') => 'allen'

// /user/allen for /user/:name
req.param('name') => 'allen'
----

==== Install MongoDB
$wmic os get caption >> Caption Microsoft Windows Pro 10
$wmic os get osarchitecture >> OSArchitecture 64-bit

----
In www.mongodb.com, download [Enterprise Server: 3.4.7 Windows x64]
$double click [mongodb-win32-x86_64-enterprise-windows-64-3.4.7-signed.msi]
>> C:\MongoDB\Server\3.4\...

----
Change default DB-directory [C:\MongoDB\Server\3.4\data\db]
Make directory [C:\MongoDB\geek-blog]
$"C:\MongoDB\Server\3.4\bin\mongod.exe" --dbpath c:\MongoDB\geek-blog
... waiting for connections on port 27017

$yarn add mongodb
(== modify package.json & yarn install)

----
Create \geek-blog\settings.js
module.exports = { 
  cookieSecret: 'geekblog', 
  db: 'geek-blog', 
  host: 'localhost',
  port: 27017
}; 
Create \geek-blog\models\db.js
var settings    = require('../settings'),
    Db          = require('mongodb').Db,
    Connection  = require('mongodb').Connection,
    Server      = require('mongodb').Server;

module.exports  = new Db( settings.db, 
                          new Server(settings.host, settings.port),
                          {safe: true} );
\geek-blog\app.js
....
var routes      = require('./routes/index');
var settings    = require('./settings');
....
----
 
