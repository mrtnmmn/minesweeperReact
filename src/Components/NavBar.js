import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"

import '../Css/NavBar.css'

function NavBar(props) {
    
    const openedSettings = props.openedSettings
    const setOpenedSettings = props.setOpenedSettings

    const [gearColor, setGearColor] = useState("gear")

    useEffect(() => {
        if (openedSettings) {
            setGearColor("gear gearColorActive")
        } else {
            setGearColor("gear gearColorUnactive")
        }
    }, [openedSettings])
    

    return (  
        <div className="navBarMainDiv" onClick={() => {setOpenedSettings(!openedSettings)}}>
            <FontAwesomeIcon icon={faGear} className={gearColor}/>
        </div>
    );
}

export default NavBar;