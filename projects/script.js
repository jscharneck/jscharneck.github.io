// tictactoe must run from this class
// (Tic-Tac-Toe) Create a class Tic-Tac-Toe that will enable you to write a program to play Tic-Tac-Toe.
// The class contains a private 3-by-3 two-dimensional array. 
// Use an enumeration to represent the value in each cell of the array. 
// The enumeration’s constants should be named X, O and EMPTY (for a position that does not contain an X or an O). 
// The constructor should initialize the board elements to EMPTY.
// Allow two human players. 
// Wherever the first player moves, place an X in the specified square, and place an O wherever the second player moves.
// Each move must be to an empty square. After each move, determine whether the game has been won and whether it’s a draw. 
// Also, allow the player to specify whether he or she wants to go first or second


class TicTacToe{
	constructor(height, width)	{
		

		
	}
}


var winners = new Array();
var player1Selections = new Array();
var player2Selections = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;    // player 1 points
var points2 = 0;    // player 2 points
var size = 3;

function drawBoard() {
    var Parent = document.getElementById("game");
    var counter = 1;
    
    while (Parent.hasChildNodes())
	{
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 0; s < size; s++) 
	{
        var row = document.createElement("tr");
        
        for (r = 0; r < size; r++)
		{
            var col = document.createElement("td");
            col.id = counter;
            // col.innerHTML = counter;

            var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                }

                move++;
                var isWin = checkWinner();

                if (isWin)
                {
                    if(currentPlayer == 0)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1score").innerHTML = points1;
                    document.getElementById("player2score").innerHTML = points2;

                    reset();
                    drawBoard();
                }

                else
                {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }

    loadAnswers();
}

function reset()
{
    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
}

function loadAnswers()
{
    winners.push([1, 2, 3]);
    winners.push([4, 5, 6]);
    winners.push([7, 8, 9]);
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([3, 6, 9]);
    winners.push([1, 5, 9]);
    winners.push([3, 5, 7]);
}

function checkWinner() {
    // check if current player has a winning hand
    // only stsrt checking when player x has size number of selections
    var win = false;
    var playerSelections = new Array();

    if (currentPlayer == 0)
        playerSelections = player1Selections;
    else
	playerSelections = player2Selections;
    
    if (playerSelections.length >= size) {
        // check if any 'winners' are also in your selections
        
        for (i = 0; i < winners.length; i++) {
            var sets = winners[i];  // winning hand
            var setFound = true;
            
            for (r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                var found = false;
                
                // players hand
                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
} 

window.onload = drawBoard;