import '../App.css';
import { useState } from 'react';

function Cell() {

    const [stateButton, setStateButton] = useState('buttons')
    const [content, setContent] = useState('')

    function onClickFunction() {
        setStateButton('buttonClicked uno')
        setContent('')   
    }

    return ( 
        <button className={stateButton} onClick={onClickFunction}>1</button>
    );
}

export default Cell;