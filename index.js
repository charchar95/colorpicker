const express = require('express')
const app = express();
const redis = require('redis')
const client = redis.createClient();

client.on('connect', function() {
    console.log('Connected!');
  });

app.get('/', ( req, res )=>{
    res.send('Hello World!');
  });

  app.listen(3000);