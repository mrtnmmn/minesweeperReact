import { useState, useEffect } from "react"

function ComponentIni() {

    const [matrix, setMatrix] = useState([])
    const [rows, setRows] = useState(8)
    const [columns, setColumns] = useState(8)
    const [mines, setMines] = useState([])
    const [mineQuantity, setMineQuantity] = useState(10)
    const [cellValues, setCellValues] = useState([])
    
    useEffect(() => {
        console.log('cambiando valores')
        setMineQuantity(10)


        let pos = 0
        let i = 0
        let j = 0
    
        for(let i = 0; i < 10; i++) {
    
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

        
    }, [columns])
    
    function generateRandom(m, n) {
        return Math.round(Math.random() * (m - n) + n)
    }

    return <div>
        {rows}
    </div>;
}

export default ComponentIni;