const gameBoard = (function(){

    let board = ["","","","","","","","",""];

    const winConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [2,4,6],[0,4,8]
    ];

    const getBoard = () => board;

    const getWinConditions = () => winConditions;

    const placeMarker = (i,playerMarker) => {
        if(board[i] == ""){
            board[i] = playerMarker;
            return true;
        }
        return false;
    }

    const clearBoard = () => {
        board = board.map(()=>"");
    }

    return {
        getBoard,
        getWinConditions,
        placeMarker,
        clearBoard
    };

})()


const player = function(name,marker) {
    let score = 0;
    const getMarker = () => marker;
    const getScore = () => score;
    const increaseScore = () => {score++};

    return{
      getMarker,
      getScore,
      increaseScore
    };
}


const player1 = player("Player1","X");
const player2 = player("Player2","O");



const gameFlow = (function(){

    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        return gameBoard.getWinConditions().some(condition => {
            return board[condition[0]] !== "" &&
            board[condition[0]] === board[condition[1]]
            && board[condition[1]] === board[condition[2]];
        });
    };
    const checkDraw = () => {
        const board = gameBoard.getBoard();
        return gameBoard.getWinConditions().every(condition => {
            return board[condition[0]] !== ""
            && board[condition[1]] !== ""
            && board[condition[2]] !== ""
            && (board[condition[0]] !== board[condition[1]] || board[condition[0]] !== board[condition[2]]);
        });
    };


    const playRound = (i) =>{
        if (gameBoard.placeMarker(i,currentPlayer.getMarker())){
            if(checkWin()){
                currentPlayer.increaseScore();
                gameBoard.clearBoard();
                switchPlayer();
            }else if (checkDraw()){
                gameBoard.clearBoard();
                switchPlayer();
            } else {
                switchPlayer();
            }
        }
    }

    return {playRound};

})();


console.log("=== Testing gameBoard ===");
console.log(gameBoard.getBoard());

console.log("Place Marker Test (Player 1, X):");
gameBoard.placeMarker(0, player1.getMarker());
console.log(gameBoard.getBoard());


