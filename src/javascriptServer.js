//File is meant for the server functions. Still a work in progress.

var express = require('express');
const { send } = require('process');
var app = express(); //I Think this is for node.js in which the express framwork is used.

//So from what I see in lab09, I need to put all my server commands in here
app.post('/post', (req, res) => { //req --> request infromation, res --> server response
    console.log("Server is running!");
}).listen(3000);


//Additional functions below