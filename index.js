const express = require('express')
const methodOverride  = require('method-override');
const redis = require('redis')
const client = redis.createClient();

const port = 3000;
const app = express();

app.use(express.static('public'));
//MiddleWa
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use('/public', express.static('public'));

client.on('connect', function() {
    console.log('Connected!');
  });

app.get('/', ( req, res )=>{
    res.render('views/show');
  });


  // NEW //
app.get('/new', (req, res) => {
  res.render('new.ejs');
  });

  
// =======================================
//              LISTENER
// =======================================
  app.listen(port);