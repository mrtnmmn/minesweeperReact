import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faLandMineOn } from "@fortawesome/free-solid-svg-icons";

import "../App.css";
import "../Css/Cell.css";
import useLongPress from "./customHooks/useLongPress";

function Cell(props) {
  const n = props.num;
  const status = props.status;
  const row = props.row;
  const column = props.column;
  const setHoveringCell = props.setHoveringCell;
  const flagCell = props.flagCell;
  const endGame = props.endGame;
  const cellColors = props.cellColors

  const [stateButton, setStateButton] = useState("buttons unclicked");
  const [content, setContent] = useState("X");
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(props.status);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    console.log(cellColors)
    console.log(cellColors.buttons)
  }, [cellColors])

  useEffect(() => {
    if (status === 1) {
      setColor();
      setIsDisabled(true);
      changeChangeContent();
    } else if (status === 2) {
      setStateButton(cellColors.buttons  + " " + cellColors.flag);
      setContent(<FontAwesomeIcon icon={faLandMineOn} />);
    } else if (status === 0) {
      setStateButton(cellColors.buttons + " " + cellColors.unclicked);
      setIsDisabled(false);
      setContent("X");
    }
  }, [status]);

  useEffect(() => {
    if (endGame) {
      setIsDisabled(true);
    }
  }, [endGame]);

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
        setStateButton(cellColors.buttonClicked + " " + cellColors.one);
        break;
      case 2:
        setStateButton(cellColors.buttonClicked + " " + cellColors.two);
        break;
      case 3:
        setStateButton(cellColors.buttonClicked + " " + cellColors.three);
        break;
      case 4:
        setStateButton(cellColors.buttonClicked + " " + cellColors.four);
        break;
      case 5:
        setStateButton(cellColors.buttonClicked + " " + cellColors.five);
        break;
      case 6:
        setStateButton(cellColors.buttonClicked + " " + cellColors.six);
        break;
      case 9:
        setStateButton(cellColors.buttonClicked + " " + cellColors.bomb);
        break;
      default:
        setStateButton(cellColors.buttonClicked + " " + cellColors.zero);
        break;
    }
  }

  const onLongPress = () => {
    console.log("long pressed");
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
