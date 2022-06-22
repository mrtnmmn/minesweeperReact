import { useEffect, useState } from "react";

function useBoardValues() {

    const [boardValues, setBoardValues] = useState([])
    const [rows, setRows] = useState(8)
    const [columns, setColumns] = useState(8)
    const [startPosition, setStartPosition] = useState([])
    const [mineQuantity, setMineQuantity] = useState(0)

    useEffect(() => {
        
        setMineQuantity(Math.round(rows * columns / 6.25))

    }, [rows, columns])

    const generate = (row, col) => {
        fillBoardValues(generateBoardValues(generateMinePositions(row, col)))
    }

    const generateMinePositions = (row, col) => {

        let minePositions = []
        let position = 0

        let restrictedPositions = generateRestrictedPositions(row, col)

        for (let i = 0; i < mineQuantity; i++) {
            while (true) {
                position = generateRandom(rows - 1 ,0) * 10 + generateRandom(columns - 1 ,0)
                if (!minePositions.includes(position) && !restrictedPositions.includes(position)) {
                    minePositions.push(position)
                    break
                }
            }
        }
        return (minePositions)
    }

    const generateRestrictedPositions = (row, col) => {
        let restrictedPositions = []

        restrictedPositions.push( (row - 1 ) * 10 + col - 1 )
        restrictedPositions.push( (row - 1 ) * 10 + col )
        restrictedPositions.push( (row - 1 ) * 10 + col + 1 )
        restrictedPositions.push( (row ) * 10 + col - 1 )
        restrictedPositions.push( (row ) * 10 + col + 1 )
        restrictedPositions.push( (row + 1 ) * 10 + col - 1 )
        restrictedPositions.push( (row + 1 ) * 10 + col )
        restrictedPositions.push( (row + 1 ) * 10 + col + 1 )
        restrictedPositions.push( row * 10 + col )

        return restrictedPositions

    } 

    const generateBoardValues = (minePositions) => {
        let board = []
        let row = []
        for(let i = 0; i < rows; i++) {
            row = []
            for (let j = 0; j < columns; j++) {
                if (minePositions.includes(i * 10 + j)) {
                    row.push(9)
                } else {
                    row.push(0)
                }
            }
            board.push(row)
        }
        return board
    }

    const fillBoardValues = (boardMinePositions) => {

        let filledBoard = []
        let numberOfMines = 0
        let row = []

        for(let i = 0; i < rows; i++) {
            row = []
            for (let j = 0; j < columns; j++) {
                numberOfMines = 0
                if (boardMinePositions[i][j] !== 9) {
                    if (boardMinePositions[i-1] && boardMinePositions[i-1][j-1] && boardMinePositions[i-1][j-1] === 9) {numberOfMines += 1}
                    if (boardMinePositions[i-1] && boardMinePositions[i-1][j] && boardMinePositions[i-1][j] === 9) {numberOfMines += 1}
                    if (boardMinePositions[i-1] && boardMinePositions[i-1][j+1] && boardMinePositions[i-1][j+1] === 9) {numberOfMines += 1}
                    if (boardMinePositions[i] && boardMinePositions[i][j-1] && boardMinePositions[i][j-1] === 9) {numberOfMines += 1}
                    if (boardMinePositions[i] && boardMinePositions[i][j+1] && boardMinePositions[i][j+1] === 9) {numberOfMines += 1}
                    if (boardMinePositions[i+1] && boardMinePositions[i+1][j-1] && boardMinePositions[i+1][j-1] === 9) {numberOfMines += 1}
                    if (boardMinePositions[i+1] && boardMinePositions[i+1][j] && boardMinePositions[i+1][j] === 9) {numberOfMines += 1}
                    if (boardMinePositions[i+1] && boardMinePositions[i+1][j+1] && boardMinePositions[i+1][j+1] === 9) {numberOfMines += 1}
                } else {
                    numberOfMines = 9
                }
                row.push(numberOfMines)
            }
            filledBoard.push(row)
        }
        setBoardValues(filledBoard)
    }

    function generateRandom(m, n) {
        return Math.round(Math.random() * (m - n) + n)
    }

    /*
    useEffect(() => {
        generate()
        console.log('generation')            
        //console.log(Math.trunc(6/10))
    }, [startPosition])
    */

    return [rows, columns, setRows, setColumns, generate, boardValues, setBoardValues ,startPosition, setStartPosition, mineQuantity]
}

export default useBoardValues;