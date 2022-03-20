import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Cell from './Components/Cell';

function App() {

  const [stateButton, setStateButton] = useState('buttons')

  let matrix = []

  for (let i = 0; i < 10; i ++) {
    let fila = []

    for (let j = 0; j < 10; j++) {
      fila.push(Cell)
    }

    matrix.push(fila)
    console.log(fila)

  }

  console.log(matrix)

  function onClickFunction(index) {
    console.log(index)
  } 

  


  return (
    <div className="App">
      <header className="App-header">
        <div className='divCont'>
          <h1 className='uno'>Hola</h1>
          {matrix.map((fila) => {
            return <div>{
              fila.map((element)=> {
                return <Cell></Cell>
              })}
            </div> 
          })}
        </div>
      </header>
    </div>
  );

    /*
  return (
    <div className="App">
      <header className="App-header">
        <div className='divCont'>
          {matrix.map((fila, indexFila) => {
            return <div>{
              fila.map((element, index)=> {
                return <button key={indexFila * 10 +index} className={stateButton} onClick={() => onClickFunction(indexFila * 10 + index)}></button>
              })}
            </div> 
          })}
        </div>
      </header>
    </div>
  );
  */
}

export default App;
