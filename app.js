import http from 'http';
// const http = require('http');
const NodeCouchDb = require('node-couchdb');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
import { v4 as uuidv4 } from 'uuid';

app.use(bodyParser.json())

// node-couchdb instance talking to external service
const couchExternal = new NodeCouchDb({
  host: '127.0.0.1',
  // protocol: 'https',
  port: 5984,    //6984,
  auth: {
      user: 'adminSY8FG9u5o',
      pass: '0QUTqIy0q'
  }
});

couchExternal.listDatabases().then(function(dbs){
  console.log(dbs);
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  // res.send('hello world')
  res.status(200).send('Get recd');
  console.log('console: Hello World');
})

// POST method route
app.post('/', (req, res) => {
  res.status(200).send('POST recd');
  console.log(req.body);
  // res.send('POST request to the homepage')

  CDB_doc = Object.assign({
    _id: uuidv4()}, //uuidv4(),
    req.body)


  couchExternal.insert("test", CDB_doc).then(({data, headers, status}) => {
      // data is json response
      // headers is an object with all response headers
      // status is statusCode number
  }, err => {
      // either request error occured
      // ...or err.code=EDOCCONFLICT if document with the same id already exists
  });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})