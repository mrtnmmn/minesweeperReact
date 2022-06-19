import './App.css';
import { useState, useEffect } from 'react';
import Cell from './Components/Cell';

function App() {

  const [matrix, setMatrix] = useState([])
  const [rows, setRows] = useState(8)
  const [columns, setColumns] = useState(8)
  const [mines, setMines] = useState([])

  useEffect(() => {

    const append = async (n) => {
      setMines(mines => [...mines, pos])
    }

    let i, j, pos

    // while ( mines.length < 10) {

    for (let k = 0; k < 10; k++) {

      i = generateRandom(rows - 1, 0)
      j = generateRandom(columns - 1, 0)
  
      pos = (i + (j * 10 ))
  
      /*
      if (mines.find(num => num === pos) === undefined) {
        setMines(mines => [...mines, pos])
      }
      */
      
      setMines(mines => [...mines, pos])

      console.log(mines)
      console.log(mines.length)
    }

  }, [])

  const fillMatrix = async () => {
    const result = await generateMines()
    const rest = await fill()
    
  } 

  function fill() {

    let posFill = 0

    for (let i = 0; i < rows; i ++) {
      let row = []
      for (let j = 0; j < columns; j++) {
        posFill = i * 10 + j
        if (mines.find(num => num === posFill) !== undefined) {
          row.push(9)
        } else {
          row.push(1)
        }
      }
      setMatrix(matrix => [...matrix, row])
    }
  }

  /*
  console.log('matriz: ' + matrix + ' filas: ' + rows)

  for (let i = 0; i < rows; i ++) {
    let row = []
    for (let j = 0; j < columns; j++) {
      row.push(1)
    }
    setMatrix(matrix => [...matrix, i])
    console.log('fila: ' + i + ' ' + rows)
    console.log(matrix)
  }

  let mines = [], pos = 0, i = 0, j = 0



  */

  function generateMines () {

    let pos = 0
    let i = 0
    let j = 0

    while ( mines.length < 10) {

      i = generateRandom(rows - 1, 0)
      j = generateRandom(columns - 1, 0)
  
      pos = (i + (j * 10 ))
  
      /*
      if (mines.find(num => num === pos) === undefined) {
        setMines(mines => [...mines, pos])
      }
      */
      
      setMines(mines => [...mines, pos])

      console.log(mines)
    }

  }

  function generateRandom(m, n) {
    return Math.round(Math.random() * (m - n) + n)
  }

  return (
    /*
    <div className="App">
      <header className="App-header">
        <div className='divCont'>
          {matrix.map((row, indexRow) => {
            console.log(row)
            return <div>{
              row.map((col, indexCol)=> {
                console.log(col)
                return <Cell key={(indexRow * 10) + indexCol} num={col}></Cell>
              })}
            </div> 
          })}
        </div>
      </header>
    </div>
    */
   <div>{mines}</div>
  );
}

export default App;
