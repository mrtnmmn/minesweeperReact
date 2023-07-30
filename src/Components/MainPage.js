import Board from "./Board";
import '../Css/MainPage.css'
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import useBoardValues from './customHooks/useBoardValues.js'
import Sidebar from "./Sidebar";
import useNightMode from "./customHooks/useNightMode";
import { light } from "@mui/material/styles/createPalette";

function MainPage() {

    const [rows, columns, setRows, setColumns, generate, filledBoard, setFilledBoard, startPosition, setStartPosition, mineQuantity] = useBoardValues()
    const [nightMode, changeNightMode, backGroundColor, cellColors, gearColor] = useNightMode()
    const [openedSettings, setOpenedSettings] = useState(false)
    const [lightMode, setLightMode] = useState(0)

    useEffect(() =>  {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault()
        })
    })

    return (  
        <div className={backGroundColor}>
            <NavBar 
                openedSettings={openedSettings} 
                setOpenedSettings={setOpenedSettings}
                gearColor={gearColor} />
            <div className="boardDiv">
                <Board
                    rows={rows}
                    columns={columns}
                    generate={generate}
                    filledBoard={filledBoard}
                    setFilledBoard={setFilledBoard}
                    startPosition={startPosition}
                    setStartPosition={setStartPosition}
                    mineQuantity={mineQuantity}
                    cellColors={cellColors}
                    lightMode={lightMode}
                    />
                {openedSettings ?
                    <Sidebar
                        rows={rows}
                        columns={columns}
                        setRows={setRows}
                        setColumns={setColumns}
                        lightMode={lightMode}
                        setLightMode={setLightMode}
                    />
                :<></>}
            </div>
            <Footer/>
        </div>
    );
}

export default MainPage;