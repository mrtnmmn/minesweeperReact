import { useState, useEffect } from "react";

function useNightMode() {

    const [nightMode, setNightMode] = useState(true)
    const [backGroundColor, setBackGroundColor] = useState("")

    const changeNightMode = () => {
        setNightMode(!nightMode)
    }

    useEffect(() => {
        if (nightMode) {
            setBackGroundColor('mainContainer backgroundNight')
        } else {
            setBackGroundColor('mainContainer backgroundDay')
        }
    }, [nightMode])

    return [nightMode, changeNightMode, backGroundColor]
}

export default useNightMode