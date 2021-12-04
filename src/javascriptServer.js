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

//Track if the game needs to end.
var end = false;

//Track who won the game
var whoWon = 0; // 1 means player 1 won, 2 means player 2 won.

var express = require('express');
const { send } = require('process');
var app = express(); //I Think this is for node.js in which the express framwork is used.

//So from what I see in lab09, I need to put all my server commands in here
app.post('/post', (req, res) => { //req --> request infromation, res --> server response
    res.header("Access-Control-Allow-Origin", "*"); //Not sure what this means but it was in lab09
    console.log("\n"+"Recived Action");
    var recivedData = JSON.parse(req.query['data']); //This where the recived data goes.

    //Server actions HERE
    
    //When there is a startGame prompt from client.
    if(recivedData['action'] == 'startGame'){
        if (gameRunning == true) { //If there is already a game running, resume it
            var jsonRes = JSON.stringify({
                'action': 'resume',
                'p1Scr' : p1Score,
                'p2Scr' : p2Score,
                'p1Choice': p1Choice,
                'p2Choice': p2Choice,
                'whoWon': whoWon,
                'pTurn' : playerTurn,
            });
        } 
        else { //Otherwise
            initGame(recivedData); //Set default values
            var jsonRes = JSON.stringify({
                'action': 'newGame',
                'p1Scr' : p1Score,
                'p2Scr' : p2Score,
                'pTurn' : playerTurn,
                'cpu' : cpuToggle,
            });
        }
        DebugPrint(recivedData, jsonRes);
        res.send(jsonRes); //send the response back to client
    }

    //If a player made a move.
    if(recivedData['action'] == 'move'){

        if(playerTurn == 1){ //if player 1 moved
            p1Choice = recivedData['playerChoice']; //store p1's data
            playerTurn++; //change the turn

            if(cpuToggle == true){ //if the cpu is on, make it's move
                p2Choice = cpuMove();
                playerTurn--; //change the turn

                var Winner = evaluate(p1Choice,p2Choice); //Then evaluate the results
                console.log("Winner: "+Winner);
                Score(Winner);

                if (end == true){ //Did that move win the game? If so send it to the client.
                    var jsonRes = JSON.stringify({
                        'action':'finishGame',
                        'p1Choice': p1Choice,
                        'p2Choice': p2Choice,
                        'p1Scr': p1Score,
                        'p2Scr': p2Score,
                        'pTurn': 0,
                        'whoWon': whoWon
                    });
                    gameRunning = false; //Stop game
                }
                else { //If not, send request to continue playing
                    var jsonRes = JSON.stringify({
                        'action':'continueRound',
                        'p1Choice': p1Choice,
                        'p2Choice': p2Choice,
                        'p1Scr': p1Score,
                        'p2Scr': p2Score,
                        'pTurn': playerTurn,
                        'whoWon': whoWon
                    });
                }
            }

            else{ //If the cpu is off, send a request for player two input.
                var jsonRes = JSON.stringify({
                    'action':'nextTurn',
                    'pTurn': playerTurn
                    });
            }
        }

        else if (playerTurn == 2) { //Otherwise if player 2 moved
            p2Choice = recivedData['playerChoice']; //Store player's choice
            playerTurn--; //Move the turn tracker back.

            var Winner = evaluate(p1Choice,p2Choice); //Then evaluate the results
            console.log("Winner: "+Winner);
            Score(Winner);


            if (end == true){ //Did that move win the game? If so send it to the client.
                var jsonRes = JSON.stringify({
                    'action':'finishGame',
                    'p1Choice': p1Choice,
                    'p2Choice': p2Choice,
                    'p1Scr': p1Score,
                    'p2Scr': p2Score,
                    'pTurn': 0,
                    'whoWon': whoWon
                });
                gameRunning = false; //Stop the game
            }
            else { //Otherwise continue playing.
                var jsonRes = JSON.stringify({
                    'action':'continueRound',
                    'p1Choice': p1Choice,
                    'p2Choice': p2Choice,
                    'p1Scr': p1Score,
                    'p2Scr': p2Score,
                    'whoWon': whoWon,
                    'pTurn': playerTurn,
                });
            }
        }
        DebugPrint(recivedData, jsonRes);
        res.send(jsonRes);
    }

}).listen(3000);
console.log("Server is running!");

//Additional functions below


//This functions resets all values that the server is holding.
function initGame(data){
    p1Score = 0; //Scores to 0
    p2Score = 0;
    gameRunning = true;
    end = false;
    playerTurn = 1;
    whoWon = 0;
    if (data['cpu'] == true){ //If the cpu was turned on.
        cpuToggle = true; //Store the fact that the cpu is on.
    }
    else{ //otherwise, turn off cpu.
        cpuToggle = false;
    }
}

//Outputs the result of the two player choices.
function evaluate(p1, p2){
    if (p1 == p2){
        return 0; //tie
    }
    else if (p1 == 1){ //rock vs
        if(p2 == 2){ //paper
            return 2; //p2 wins
        }
        else if(p2 == 3){ //scissors
            return 1; //p1 wins
        }
    }
    else if (p1 == 2){ //paper vs
        if(p2 == 1){ //rock
            return 1; //p1 wins
        }
        else if(p2 == 3){ //scissors
            return 2; //p2 wins
        }
    }
    else if (p1 == 3){ //scissors vs
        if (p2 == 1) { //rock
            return 2;
        }
        else if(p2 == 2){ //paper
            return 1; //p1 wins
        }
    }
    else{
        return -1;
    }
}

//Controls the score of the game
function Score(win){
    switch(win){
        case 0:{
            whoWon = 0; //Signal that it is a tie. Damn it took so long to find this bug :(
            break;
        }
        case 1:{
            p1Score++;
            whoWon = 1;
            break;
        }
        case 2:{
            p2Score++;
            whoWon = 2;
            break;
        }
    }

    //Check if this scoring won the game.
    if(p1Score == 2){
        end = true;
        whoWon = 1;
    }
    else if(p2Score == 2){
        end = true
        whoWon = 2;
    }
}

//Returns a random number from set [1, 2, 3]
function cpuMove() {
    return Math.floor(Math.random()*3 + 1);
}

function DebugPrint(req, res){
    objRes = JSON.parse(res);
    console.log("gameRunning "+ gameRunning);
    console.log("REQ: "+req['action']);
    console.log("RES: "+ objRes['action']);
    console.log("PlayerTurn: "+playerTurn);
    console.log("Scores: P1("+p1Score+") P2("+p2Score+")");
}