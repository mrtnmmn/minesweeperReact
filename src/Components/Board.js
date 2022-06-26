import { useState, useEffect, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBomb, faFlag, faClock } from "@fortawesome/free-solid-svg-icons"
import Swal from 'sweetalert2'
//import 'sweetalert2/src/sweetalert2.scss'

import "../App.css"
import "../Css/Board.css"
import Cell from "./Cell"
import useStopwatch from "./customHooks/useStopwatch";

function Board(props) {

  const [timer, startTimer, pauseTimer, resetTimer] = useStopwatch()

  const rows = props.rows
  const columns = props.columns
  const generate = props.generate
  const filledBoard = props.filledBoard
  const setFilledBoard = props.setFilledBoard
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
    restart()
  }, [rows, columns])

  useEffect(() => {
    pauseTimer()
    if (victory) {
      setTimeout(function() { 
        Swal.fire({
          title: 'Victory!',
          icon: 'success',
          confirmButtonText: 'Reset',
        })
        .then(() => {
          restart()
        })
    }.bind(this), 400)}
  }, [victory])

  useEffect(() => {
    pauseTimer()
    if (endGame) {
      setTimeout(function() { 
        Swal.fire({
          title: 'Mission Failed',
          icon: 'error',
          confirmButtonText: 'Reset',
        })
      .then(() => {
        restart()
      })
    }.bind(this), 400)}
  }, [endGame])

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
    if (buttonStatus[row][col] !== 2) auxArray[row][col] = 1
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
    startTimer()
  }

  function restart() {
    setVictory(false)
    setEndGame(false)
    setFlaggedCells(0)
    setFirstClick(false)
    setFilledBoard(undefined)
    resetAllButtons()
    setStartPosition([])
    resetTimer()
    generate()
  }

  function revealAll() {
    let mockedArr = []
    let row = []

    for (let i = 0; i < rows; i++) {
      row = []
      for (let j = 0; j < columns; j++) {
        if (filledBoard[i][j] !== 9) {
          row.push(1)
        } else {
          row.push(0)
        }
      }
      mockedArr.push(row)
    }

    mockedArr[0][0] = 0
    setButtonStatus([...mockedArr])
  }

  useEffect(() => {
    if (firstClick) {
      revealCell(startPosition[0], startPosition[1])
    }
  }, [filledBoard])

  useEffect(() => {
    const total = rows * columns
    let sum = 0
    let bombClicked = false

    buttonStatus.forEach((row, indexRow) => {
      row.forEach((col, indexCol) => {
        if (col === 1) {
          if (filledBoard[indexRow][indexCol] === 9) {
            setEndGame(true)
            bombClicked = true
          }
          sum += 1
        }
      })
    });

    if (sum + mineQuantity === total && !bombClicked) {
      setVictory(true)
    }
  }, [buttonStatus])

  return (
    <div className="boardMainDiv">
      <div className="gameInfo">
        <FontAwesomeIcon icon={faBomb} /> : {mineQuantity} &nbsp;&nbsp;
        <FontAwesomeIcon icon={faFlag} /> : {mineQuantity - flaggedCells} &nbsp;&nbsp;
        <FontAwesomeIcon icon={faClock} /> : {timer.minutes}:{timer.seconds}
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
