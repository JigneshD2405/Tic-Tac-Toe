import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({ activePlayerSymbol, onSelected }) {
    let [gameBoard, setGameBoard] = useState(initialGameBoard)
    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            let updatedGame = [...prevGameBoard.map((innerElement) => [...innerElement])]
            updatedGame[rowIndex][colIndex] = activePlayerSymbol
            return updatedGame
        })
        onSelected()
    }
    return (<ol id="game-board">
        {
            gameBoard.map((rows, rowIndex) =>
            (<li key={rowIndex}>
                <ol>
                    {
                        rows.map((playerSymbol, colIndex) => (<li key={colIndex}><button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button></li>))
                    }
                </ol>
            </li>
            ))
        }
    </ol>)
}