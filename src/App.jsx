import { useState } from "react"
import GameBoard from "./Components/GameBoard/GameBoard"
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo"

function App() {
  let [activePlayerSymbol, setActivePlayerSymbol] = useState("X")

  function handleActivePlayer() {
    setActivePlayerSymbol((prevSymbol) => prevSymbol === "X" ? "O" : "X")
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo name="Player 1" symbol="X" isActive={activePlayerSymbol === "X"} />
          <PlayerInfo name="Player 2" symbol="O" isActive={activePlayerSymbol === "O"} />
        </ol>
        <GameBoard onSelected={handleActivePlayer} activePlayerSymbol={activePlayerSymbol} />
      </div>
    </main>
  )
}

export default App
