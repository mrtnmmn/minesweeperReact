import { useState, useEffect, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons"

import "../App.css"
import "../Css/Board.css"
import Cell from "./Cell"

function Board(props) {
  const rows = props.rows
  const columns = props.columns
  const generate = props.generate
  const filledBoard = props.filledBoard
  const startPosition = props.startPosition
  const setStartPosition = props.setStartPosition
  const mineQuantity = props.mineQuantity

  const [buttonStatus, setButtonStatus] = useState([])
  const [mock, setMock] = useState([])
  const [endGame, setEndGame] = useState(false)
  const [firstClick, setFirstClick] = useState(false)
  const [hoveringCell, setHoveringCell] = useState([])
  const [auxHovering, setAuxHovering] = useState([])
  const [flaggedCells, setFlaggedCells] = useState(0)
  const [victory, setVictory] = useState(false)

  useEffect(() => {
    resetAllButtons()
  }, [])

  useEffect(() => {
    resetAllButtons()
  }, [columns, rows])

  useEffect(() => {
    let mockedArr = []
    let row = []

    for (let i = 0; i < rows; i++) {
      row = []
      for (let j = 0; j < columns; j++) {
        row.push(0)
      }
      mockedArr.push(row)
    }
    setMock([...mockedArr])
  }, [rows, columns])

  useEffect(() => {
    document.addEventListener("contextmenu", prueba)
  })

  const handleRightClick = (e, row, col) => {
    e.preventDefault()
    console.log('rightClicking: ' + row  + ', ' + col)
    flagCell(row, col)
  }

  const prueba = () => {
    if (hoveringCell.length !== 0) console.log("Hovering Cell: ", hoveringCell)
  }

  function revealCell(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= columns) {
      return
    }

    if (filledBoard[row][col] !== 0 || buttonStatus[row][col] !== 0) {
      changeButtonStatus(row, col)
      return
    }

    changeButtonStatus(row, col)

    revealCell(row + 1, col + 1)
    revealCell(row + 1, col)
    revealCell(row - 1, col - 1)
    revealCell(row - 1, col + 1)
    revealCell(row + 1, col - 1)
    revealCell(row - 1, col)
    revealCell(row, col - 1)
    revealCell(row, col + 1)
  }

  function changeButtonStatus(row, col) {
    let auxArray = buttonStatus
    auxArray[row][col] = 1
    setButtonStatus([...auxArray])
  }

  function flagCell(row, col) {
    console.log('flaging: ' + row + ', ' + col)
    let auxArray = buttonStatus
  
    if (auxArray[row][col] === 2) {
      auxArray[row][col] = 0
      setFlaggedCells(flaggedCells - 1)
    } else {
      if (flaggedCells < mineQuantity) {
        auxArray[row][col] = 2
        setFlaggedCells(flaggedCells + 1)
      }
    }
    setButtonStatus([...auxArray])
  }

  function resetAllButtons() {
    let board = []
    let row = []

    for (let i = 0; i < rows; i++) {
      row = []
      for (let j = 0; j < columns; j++) {
        row.push(0)
      }
      board.push(row)
    }
    setStartPosition([])
    setButtonStatus([...board])
  }

  function start(row, col) {
    setStartPosition([row, col])
    setFirstClick(true)
    console.log("starting in: " + row + ", " + col)
    generate(row, col)
  }

  useEffect(() => {
    if (firstClick) {
      revealCell(startPosition[0], startPosition[1])
    }
  }, [filledBoard])

  useEffect(() => {
    const total = rows * columns
    let sum = 0

    buttonStatus.forEach((row, indexRow) => {
      row.forEach((col, indexCol) => {
        if (col === 1) {
          if (filledBoard[indexRow][indexCol] === 9) {
            setEndGame(true)
          }
          sum += 1
        }
      })
    });

    if (sum + mineQuantity === total) {
      setVictory(true)
    }
  }, [buttonStatus])

  return (
    <div className="boardMainDiv">
      <div className="gameInfo">
        <FontAwesomeIcon icon={faBomb} /> : {mineQuantity} &nbsp;&nbsp;
        <FontAwesomeIcon icon={faFlag} /> : {mineQuantity - flaggedCells}
      </div>
      {filledBoard !== undefined && buttonStatus.length !== 0 ? (
        <div>
          {firstClick ? (
            <div className="divCont">
              {filledBoard.map((row, indexRow) => {
                return (
                  <div key={indexRow}>
                    {row.map((col, indexCol) => {
                      return (
                        <Cell
                          key={indexRow * 10 + indexCol}
                          num={col}
                          buttonClick={() => {
                            revealCell(indexRow, indexCol)
                          }}
                          status={buttonStatus[indexRow][indexCol]}
                          row={indexRow}
                          column={indexCol}
                          setHoveringCell={setHoveringCell}
                          flagCell={flagCell}     
                          endGame={endGame}                      
                        />
                      )
                    })}
                  </div>
                )
              })}
              {victory ? <div>Victory</div> : <></>}
              {endGame ? <div>Final</div> : <></>}
            </div>
          ) : (
            <div className="divCont">
              {mock.map((row, indexRow) => {
                return (
                  <div key={indexRow}>
                    {row.map((col, indexCol) => {
                      return (
                        <Cell
                          key={indexRow * 10 + indexCol}
                          num={col}
                          buttonClick={() => {
                            start(indexRow, indexCol)
                          }}
                          status={0}
                          row={indexRow}
                          column={indexCol}
                          setHoveringCell={setHoveringCell}
                        />
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Board
