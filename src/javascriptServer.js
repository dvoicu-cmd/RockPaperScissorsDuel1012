//File is meant for the server functions. Still a work in progress.

var express = require('express');
const { send } = require('process');
var app = express(); //I Think this is for node.js in which the express framwork is used.

//So from what I see in lab09, I need to put all my server commands in here
app.post('/post', (req, res) => { //req --> request infromation, res --> server response
    res.header("Access-Control-Allow-Origin", "*"); //Not sure what this means but it was in lab09
    console.log("Recived Action");
    var recivedData = JSON.parse(req.query['data']); //Is this where the recived data goes?

    if(recivedData['action'] == 'startGame'){
        var jsonRes = JSON.stringify({
            'action': 'hide'
        })

        res.send(jsonRes); //send the response back to client
    }

}).listen(3000);
console.log("Server is running!");

//Additional functions below