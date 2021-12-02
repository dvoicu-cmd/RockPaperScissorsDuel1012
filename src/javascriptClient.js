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


function activateCpu() {

}

//Function to start a new game.
function newGame() {
    //Tell the server I want to start a new game
    $.post(url+'?data='+JSON.stringify({
        'cpu': cpuToggle, //send over cpu status
        'action':'startGame'}),
        response);
    }

//Selection for a player input on the images
function Select(input , player){
    if (turn == player){ //if it was player 1 who moved
        $.post(url+'?data='+JSON.stringify({ //Send
            'playerChoice' : input,
            'action':'move'}), //Store p1's choice.
            response);
    }
    else {
        window.alert("Wrong side. It is player "+turn+"'s");
    }

}



//If I want to send data over use the following

// $.post(url+'?data='+JSON.stringify({
//     'name':myName,
//     'action':'generateCode'}),
//     response);

//The client's response to the server
function response(data){
    var serverData = JSON.parse(data); //put server response into a var

    //action newGame recived
    if (serverData['action'] == 'newGame') {
        $("#progressButton").css("display","none");//hide the button in the center
        $("#P1-Status").css("visibility","visible");//Show player statuses
        $("#P2-Status").css("visibility","visible");
        //Store who's turn it is.
        turn = data['pTurn'];
        //await user input 
    }

    //action resume recived: Plug in data from the server to client
    if (serverData['action'] == 'resume'){
        window.alert("Previous game was interrupted. Resuming")
        $("#progressButton").css("display","none");
    }

    //action continueRound recived: Apply Score and get player one input.
    if (serverData['action'] == 'continueRound'){

        //update status
        $("#P1-Status").text("Status: Awaiting Turn");
        $("#P2-Status").text("Status: Current Turn");
    }

    //action finishGame recived: Conclude the game and present results. Show new game button.
    if (serverData['action'] == 'finishGame') {

    }

    //action nextTurn recived: Move to player two's turn
    if (serverData['action'] == 'nextTurn')


}

