//File is meant for the server functions. Still a work in progress.

//GLOBAL VARS

//Keep track if there is an active game.
var gameRunning = false;

//Keep track of player choice
var p1Choice = 0;
var p2Choice = 0;

//Track player score
var p1Score = 0;
var p2Score = 0;

//Track whos turn it is
var playerTurn = 1; //1 or 2.

//Turn on player two cpu
var cpuToggle = false;


var express = require('express');
const { send } = require('process');
var app = express(); //I Think this is for node.js in which the express framwork is used.

//So from what I see in lab09, I need to put all my server commands in here
app.post('/post', (req, res) => { //req --> request infromation, res --> server response
    res.header("Access-Control-Allow-Origin", "*"); //Not sure what this means but it was in lab09
    console.log("Recived Action");
    var recivedData = JSON.parse(req.query['data']); //This where the recived data goes.

    //Server actions HERE

    if(recivedData['action'] == 'startGame'){
        if (gameRunning == true) { //If there is already a game running, resume it
            //... 
        }
        else { //Otherwise
            gameRunning = true; // set game status as running
            p1Score = 0; //Scores to 0
            p2Score = 0;
            if (recivedData['cpu'] == 'ON'){ //If the cpu was turned on.
                cpuToggle = true; //Store the fact that the cpu is on.
            }
        }
        var jsonRes = JSON.stringify({
            'action': 'hide'
        })

        res.send(jsonRes); //send the response back to client
    }

}).listen(3000);
console.log("Server is running!");

//Additional functions below