const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const updateBoard = (() => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (GameBoard.board[e.target.dataset.index] === "") {
          if (GameFlow.currentPlayer === GameFlow.player1) {
            GameBoard.board[e.target.dataset.index] =
              GameFlow.currentPlayer.getShape();
            element.textContent = GameBoard.board[e.target.dataset.index];
            GameFlow.currentPlayer = GameFlow.player2;
            GameFlow.GameOver();
          } else if (GameFlow.currentPlayer === GameFlow.player2) {
            GameBoard.board[e.target.dataset.index] =
              GameFlow.currentPlayer.getShape();
            element.textContent = GameBoard.board[e.target.dataset.index];
            GameFlow.currentPlayer = GameFlow.player1;
            GameFlow.GameOver();
          }
        }
      });
    });
  })();

  return { board };
})();

const Player = (name, shape) => {
  const getName = () => name;
  const getShape = () => shape;

  return { getName, getShape };
};

const GameFlow = (() => {
  const player1 = Player("Selwyn", "X");
  const player2 = Player("Aiden", "O");

  let currentPlayer = player1;

  const GameOver = () => {
    const row1 = [GameBoard.board[0], GameBoard.board[1], GameBoard.board[2]];
    const row2 = [GameBoard.board[3], GameBoard.board[4], GameBoard.board[5]];
    const row3 = [GameBoard.board[6], GameBoard.board[7], GameBoard.board[8]];
    const column1;
    const column2;
    const column3;
    const diagonal1;
    const diagonal2;

    if (row1.every((currentValue) => currentValue === "X")) {
      console.log("PLAYER 1 WON");
    }
    if (row2.every((currentValue) => currentValue === "X")) {
      console.log("PLAYER 1 WON");
    }
    if (row3.every((currentValue) => currentValue === "X")) {
      console.log("PLAYER 1 WON");
    }
    if (row1.every((currentValue) => currentValue === "O")) {
      console.log("PLAYER 2 WON");
    }
    if (row2.every((currentValue) => currentValue === "O")) {
      console.log("PLAYER 2 WON");
    }
    if (row3.every((currentValue) => currentValue === "O")) {
      console.log("PLAYER 2 WON");
    }
  };

  return { player1, player2, currentPlayer, GameOver };
})();
