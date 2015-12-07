/****************************************************
  URL Address: http://127.0.0.1:3000
****************************************************/

express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var mysql = require('mysql');
var pool = mysql.createPool({
	host : 'localhost',
	user : 'student',
	password : 'default',
	database : 'student',
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('workoutTracker');
});

app.post('/addEx', function(req, res, next){
	console.log("Line 1");
	var context = {};
	console.log("Line 3");
	pool.query("INSERT INTO exercise (ex, reps, weight, day, lbs) VALUES (?, ?, ?, ?, ?)", [req.query.ex], [req.query.reps], [req.query.weight], [req.query.date], [req.query.lbs], function(err, result){
	console.log("Line 5");
		if(err){
			next(err);
			return;
		}
		console.log("Line 10");
		context.response = result;
//		console.log(result);
		res.render('added', context);
		console.log("Line 14");
	});
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS exercise", function(err){
    var createString = "CREATE TABLE exercise(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "ex VARCHAR(255) NOT NULL," +
    "reps INT," +
	"weight INT," +
    "day DATE," +
	"lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('reset',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://52.24.88.40:' + app.get('port') + '; press Ctrl-C to terminate.');
});
