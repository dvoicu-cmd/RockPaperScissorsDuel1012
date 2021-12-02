//This file is meant to handle client side operations

//GLOBAL VARIABLES

//The url where the data will be uploaded.
var url = "http://localhost:3000/post";

//Toggle for cpu.
var cpuToggle = false; 

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

    //action newGame recived
    if (serverData['action'] == 'newGame') {
        $("#progressButton").css("display","none");//hide the button.
    }


    //action resume recived
    if (serverData['action'] == 'resume'){
        window.alert("Previous game was interrupted. Resuming")
        $("#progressButton").css("display","none");
    }


}

