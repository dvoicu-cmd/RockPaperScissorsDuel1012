//This file is meant to handle client side operations

//GLOBAL VARIABLES

//The url where the data will be uploaded.
var url = "http://localhost:3000/post";

//
var cpu = "ON" //string is ON or OFF. I would use a boolean but those can't be sent over json.

//Function will load up the drop down menu.
function dropDown() {
    if ($("#dropDown").css("display") == "none")
    $("#dropDown").css("display","block")
    else{
        $("#dropDown").css("display","none")
    }
}

//Function to start a new game.
function newGame() {
    //Tell the server I want to start a new game
    $.post(url+'?data='+JSON.stringify({
        'cpu': cpu, //send over cpu status
        'action':'startGame'}),
        response);
    }

//Selection for player one.
function p1Select(input){

}




//If I want to send data over use the following

// $.post(url+'?data='+JSON.stringify({
//     'name':myName,
//     'action':'generateCode'}),
//     response);

//The client's response to the server
function response(data){
    var serverData = JSON.parse(data); //put server response into a var
    if (serverData['action'] == 'hide') {
        $("#progressButton").css("display","none"); //if action recived then hide the button.
    }


}

