const gameBoard = (function(){

    let board = ["","","","","","","","",""];

    const boardContainer = document.querySelector(".board-container");
    const boardCell = document.querySelectorAll(".cell");

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

    const CellClickEvent = boardContainer.addEventListener("click", (event) => {
        if(event.target.classList[0] === "cell") {
            const cellIndex = +event.target.getAttribute("index");
            gameFlow.playRound(cellIndex);
            //console.log(cellIndex);
        }
    });

    const clearBoard = () => {
        board = board.map(()=>"");
    }

    const renderBoard = () => {
        for(let i = 0 ; i < board.length ; i++) {
            if(board[i] !== "") {
                const playerMarkerIcon = document.createElement("img");
                playerMarkerIcon.style.width = "128px"
                playerMarkerIcon.style.height = "128px"
                playerMarkerIcon.src = `assets/${board[i].toLowerCase()}-handy-ic.png`;
                playerMarkerIcon.draggable = false;
                if(boardCell[i].childNodes.length) {
                    boardCell[i].replaceChild(playerMarkerIcon, boardCell[i].firstChild);
                }
                else {
                    boardCell[i].appendChild(playerMarkerIcon);
                }
            }
            else {
                if(boardCell[i].childNodes.length) {
                    boardCell[i].removeChild(boardCell[i].firstChild);
                }
            }
        }
    }

    return {
        getBoard,
        renderBoard,
        getWinConditions,
        placeMarker,
        clearBoard
    };

})()


const player = function(name,marker) {
    let score = 0;
    const scoreContainer = document.querySelectorAll(".scores-container > .p");
    const getMarker = () => marker;
    const getScore = () => score;
    const increaseScore = () => {score++};

    const renderScore = () => {
        switch(getMarker()) {
            case "X":
                scoreContainer[0].children[1].textContent = getScore();
                break;
            case "O":
                scoreContainer[1].children[1].textContent = getScore();
                break;
        }
    }

    const toggleTurn = () => {
        for(container of scoreContainer) {
            container.children[0].classList.toggle("turn");
        }
    }

    return{
      getMarker,
      getScore,
      increaseScore,
      renderScore,
      toggleTurn
    };
}


const player1 = player("Player1","X");
const player2 = player("Player2","O");



const gameFlow = (function(){

    let currentPlayer = player1;

    const tieScore = document.querySelector(".tie .score");

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const renderTieScore = () => {
        tieScore.textContent = +tieScore.textContent + 1;
    }

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
            currentPlayer.toggleTurn();
            gameBoard.renderBoard();
            if(checkWin()){
                currentPlayer.increaseScore();
                currentPlayer.renderScore();
                gameBoard.clearBoard();
                gameBoard.renderBoard();
                switchPlayer();
            }else if (checkDraw()){
                gameBoard.clearBoard();
                gameBoard.renderBoard();
                renderTieScore();
                switchPlayer();
            } else {
                switchPlayer();
            }
        }
    }

    return {playRound};

})();





