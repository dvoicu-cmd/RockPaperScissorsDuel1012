# RockPaperScissorsDuel1012
Team Name: Hard Demanding Mindful Inquirers (HDMI)

Team Members: Dan Voicu, Yashitha Madanapalli, Minkyu (Jonathan) Kim

Emails: danvoicu@my.yorku.ca , yashi22@yorku.ca , 0714kmk@my.yorku.ca



**Project Discription:**

The premises of the project is to play a game of rock paper scissors against a server in a best of three scenario. The client is to select one of the three options by clicking an image of their selected option. The server is to then determine its own option of by a random number generator. A number output from the generator would correlate towards a one of the three choices. For example: the number 1 would equal to paper. The host computer will receive the server's output and compare it to the user's input. A winner will then be computed using comparison for all 9 possible outcomes for rock paper scissors. A counter for both the client and the server's score would be done server side to track which side is winning the round. If a win condition is meet, such as scoring two points over the opponent, the match can be reset by the viewer's discretion with the press of a button on the webpage.

**Requirements Definition:**
(Work in progress)

- User interface requirements
   - New users are to load into the page with no required login.
      - The idea is to get players into the game right away without any interference.
   - There is to be a drop-down menu button on the top left-hand corner of the web page.
      - Upon clicking, additional information and links are displayed to the left while the game is pushed to the right.
      - The menu will contain a link to a separate webpage with a tutorial, and the ability to toggle if the opponent is a computer or a player.
   - The page will consist of a game area that is separated into two sides.
      - The left and the right side will display the choice of Rock, Paper, or Scissors

- Game requirements
   - There is to be a button above the footer that serves mainly to progress games.
      - Button is used to start a round of the game, play the next round of the game, and start a new game if the round concludes.
      - The button will display in a string of text what it does such as, “Next Round” or, “New Game?”
   - The score for each player’s section of the web page displays a current score for a round
      - The score is indicted with two hollow black dots.  
      - Filled in dots indicate a win.
      - The first player to fill the dots wins the game
   - The choice of rock paper or scissors is decided on what image the user clicks.
      - The image chosen correlates to the user’s desired choice of rock paper or scissors
   - Games can be played against a computer player, or the user can toggle a pass and play option
      - Slight alterations are to be made to the game’s pacing, such as extra steps to the proceed button, to allow for users to pass the device around.


- Programing requirements
   - The web application will be developed using HTML for the body web page, CSS for the visuals of the web page, and JavaScript for scripts and commands on the webpage
   - The choice of rock paper or scissors will be represented respectively as 1, 2, and 3 in code.
      - This is done to save a little bit of data since numbers are smaller to store than a string of text such as, “rock”.
   - To determine if a win condition is meet, if and else statements will be used to account for all nine possible outcomes for the game.
      - To be extra precise, about seven if and else statements are needed since three out of the nine outcomes happen when both sides pick the same object.
   - When the user is in Player Vs Computer mode, the way the computer decides its choice is via a random number generator between 1 and 3.
      - Specifics for implementing a random number generator are to be investigated. The base line is: 1,2 or 3 is randomly chosen.








