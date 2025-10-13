let currentPlayer = "X"; 
let boardState = Array(9).fill("");

function setPlayer(player) {
  currentPlayer = player;
  resetGame();
}

function makeMove(cell, index) {
  if (boardState[index] !== "" || checkWin()) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    setTimeout(() => {
      alert(Гравець ${currentPlayer} переміг!);
      resetGame();
    }, 100);
    return;
  }

  if (boardState.includes("")) {
    botMove();
  }
}

function botMove() {
  let botSymbol = currentPlayer === "X" ? "O" : "X";
  let playerSymbol = currentPlayer;

  let winIndex = findBestMove(botSymbol);
  if (winIndex !== null) {
    doMove(winIndex, botSymbol);
    return;
  }

  let blockIndex = findBestMove(playerSymbol);
  if (blockIndex !== null) {
    doMove(blockIndex, botSymbol);
    return;
  }

  let emptyIndices = boardState
    .map((val, idx) => (val === "" ? idx : null))
    .filter(idx => idx !== null);

  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  doMove(move, botSymbol);
}

function doMove(index, symbol) {
  boardState[index] = symbol;
  document.querySelectorAll(".cell")[index].textContent = symbol;

  if (checkWin()) {
    setTimeout(() => {
      alert(Гравець ${symbol} переміг!);
      resetGame();
    }, 100);
  }
}

function findBestMove(symbol) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of winCombos) {
    let line = [boardState[a], boardState[b], boardState[c]];
    if (line.filter(v => v === symbol).length === 2 &&
        line.includes("")) {
      return [a,b,c].find(idx => boardState[idx] === "");
    }
  }
  return null;
}

function resetGame() {
  boardState = Array(9).fill("");
  document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
}

function checkWin() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winCombos.some(([a,b,c]) => {
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}
