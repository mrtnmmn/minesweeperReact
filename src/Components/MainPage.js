import Board from "./Board";
import '../Css/MainPage.css'
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import useBoardValues from './customHooks/useBoardValues.js'
import Sidebar from "./Sidebar";

function MainPage() {

    const [rows, columns, setRows, setColumns, generate, filledBoard, startPosition, setStartPosition, mineQuantity] = useBoardValues()
    const [openedSettings, setOpenedSettings] = useState(false)

    return (  
        <div className="mainContainer">
            <NavBar 
                openedSettings={openedSettings} 
                setOpenedSettings={setOpenedSettings} />
            <div className="boardDiv">
                <Board
                    rows={rows}
                    columns={columns}
                    generate={generate}
                    filledBoard={filledBoard}
                    startPosition={startPosition}
                    setStartPosition={setStartPosition}
                    mineQuantity={mineQuantity}/>
                {openedSettings ?
                    <Sidebar
                        rows={rows}
                        columns={columns}
                        setRows={setRows}
                        setColumns={setColumns}/>
                :<></>}
            </div>
            <Footer/>
        </div>
    );
}

export default MainPage;