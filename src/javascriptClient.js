var url = "http://localhost:3000/post";

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

