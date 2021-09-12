const express = require('express')
const exphbs = require('express-handlebars');
const methodOverride  = require('method-override');
const redis = require('redis')
const bodyParser = require('body-parser');


// REDIS //
const client = redis.createClient();
client.on('connect', function() {
  console.log('Connected!');
});

// PORT //
const PORT = process.env.PORT || 3000;

// APP //
const app = express();
// app.use(express.static('public'));

// View Engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// BODY PARSER //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// METHOD OVERRIDE // 
app.use(methodOverride('_method'));
app.use('/public', express.static('public'));



// SEARCH //
app.get('/', ( req, res )=>{
  res.render('search');
  });

// SEARCH PROCESSING // 
app.post('/search', function(req, res, next){
  let id = req.body.color_name;
  
  client.hgetall(id, function(err, obj){
    if(!obj){
      res.render('search', {
        error: 'Color does not exist'
      });
    } else {
      obj.id = id;
      res.render('show', {
        user: obj
      });
    }
  });
});


  // RENDER NEW //
app.get('/new', (req, res) => {
  res.render('new');
  });

// POST NEW //
app.post('/new', function(req, res, next){
  let id = req.body.id;
  let color_name = req.body.color_name;
  let value = req.body.value;
  client.hmset(id, [
    'color_name', color_name,
    'value', value,
  ], function(err, reply){
    if("this is the error: " + err){
      console.log(err);
    }
    console.log("this is the reply: " + reply);
    res.redirect('/');
  });
 });


 // DELETE //
app.delete('/delete/:id', function(req, res, next){
  client.del(req.params.id);
  res.redirect('/');
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});