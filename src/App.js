import logo from './logo.svg';
import './App.css';

function App() {

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

  return (
    <div className="App">
      <header className="App-header">
        <div className='divCont'>
          {matrix.map((fila) => {
            return <div>{
              fila.map((element)=> {
                return <button className='buttons' onClick={this.className = 'buttonClicked'}>{element}</button>
              })}
            </div> 
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
