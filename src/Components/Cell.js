import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faLandMineOn } from "@fortawesome/free-solid-svg-icons";

import "../App.css";
import "../Css/Cell.css";
import useLongPress from "./customHooks/useLongPress";
import cellColors from "../Assets/cellColors.json"

function Cell(props) {
  const n = props.num;
  const status = props.status;
  const row = props.row;
  const column = props.column;
  const setHoveringCell = props.setHoveringCell;
  const flagCell = props.flagCell;
  const endGame = props.endGame
  const lightMode = props.lightMode

  const [stateButton, setStateButton] = useState();
  const [content, setContent] = useState("X");
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(props.status);
  const [hovering, setHovering] = useState(false);
  const [lightColors, setLightColors] = useState((lightMode) => lightMode === 0 ? cellColors.dark : cellColors.light);

  useEffect(() => {
    if (status === 1) {
      setColor();
      setIsDisabled(true);
      changeChangeContent();
    } else if (status === 2) {
      setStateButton(lightColors.buttons  + " " + lightColors.flag);
      setContent(<FontAwesomeIcon icon={faLandMineOn} />);
    } else if (status === 0) {
      setStateButton(lightColors.buttons + " " + lightColors.unclicked);
      setIsDisabled(false);
      setContent("X");
    }
  }, [status]);

  useEffect(() => {
    if (endGame) {
      setIsDisabled(true);
    }
  }, [endGame]);

  useEffect(() => {
    if (lightMode === 0) {
      setLightColors(cellColors.dark)
    } else {
      setLightColors(cellColors.light)
    }
    console.log(row + ', ' + column + ': ' , lightColors) 
  }, [lightMode])

  function changeChangeContent() {
    if (n === 9) {
      setContent(<FontAwesomeIcon icon={faBomb} />);
    } else {
      setContent(n);
    }
  }

  function onClickFunction() {
    setColor();
    setIsDisabled(true);
  }

  function setColor() {
    switch (n) {
      case 1:
        setStateButton(lightColors.buttonClicked + " " + lightColors.one);
        break;
      case 2:
        setStateButton(lightColors.buttonClicked + " " + lightColors.two);
        break;
      case 3:
        setStateButton(lightColors.buttonClicked + " " + lightColors.three);
        break;
      case 4:
        setStateButton(lightColors.buttonClicked + " " + lightColors.four);
        break;
      case 5:
        setStateButton(lightColors.buttonClicked + " " + lightColors.five);
        break;
      case 6:
        setStateButton(lightColors.buttonClicked + " " + lightColors.six);
        break;
      case 9:
        setStateButton(lightColors.buttonClicked + " " + lightColors.bomb);
        break;
      default:
        setStateButton(lightColors.buttonClicked + " " + lightColors.zero);
        break;
    }
  }

  const onLongPress = () => {
    props.flagCell(row, column);
  };

  const onClick = () => {
    props.buttonClick();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 200,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <button
      disabled={isDisabled}
      onMouseEnter={() => {
        setHoveringCell([row, column]);
      }}
      onMouseLeave={() => {
        setHoveringCell([]);
      }}
      className={stateButton}
      onContextMenu={(e) => {
        e.preventDefault();
        flagCell(row, column);
      }}
      {...longPressEvent}
    >
      {content}
    </button>
  );
}

export default Cell;
