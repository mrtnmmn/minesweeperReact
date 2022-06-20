import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons'

import '../App.css';
import { useState, useEffect } from 'react';

function Cell(props) {

    const n = props.num
    const status = props.status 
    const row = props.row
    const column = props.column
    const setHoveringCell = props.setHoveringCell

    const [stateButton, setStateButton] = useState('buttons unclicked')
    const [content, setContent] = useState('X')
    const [isClicked, setIsClicked] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(props.status)
    const [hovering, setHovering] = useState(false)

    useEffect(() => {
        if (status === 1) {
            setColor()
            setIsClicked(true)
            changeChangeContent()
        } else if (status === 2) {
                setStateButton('buttons unclicked two')
                setContent(<FontAwesomeIcon icon={faBomb}/>)
        }
    }, [status])
    
    function changeChangeContent() {
        if (n === 9) {
            setContent(<FontAwesomeIcon icon={faBomb}/>)   
        } else {
            setContent(n)
        }
    }

    function onClickFunction() {
        setColor()
        setIsClicked(true)
    }

    function setColor() { 
        switch (n) {
            case 1:
                setStateButton('buttonClicked one')
                break;
            case 2:
                setStateButton('buttonClicked two')
                break;
            case 3:
                setStateButton('buttonClicked three')
                break;
            case 4:
                setStateButton('buttonClicked four')
                break;
            case 5:
                setStateButton('buttonClicked five')
                break;
            case 6:
                setStateButton('buttonClicked six')
                break;
            case 9:
                setStateButton('buttonClicked')
                break;
            default:
                setStateButton('buttonClicked zero')
                break;
        }
    }

    return ( 
        <button 
            disabled={isClicked} 
            onMouseEnter={() => {setHoveringCell([row, column])}} 
            onMouseLeave={() => {setHoveringCell([])}} 
            className={stateButton} 
            onClick={() => {props.buttonClick(); console.log(hovering)}}>
            {content}
        </button>
    );
}

export default Cell;