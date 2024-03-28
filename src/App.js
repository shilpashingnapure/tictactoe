import logo from "./logo.svg";
import "./App.css";
import { Game } from "./OOD/game.ts";
import { useEffect, useState } from "react";
import { GameBoard } from "./Component/board.jsx";
import { Players } from "./Component/player.jsx";

function App() {
  const [game, setgame] = useState(new Game());
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState(game.getBoardStatus());
  const piece = game.getAllPieace();
  const pieceArray = game.getPieceArray();
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer());
  const [isStart, setStart] = useState(false);
  const [playerSize, setPlayerSize] = useState(2);
  const [playerList, setPlayerList] = useState([]);

  function changeBoardSize() {
    game.setBoard(boardSize);
    updateBoardUI();
  }

  function playerTurn() {
    setCurrentPlayer(game.currentPlayer());
  }

  function updateBoardUI() {
    setBoard([...game.getBoardStatus()]);
  }

  function updatePlayers(players) {
    setPlayerList(players);
  }

  function restart() {
    let g = new Game();
    setgame(g);
    setBoard(g.getBoardStatus());
    setBoardSize(3);
    setPlayerSize(2);
    setStart(false);
  }

  function isInputsValid() {
    for (let i = 0; i < playerList.length; i++) {
      let obj = playerList[i];
      if (!obj.playername) {
        return false;
      }
    }
    return true;
  }
  
  function gameStart() {
    if (!isInputsValid()) {
      alert("Enter players Values to Start Game!!");
      return;
    }
    playerList.map(({ playername, playerpiece }) => {
      game.addPlayer(playername, playerpiece);
    });
    changeBoardSize();
    setCurrentPlayer(game.currentPlayer());
    setStart(true);
  }

  return (
    <div className="App">
      <div className="input-container">
        <h1>Tic Tac Toe Game</h1>

        <div>
          <div className="flex">
            <label>Board Size</label>
            <input
              type="text"
              placeholder="enter board size"
              value={boardSize}
              className="board-input"
              onChange={(e) => setBoardSize(e.target.value)}
              disabled={isStart}
            />

              <label>Player Size</label>
              <select
                onChange={(e) => {
                  setPlayerSize(e.target.value);
                }}
                value={playerSize}
                disabled={isStart}
              >
                {pieceArray.map((item, index) => {
                  return index != 0 ? (
                    <option value={index + 1}>{index + 1}</option>
                  ) : null;
                })}
              </select>
          </div>
          <div className="players">
            <Players
              playerList={playerList}
              pieceArray={pieceArray}
              piece={piece}
              size={playerSize}
              start={isStart}
              updatePlayers={updatePlayers}
            />
          </div>
        </div>
      </div>

      <div className="board-container">
        <div className="btns">
          <button onClick={gameStart} disabled={isStart}>
            Start Game
          </button>
          <button onClick={restart}>Restart game</button>
        </div>
        {isStart ? (
          <GameBoard
            game={game}
            board={board}
            currentPlayer={currentPlayer}
            playerTurn={playerTurn}
            updateBoardUI={updateBoardUI}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
