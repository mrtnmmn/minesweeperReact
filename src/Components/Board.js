import { useState, useEffect, useCallback } from "react";

import '../App.css';
import '../Css/Board.css'
import Cell from './Cell';

import useBoardValues from './customHooks/useBoardValues.js'

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

    useEffect(() => {
        resetAllButtons()
    }, [])

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

    /*
    const handleClick = (e) => {
        if (e.type === "click") {
            console.log("Left click");
          } else if (e.type === "contextmenu") {
            console.log("Right click");
          }
    }
    */

    const handleClick = useCallback((event) => {
        // prevent context menu from opening on right-click
        event.preventDefault();
    
        let message;
        
        // synthetic event
        switch (event.type) {
          case 'click':
            message = `Left click (synthetic event)`;
            break;
          case 'contextmenu':
            message = `Right click (synthetic event)`;
            break;
        }
    
        // native event
        switch (event.nativeEvent.button) {
          case 0:
            message = `${message}\nLeft click (native event)`;
            break;
          case 2:
            message = `${message}\nRight click (native event)`;
            break;
        }
        
        if (message) {
          console.log(`Click detected:\n${message}\n`);
        }
      }, []);
    

    function revealCell(row, col) {

        if (row < 0 || row >= rows || col < 0 || col >= columns) {
            return
        }

        if (filledBoard[row][col] !== 0 || buttonStatus[row][col] !== 0) {
            changeButtonStatus(row, col)
            return
        }

        changeButtonStatus(row, col)

        revealCell(row+1, col+1)
        revealCell(row+1, col)
        revealCell(row-1, col-1)
        revealCell(row-1, col+1)
        revealCell(row+1, col-1)
        revealCell(row-1, col)
        revealCell(row, col-1)
        revealCell(row, col+1)
    }

    function changeButtonStatus(row, col) {
        let auxArray = buttonStatus
        auxArray[row][col] = 1
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
        console.log('starting in: ' + row + ', ' + col)
        generate(row, col)
    }

    useEffect(() => {
        console.log(filledBoard)
        console.log(startPosition)
        if (firstClick) {
            revealCell(startPosition[0], startPosition[1])
        }
    }, [filledBoard])

    return (
    <div className="boardMainDiv">
        <div>Mines: {mineQuantity}</div>
        <div>{rows}</div>
        {filledBoard !== undefined && buttonStatus.length !== 0 ?
            <div>
                { firstClick ?
                    <div className='divCont'>
                    {filledBoard.map((row, indexRow) => {
                      return <div key={indexRow}>{
                        row.map((col, indexCol)=> {
                          return (
                              <Cell 
                                  key={(indexRow * 10) + indexCol} 
                                  num={col} 
                                  buttonClick={() => {revealCell(indexRow, indexCol)}}
                                  status={buttonStatus[indexRow][indexCol]}/>
                          )
                        })}
                      </div> 
                    })}
                    </div>

                :

                <div className='divCont'>
                {mock.map((row, indexRow) => {
                  return <div key={indexRow}>{
                    row.map((col, indexCol)=> {
                      return (
                          <Cell 
                              key={(indexRow * 10) + indexCol} 
                              num={col} 
                              buttonClick={() => {start(indexRow, indexCol)}}
                              status={0}/>
                      )
                    })}
                  </div> 
                })}
                </div>
                }
            </div>


        : 
            <></>
        }
    </div>
    )
}

export default Board;