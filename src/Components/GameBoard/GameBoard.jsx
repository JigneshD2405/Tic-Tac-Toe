

export default function GameBoard({ onSelected, board }) {

    // let [gameBoard, setGameBoard] = useState(initialGameBoard)
    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         let updatedGame = [...prevGameBoard.map((innerElement) => [...innerElement])]
    //         updatedGame[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedGame
    //     })
    //     onSelected()
    // }
    return (<ol id="game-board">
        {
            board.map((rows, rowIndex) =>
            (<li key={rowIndex}>
                <ol>
                    {
                        rows.map((playerSymbol, colIndex) => (<li key={colIndex}><button onClick={() => onSelected(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>))
                    }
                </ol>
            </li>
            ))
        }
    </ol>)
}