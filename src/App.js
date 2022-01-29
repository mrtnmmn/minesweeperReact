import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [stateButton, setStateButton] = useState('buttons')

  let matrix = []

  for (let i = 0; i < 10; i ++) {
    let fila = []

    for (let j = 0; j < 10; j++) {
      fila.push("" + i + j)
    }

    matrix.push(fila)
    console.log(fila)

  }

  console.log(matrix)

  function onClickFunction(index) {
    console.log(index)
    setStateButton('buttonClicked')
  } 

  return (
    <div className="App">
      <header className="App-header">
        <div className='divCont'>
          {matrix.map((fila, indexFila) => {
            return <div>{
              fila.map((element, index)=> {
                return <button key={indexFila * 10 +index} className={stateButton} onClick={() => onClickFunction(indexFila * 10 + index)}>{element}</button>
              })}
            </div> 
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
