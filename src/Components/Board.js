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

  useEffect(() => {
    console.log("Hovering Cell: ", hoveringCell)
    if (hoveringCell.length === 0) {
      console.log("deleting event listener")
      document.removeEventListener("contextmenu", prueba)
    } else {
      document.addEventListener("contextmenu", prueba)
    }
  }, [hoveringCell])

  /*
    useEffect(() => {
        console.log('Now hovering: ' , hoveringCell )
        if (hoveringCell !== undefined && hoveringCell[0] !== undefined && hoveringCell[1] !== undefined){
            setAuxHovering(hoveringCell)
            console.log('added event listener in: ' , hoveringCell)
            document.addEventListener("contextmenu", flagCell(hoveringCell[0], hoveringCell[1]))
            document.addEventListener("contextmenu", (e) => {
                e.preventDefault()
                flagCell(hoveringCell[0], hoveringCell[1])
            })
        } else {
            console.log('deleted event listener in: ', auxHovering)
            if (auxHovering !== undefined && auxHovering[0] !== undefined && auxHovering[1] !== undefined) {
                document.removeEventListener("contextmenu", flagCell(auxHovering[0], auxHovering[1]))
            }
        }

    }, [hoveringCell])
    */

  const handleRightClick = () => {
    console.log("prueba")
  }

  const prueba = () => {
    if (hoveringCell.length !== 0) console.log("Hovering Cell: ", hoveringCell)
  }

  /*
    const handleClick = (e) => {
        if (e.type === "click") {
            console.log("Left click");
          } else if (e.type === "contextmenu") {
            console.log("Right click");
          }
    }
    */

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
    let auxArray = buttonStatus
    auxArray[row][col] = 2
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
    setButtonStatus(board)
  }

  function clearAllButtons() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        changeButtonStatus(i, j)
      }
    }
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

  return (
    <div className="boardMainDiv">
      <div className="gameInfo">
        <FontAwesomeIcon icon={faBomb} /> : {mineQuantity} &nbsp;&nbsp;
        <FontAwesomeIcon icon={faFlag} /> : {mineQuantity}
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
