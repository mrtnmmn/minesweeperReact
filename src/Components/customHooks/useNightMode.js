import { useState, useEffect } from "react";

function useNightMode() {

    const [nightMode, setNightMode] = useState(true)
    const [backGroundColor, setBackGroundColor] = useState("")
    const [cellColors, setCellColors] = useState(
        {
            buttons: 'buttons',
            one: 'one',
            two: 'two',
            three: 'three',
            four: 'four',
            five: 'five',
            six: 'six',
            zero: 'zero',
            unclicked: 'unclicked',
            buttonClicked: 'buttonClicked',
            flag: 'flag',
            bomb: 'bomb'
        }
    )
    const [gearColor, setGearColor] = useState('gearColorActive')

    const changeNightMode = () => {
        setNightMode(!nightMode)
    }

    useEffect(() => {
        if (nightMode) {
            setBackGroundColor('mainContainer')
            setCellColors(
                {
                    buttons: 'buttons',
                    one: 'one',
                    two: 'two',
                    three: 'three',
                    four: 'four',
                    five: 'five',
                    six: 'six',
                    zero: 'zero',
                    unclicked: 'unclicked',
                    buttonClicked: 'buttonClicked',
                    flag: 'flag',
                    bomb: 'bomb'
                }
            )
            setGearColor('gearColorActive')
        } else {
            setBackGroundColor('mainContainer backgroundDay')
            setCellColors(
                {
                    buttons: 'buttons buttonsLight',
                    one: 'one oneLight',
                    two: 'two twoLight',
                    three: 'three threeLight',
                    four: 'four fourLight',
                    five: 'five fiveLight',
                    six: 'six sixLight',
                    zero: 'zero zeroLight',
                    unclicked: 'unclickedLight',
                    buttonClicked: 'buttonClicked',
                    flag: 'flagLight',
                    bomb: 'bombLight'
                }
            )
            setGearColor('gearColorActiveLight')
        }
    }, [nightMode])

    return [nightMode, changeNightMode, backGroundColor, cellColors, gearColor]
}

export default useNightMode