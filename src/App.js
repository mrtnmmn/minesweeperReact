import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Cell from './Components/Cell';

function App() {

  let matrix = []
  let rows = 8
  let columns = 8

  for (let i = 0; i < rows; i ++) {
    let row = []

    for (let j = 0; j < columns; j++) {
      row.push(1)
    }
    matrix.push(row)
  }

  let mines = [], pos = 0, i = 0, j = 0

  while ( mines.length < 10) {

    i = generateRandom(rows - 1, 0)
    j = generateRandom(columns - 1, 0)

    pos = (i + (j * 10 ))

    if (mines.find(num => num === pos) === undefined) {
      mines.push(pos)
      console.log('j: ' + j)
      matrix[j][i] = 9
    }
  }

  console.log(mines)
  console.log(matrix)

  function generateRandom(m, n) {
    return Math.round(Math.random() * (m - n) + n)
  }

  function fillMatrix() {
    matrix[1][1] = 9
    matrix[1][0] = 9
    matrix[1][2] = 3
  }

  fillMatrix()

  return (
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
  );
}

export default App;
