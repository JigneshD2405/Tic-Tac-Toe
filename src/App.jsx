import { useState } from "react"
import GameBoard from "./Components/GameBoard/GameBoard"
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo"
import Log from "./Components/Log/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./Components/GameOver/GameOver"

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

function deriveActivePlayer(gameTurns) {
  let currentTurns = "X"
  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentTurns = "O"
  }
  return currentTurns
}


function deriveWinner(gameBoard, players) {
  let winner;
  for (let combinations of WINNING_COMBINATIONS) {
    let firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    let secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    let thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }
  return winner
}
function derivGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(ele => [...ele])]

  for (let turn of gameTurns) {
    let { square, player } = turn
    let { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}

function App() {
  let [players, setPlayers] = useState(PLAYERS)
  let [gameTurns, setGameTurns] = useState([])

  let activePlayerSymbol = deriveActivePlayer(gameTurns)
  const gameBoard = derivGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  let hasDraw = gameTurns.length == 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      activePlayerSymbol = deriveActivePlayer(prevTurns)
      let updateTurn = [{ square: { row: rowIndex, col: colIndex }, player: activePlayerSymbol }, ...prevTurns]
      return updateTurn
    }
    )
  }
  function handlePlayerNameChange(symbol, playerName) {
    setPlayers((prevName => {
      return {
        ...prevName,
        [symbol]: playerName
      }
    }))
  }

  function handleRematch() {
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo name={PLAYERS.X} symbol="X" isActive={activePlayerSymbol === "X"} onNameChange={handlePlayerNameChange} />
          <PlayerInfo name={PLAYERS.O} symbol="O" isActive={activePlayerSymbol === "O"} onNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard onSelected={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
