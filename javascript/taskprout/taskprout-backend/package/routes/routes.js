const express = require('express');
const dbrouter = express.Router();
const usrrouter = express.Router();
const dbcontroller = require('../controllers/dbcontroller')
const usrcontroller = require('../controllers/usrcontroller')


//Todos routes
dbrouter.get('/all', dbcontroller.getAlltodos);
dbrouter.get('/u/:id', dbcontroller.getIdtodos);
dbrouter.post('/create', dbcontroller.createtodo);
dbrouter.post('/delete', dbcontroller.deletetodo);
dbrouter.post('/update', dbcontroller.updatetodo);


//User routes
usrrouter.get("/all", usrcontroller.getallUsers);
usrrouter.get("/add", usrcontroller.addUser);
usrrouter.get("/login", usrcontroller.loginUser);

module.exports = { dbrouter, usrrouter };
