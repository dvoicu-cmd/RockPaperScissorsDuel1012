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

    //if called, switch between the two states
    switch(cpuToggle){
        case true:{
            cpuToggle = false;
            $("#2pEnable").text("Disabled");
            break;
        }
        case false:{
            cpuToggle = true;
            $("#2pEnable").text("Enabled");
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
    $("#P1-Status").css("visibility","visible");//Show player statuses
    $("#P2-Status").css("visibility","visible");

    //Reset scores:
    for(i=1; i<=2; i++){
        $("#P1 .playerScore-"+i).attr("src", "imageSources/white_peg.png");
        $("#P2 .playerScore-"+i).attr("src", "imageSources/white_peg.png");
    }

    //Hide the middle status for first turn
    $(".game-result").css("display","none");

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
    $("#winner").text(Data['whoWon']);
}

//Function updates the points on the board
function updatePoints(Data){
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

//The client's response to the server
function response(data){
    var serverData = JSON.parse(data); //put server response into a var

    //action newGame recived
    if (serverData['action'] == 'newGame') {
        $("#progressButton").css("display","none");//hide the button in the center
        $("#P1-Status").css("visibility","visible");//Show player statuses
        $("#P2-Status").css("visibility","visible");
        //Store who's turn it is.
        turn = serverData['pTurn'];
        //await user input 
    }

    //action resume recived: Plug in data from the server to client
    if (serverData['action'] == 'resume'){
        window.alert("Previous game was interrupted. Resuming")
        $("#progressButton").css("display","none");

            //Update Round results
            updateMid(serverData);

            //Display Round results in the middle
            $(".game-result").css("display","block");
        
            //Assign points
            updatePoints(serverData);
        
            //Update the player turn
            turn = serverData['pTurn'];

            //Await user input
    }

    //action nextTurn recived: Move to player two's turn
    if (serverData['action'] == 'nextTurn') {
        //Update player status
        $("#P1-Status").text("Status: Waiting Turn");
        $("#P2-Status").text("Status: Current Turn");

        //Update who's turn it is
        turn = serverData['pTurn'];
        
        //await user input
    }

    //action continueRound recived: Apply Score and get player one input.
    if (serverData['action'] == 'continueRound'){

        //update status
        $("#P1-Status").text("Status: Current Turn");
        $("#P2-Status").text("Status: Awaiting Turn");

        //Update Round results
        updateMid(serverData);

        //Display Round results in the middle
        $(".game-result").css("display","block");

        //Assign points
        updatePoints(serverData);

        //Update the player turn
        turn = serverData['pTurn'];

        //await user input

    }

    //action finishGame recived: Conclude the game and present results. Show new game button.
    if (serverData['action'] == 'finishGame') {

        //Display Round results in the middle
        updateMid(serverData);

        //Assign points
        updatePoints(serverData);

        //Update the player turn (it will be 0)
        turn = serverData['pTurn'];

        //Hide player status
        $("#P1-Status").css("visibility","hidden");
        $("#P2-Status").css("visibility","hidden");

        //Display new game button
        $("#progressButton").css("display","block");
        $("#progressButton").css("text-align","center");

    }


}
