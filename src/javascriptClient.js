//This file is meant to handle client side operations

//GLOBAL VARIABLES

//The url where the data will be uploaded.
var url = "http://localhost:3000/post";

//Toggle for cpu.
var cpuToggle = false; 

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
            'action':'store'}), //Store p1's choice.
            response);
    }
    else if (turn == player){ //else check if it is player 2's move
        $.post(url+'?data='+JSON.stringify({ //Send
            'playerChoice' : input,
            'action':'evaluate'}), //If it is p2's turn then evaluate the winner
            response);
    }
    else {
        window.alert("Error: Invalid Turn ID");
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

    //action resume recived
    if (serverData['action'] == 'resume'){
        window.alert("Previous game was interrupted. Resuming")
        $("#progressButton").css("display","none");
    }

    //action nextPlay recived
    if (serverData['action'] == 'nextPlay'){

        if

        //update status
        $("#P1-Status").text("Status: Awaiting Turn");
        $("#P2-Status").text("Status: Current Turn");
    }


}

