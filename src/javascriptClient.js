//This file is meant to handle client side operations

//GLOBAL VARIABLES

//The url where the data will be uploaded.
var url = "http://localhost:3000/post";

//Toggle for cpu.
var cpuToggle = false; 

//Keep track of turn data from server.
var turn = 0;

//Function will load up the drop down menu.
function dropDown() {
    if ($("#dropDown").css("display") == "none")
    $("#dropDown").css("display","block")
    else{
        $("#dropDown").css("display","none")
    }
}

//Function to change if the cpu.
function activateCpu() {

    //if called, switch between the two states of toggle.
    switch(cpuToggle){
        case true:{
            cpuToggle = false;
            $("#2pEnable").text("OFF");
            break;
        }
        case false:{
            cpuToggle = true;
            $("#2pEnable").text("ON");
            break;
        }
    }
}

//Function to start a new game.
function newGame() {
    //Reset game board
    resetBoard();

    //Tell the server I want to start a new game
    $.post(url+'?data='+JSON.stringify({
        'cpu': cpuToggle, //send over cpu status
        'action':'startGame'}),
        response);
    }

function resetBoard(){
    $("#P1-Status").css("visibility","visible");//Show player stats
    $("#P2-Status").css("visibility","visible");

    //Reset scores:
    for(i=1; i<=2; i++){
        $("#P1 .playerScore-"+i).attr("src", "imageSources/white_peg.png");
        $("#P2 .playerScore-"+i).attr("src", "imageSources/white_peg.png");
    }

    //Hide the middle round stats for first turn
    $(".game-result").css("visibility","hidden");

}


//Selection for a player input on the images
function Select(input , player){
    if (turn == player){ //if it was player 1 who moved
        $.post(url+'?data='+JSON.stringify({ //Send
            'playerChoice' : input,
            'action':'move'}), //Store p1's choice.
            response);
    }
    else if (turn == 0){ //when turn == 0 that means the game is not active
        window.alert("Start a new game first.");
    }
    else{
        window.alert("Wrong side. It is player "+turn+"'s turn"); //otherwise, the user is clicking on the wrong side.
    }

}

//Updates the status box in the middle of the game board
function updateMid(Data){
    const choice = new Array("null","Rock","Paper","Scissors");
    
    //Loops though all the potential choices and finds which one was choisen.
    for(i=1;i<=choice.length;i++){
        if (Data['p1Choice'] == i){
            $("#P1-Result").text(choice[i]);
        }
        if (Data['p2Choice'] == i){
            $("#P2-Result").text(choice[i]);
        }
    }
    
    //Display who won
    if (Data['whoWon'] == 0){ // OR logic operator is a pain in my ...
        $("#winner").text("Tie");
    }
    else {
        $("#winner").text("Player"+Data['whoWon']+" wins.");
    }
}

//Function updates the points on the board
function updatePoints(Data){

    if (Data['action'] == 'resume'){ //specific to resume cases, just update it all
        for(i=1; i<=Data['p1Scr']; i++){
            $("#P1 .playerScore-"+i).attr("src", "imageSources/black_peg.png");
        }
        for(i=1; i<=Data['p2Scr']; i++){
            $("#P2 .playerScore-"+i).attr("src", "imageSources/black_peg.png");
        }
    }
    else { //Normal turn based scoring
        if (Data['whoWon'] == 1){ //If player one won, score
            for(i=1; i<=Data['p1Scr']; i++){
                $("#P1 .playerScore-"+i).attr("src", "imageSources/black_peg.png");
            }
        }
        else { //Otherwise it was p2
            for(i=1; i<=Data['p2Scr']; i++){
                $("#P2 .playerScore-"+i).attr("src", "imageSources/black_peg.png");
            }
        }
    }
}

//Updates the turn statuses of the players
function updatePlayerTurn(data){

    //Who is going?
    if(turn == 1){
        $("#P1-Status").text("Status: Current Turn");

        //Make it a little more noticable to user
        $("#P1-Status").css("font-size: 130%");
        $("#P1-Status").css("border-bottom-style: solid");
        $("#P1-Status").css("border-color: rgb(255, 91, 77)");

        //Reset P2
        $("#P2-Status").text("Status: Waiting Turn");
        $("#P2-Status").css("font-size: 100%");
        $("#P2-Status").css("border-bottom-style: none");
    }
    else if (turn == 2){
        //Reset P2
        $("#P1-Status").text("Status: Waiting Turn");
        $("#P1-Status").css("font-size: 100%");
        $("#P1-Status").css("border-bottom-style: none");
        
        //Make P2 turn noticable
        $("#P2-Status").text("Status: Current Turn");
        $("#P2-Status").css("font-size: 130%");
        $("#P2-Status").css("border-bottom-style: solid");
        $("#P2-Status").css("border-color: rgb(255, 91, 77)");
    }
    else {
        //Reset if none of the cases
        $("#P1-Status").text("Status: Waiting Turn");
        $("#P1-Status").css("font-size: 100%");
        $("#P1-Status").css("border-bottom-style: none");
        $("#P2-Status").text("Status: Waiting Turn");
        $("#P2-Status").css("font-size: 100%");
        $("#P2-Status").css("border-bottom-style: none");
    }

    //When to display
    if (data['action'] == 'newGame' || 'resume' || 'nextTurn' || 'continueRound'){
        $("#P1-Status").css("visibility","visible");
        $("#P2-Status").css("visibility","visible");
    }
    else if (data['action']=='finishGame'){
        $("#P1-Status").css("visibility","hidden");
        $("#P2-Status").css("visibility","hidden");
    }
}


//Display the results in the middle
function displayMid(data){
    //hide that button
    $("#progressButton").css("visibility","hidden");
    
    //for resume responses
    if (data['action'] == 'resume'){

        //If there had been a score the previous round, display them. otherwise don't.
        if (data['p1Scr'] > 0 || data['p2Scr'] > 0){
            game_resultSHOW();
        }
        else {
            game_resultHIDE();
        }
    }

    //Depending what request is do the following
    if (data['action'] == 'continueRound'){
        game_resultSHOW();
    }

    if (data['action'] == 'finishGame') {
        $("#progressButton").css("visibility","visible");
        $("#progressButton").css("text-align","center");
    }
    if (data['action'] == 'newGame'){
        game_resultHIDE();
    }

}
//Additional functions
function game_resultSHOW(){
    $(".game-result").css("visibility","visible");
    $(".game-result p").css("margin","8px");
}
function game_resultHIDE(){
    $(".game-result").css("visibility","hidden");
    $(".game-result p").css("margin","0px");
}


//The client's response to the server



function response(data){
    var serverData = JSON.parse(data); //put server response into a var

    //action newGame recived
    if (serverData['action'] == 'newGame') {
        //Make display adjustments
        displayMid(serverData);

        //Store who's turn it is.
        turn = serverData['pTurn'];
        //await user input 
    }

    //action resume recived: Plug in data from the server to client
    if (serverData['action'] == 'resume'){
        window.alert("Previous game was interrupted. Resuming")

            //Update the player turn
            turn = serverData['pTurn'];

            //Update Round results
            updateMid(serverData);

            //Display the middle
            displayMid(serverData);
        
            //Assign points
            updatePoints(serverData);

            //update the player turns
            updatePlayerTurn(serverData);

            //Await user input
    }

    //action nextTurn recived: Move to player two's turn
    if (serverData['action'] == 'nextTurn') {

        //Update who's turn it is
        turn = serverData['pTurn'];

        //Update the player turn status
        updatePlayerTurn(serverData);
        
        //await user input
    }

    //action continueRound recived: Apply Score and get player one input.
    if (serverData['action'] == 'continueRound'){
        
        //Update the player turn
        turn = serverData['pTurn'];

        //Update Round results
        updateMid(serverData);

        //Display Round results in the middle
        displayMid(serverData);

        //Assign points
        updatePoints(serverData);

        //Update the statuses
        updatePlayerTurn(serverData);

        //await user input

    }

    //action finishGame recived: Conclude the game and present results. Show new game button.
    if (serverData['action'] == 'finishGame') {

        //Update the player turn (it will be 0)
        turn = serverData['pTurn'];

        //Display Round results in the middle
        updateMid(serverData);

        //Assign points
        updatePoints(serverData);

        //Hide player results
        displayMid(serverData);

        //Hides the player stats
        updatePlayerTurn(serverData);

        //Display new game button

    }


}
