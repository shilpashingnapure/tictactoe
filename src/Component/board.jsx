import { useState } from "react";

export const GameBoard = ({
  game,
  board,
  currentPlayer,
  playerTurn,
  updateBoardUI,
}) => {
  const [winnerLine, setWinnerLine] = useState([]);

  const [status , setStatus] = useState({
    status : false ,
    gameState : '' , 

  });

  function setWinner(row , col , direction){
      if (direction == "vertical") {
        setWinnerLine({
          row: col,
          direction,
        });
      }
      else if (direction == "horizontal") {
        setWinnerLine({
          row,
          direction,
        });
      }
      else if(direction == 'diagonal'){
        setWinnerLine({
            row , 
            direction
        })
      }else if(direction == 'antidiagonal'){
        setWinnerLine({
            row , 
            direction
        })
      }

      setStatus({
        status : true ,
        gameState : 'win'
      });


  }

  function setMatchTie(isTie){
    if (isTie) {
        setStatus({
            status : true  ,
            gameState : 'tie'
        })
      return true;
    }

  }

  function makeMove(row, col) {
    if(status.status){
        alert('Game Ended !! start new Game');
        return

    }
    
    const isValid = game.isValidPosition(row, col, currentPlayer);
    if (!isValid) {
      alert("enter valid position");
      return;
    }

    // updated in ui
    updateBoardUI();

    let gameStatus = game.checkGameStatus(row , col , currentPlayer);
    if (gameStatus){
        let [status , values] = gameStatus;
        if (status == 'win'){
            setWinner(row , col , values);
            return;
        }
        if(status == 'tie'){
            setMatchTie(values);
            return ;
        }

    }



    playerTurn();
  }

  return (
    <div className="container">

      <div>
        <h2>{!status.status
          ? `${currentPlayer.name} is your turn play ${currentPlayer.piece}`
          : status.gameState == 'win' ? `${currentPlayer.name} is Winner ${currentPlayer.piece}`:  `This Match is Tie Play again`}</h2>
      </div>
      
      <div className="board">
        {board.map((item, i) => {
          return (
            <div className="box">
              {item.map((val, j) => {
                return (
                  <div
                    onClick={() => makeMove(i, j)}
                    className={
                      (winnerLine.direction == "vertical" &&
                        j == winnerLine.row) ||
                      (winnerLine.direction == "horizontal" &&
                        i == winnerLine.row) || (winnerLine.direction == 'diagonal' && i == j) || (winnerLine.direction == 'antidiagonal' && i == (board.length-1-j))
                        ? winnerLine.direction
                        : ""
                    }
                  >
                    {val}
                   
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
