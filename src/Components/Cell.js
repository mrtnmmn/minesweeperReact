import '../App.css';
import { useState } from 'react';

function Cell(props) {

    const n = props.num

    const [stateButton, setStateButton] = useState('buttons')
    const [content, setContent] = useState('X')
    const [isClicked, setIsClicked] = useState(false)

    function onClickFunction() {
        if (n === 9) {
            setContent('B')   
        } else {
            setContent(n)
        }
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
            default:
                setStateButton('buttonClicked')
                break;
        }
    }

    return ( 
        <button disabled={isClicked} className={stateButton} onClick={onClickFunction}>{content}</button>
    );
}

export default Cell;