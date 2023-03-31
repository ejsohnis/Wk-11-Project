
// this class Cell is representing a cell-block in the grid, when 
//we get the symbol after we set it, it will return the symbol 
//which is X or O

class Cell {
    constructor() {
        this.symbol = "";

    }
    getSymbol() {

        return this.symbol;

    }

    setSymbol(symbol) {
        this.symbol = symbol;

    }
}

// building the grid we use a for loop to create three rows
// of three cells in each row
// first for loop is including the rows
//the second for loop is including the columns
//I fill the grid with empty cells

class Grid {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(new Cell());
            }
            this.grid.push(row);
        }
    }

    //later on when I call this method it will return/ it will show me 
    //the result of the grid
    getGrid() {

        return this.grid;

    }
    //By reseting the symbols it it will restart the game

    //set everything blank in the array
    //so we can start a new game

    clearBoard() {
        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {
                this.grid[i][j].setSymbol("");

            }

        }
    }
    placeSymbol(row, col, symbol) {
        this.grid[row][col].setSymbol(symbol);// we put the symbol (X or O)
        // on the individual cell in the grid (board)

    }
    //isSymbol method indicates whether the cell is blank, 
    //and if not, the cell has a symbol of X or O

    isSymbol(row, col) {
        return this.grid[row][col].getSymbol() != "";

    }
    isFull() {
        // we go through the rows and columns and if the cell is not full 
        //means it's blank and there are more empty cells
        // it is not full so it will return false, 
        //if the cells filled with X and O, it will return true

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[i][j].getSymbol() == "") {
                    return false;
                }
            }

        }
        return true;

    }
    //check for all possibilities for winning the game 3 in a row for X or 3 in a row for O 
    isWinner(symbol) {
        return this.grid[0][0].getSymbol() == symbol &&
            this.grid[0][1].getSymbol() == symbol && this.grid[0][2].getSymbol() == symbol ||

            this.grid[1][0].getSymbol() == symbol &&
            this.grid[1][1].getSymbol() == symbol && this.grid[1][2].getSymbol() == symbol ||

            this.grid[2][0].getSymbol() == symbol &&
            this.grid[2][1].getSymbol() == symbol && this.grid[2][2].getSymbol() == symbol ||

            this.grid[0][0].getSymbol() == symbol &&
            this.grid[1][0].getSymbol() == symbol && this.grid[2][0].getSymbol() == symbol ||

            this.grid[0][1].getSymbol() == symbol &&
            this.grid[1][1].getSymbol() == symbol && this.grid[2][1].getSymbol() == symbol ||

            this.grid[0][2].getSymbol() == symbol &&
            this.grid[1][2].getSymbol() == symbol && this.grid[2][2].getSymbol() == symbol ||

            this.grid[0][0].getSymbol() == symbol &&
            this.grid[1][1].getSymbol() == symbol && this.grid[2][2].getSymbol() == symbol ||

            this.grid[0][2].getSymbol() == symbol &&
            this.grid[1][1].getSymbol() == symbol && this.grid[2][0].getSymbol() == symbol;
    }
}
class Game {
    constructor() {
        this.grid = new Grid();// creating an instance of the grid class
        this.turn = "X";
        this.gameWon = false;// this will mark that the game is not done yet
        this.winner = ""; //this variable will hold the winner when there is one.
    }

    //This method places an X or O on the board and switches turns and check for a win

    makeMove() {
        let row = event.target.id[5];
        let col = event.target.id[6];
        if (this.gameWon) {
            alert("Game is Over");

        }
        else if (!this.grid.isSymbol(row, col)) {
            //If this position of the cell in the grid is not a symbol 
            //means it's not occupied, you can put another symbol
            event.target.innerHTML = this.turn; // X or O can be put on the web page

            this.grid.placeSymbol(row, col, this.turn);// X or O will placed 
            //on the board of the grid (array of cells) class (inside the array)

            //I call the switch turn method and checkWin method to check whose turn it is, and who won
            this.switchTurn();
            this.checkWin();
        }
        else {
            alert("This cell is occupied, try again");
        }
    }
    // if cell is occupied we need to try again


    // here is switching turns beween X and O

    switchTurn() {
        if (this.turn == "X") {
            this.turn = "O";

        }
        else {
            this.turn = "X";
        }
        //indication which turn it is: X or O
        document.getElementById("turn").innerHTML = this.turn + "'s turn";
        //we need to place on the screen who's turn it is- with innerHTML
        //if nobody wins- it will show on the top 's trun'

    }

    // checking who is the winner: X, O, or Draw

    checkWin() {


        // if the board is full and no one won it's Draw- Nobody wins


        if (this.grid.isFull()) {
            document.getElementById("winner").innerHTML = "Draw- nobody wins";

        }
        else if (this.grid.isWinner("O") || this.grid.isWinner("X")) {
            this.gameWon = true;
            document.getElementsByClassName("alert-heading").innerHTML = "Well done";
            document.getElementsByTagName("p").innerHTML = "Aww Yeah";
            document.getElementsByClassName("mb-0").innerHTML = "You won !!!";
            document.getElementById("message").style = "display: block";  // makes the elements 
            //visible again when X or O is the winner

            if (this.grid.isWinner("O")) {
                document.getElementById("winner").innerHTML = "O is the winner";
                this.winner = "O";
            }
            else {
                document.getElementById("winner").innerHTML = "X is the winner";
                this.winner = "X";

            }
        }
    }


    // Clear all the elements in the board and start a new game

    newGame() {
        document.getElementById("message").style = "display: none"; //make the elements not visible
        //when I reset the board
        document.getElementById("winner").innerHTML = "";
        let cells = document.querySelectorAll("#grid div");
        //for loop resetting a new game
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = "";

        }
        this.grid.clearBoard();
        this.turn = this.winner; //whoever won will start the game
        this.gameWon = false;// gameWon is false (done) and new game begins
        document.getElementById("turn").innerHTML = this.winner + "'s turn";// if no one wins it shows 's trun'

    }
}

//this is the main function that create the game and the event listeners
// (responding to any event happening) for all the cells on the board on the page

window.onload = function () { //when we load the page we can start the game
    let game = new Game();
    let cells = document.querySelectorAll("#grid div");

    //for loop is for every cell that we click, it will make a move

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function () {
            game.makeMove();
        })
    }
    //here we have the Reset button so when we click on it, it will 
    //empty the cells and we start a new game
    document.getElementById("reset").addEventListener("click", function () {
        game.newGame();
    })

}
