import { useEffect, useState } from "react";

export const Players = ({
  playerList,
  pieceArray,
  piece,
  size,
  updatePlayers,
  start,
}) => {
  useEffect(() => {
    if (!start) {
      addPlayers(size);
    }
  }, [size, start]);

  function addPlayers(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push({ playername: "", playerpiece: pieceArray[i] });
    }
    updatePlayers(arr);
  }

  function updateValues(index, key, value) {
    const updatedItems = [...playerList];
    updatedItems[index] = { ...updatedItems[index], [key]: value };
    updatePlayers(updatedItems);
  }

  return (
    <div>
      {start ? (
        <div>
          <h2>All Players</h2>
          <table>
            <thead>
              <th>Player</th>
              <th>Player Name</th>
              <th>Player Pieace</th>
            </thead>
            <tbody>
              {playerList.map((item, index) => {
                return (
                  <tr className="players-details">
                    <td>Player {index + 1}</td>
                    <td>{item.playername} </td>
                    <td>{item.playerpiece}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>Add players details</h3>
          <table>
            <thead>
              <th>Player</th>
              <th>Player Name</th>
              <th>Player Pieace</th>
            </thead>
            <tbody>
              {playerList.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>Player {i + 1}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter player name"
                        value={item.playername}
                        onChange={(e) =>
                          updateValues(i, "playername", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <select
                        onChange={(e) =>
                          updateValues(i, "playerpiece", e.target.value)
                        }
                        value={item.playerpiece}
                      >
                        {pieceArray.map((item, index) => {
                          return (
                            <option
                              key={index}
                              value={piece[item]}
                            >
                              {piece[item]}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
