import "../Css/Sidebar.css";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

function Sidebar(props) {
  const rows = props.rows;
  const columns = props.columns;
  const setRows = props.setRows;
  const setColumns = props.setColumns;
  const lightMode = props.lightMode
  const setLightMode = props.setLightMode

  const [gameDifficulty, setGameDifficulty] = useState(0)
  const [checked, setChecked] = useState([true, false, false, false])

  useEffect(() => {
    switch (gameDifficulty){
      case '0': 
        setRows(8)
        setColumns(8)
        break
      case '1': 
        setRows(14)
        setColumns(18)
        break
      case '2':
        setRows(20)
        setColumns(24) 
        break 
      case '3':
        break
    }
  }, [gameDifficulty])

  useEffect(() => {
    console.log('LightMode: ' + lightMode)
  }, [lightMode])

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#00cfa3",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rows") if (value >= 8) setRows(value)
    if (name === "columns") if (value >= 8) setColumns(value)
    if (name === "difficulty") {
      setGameDifficulty(value)
      changeCheckedButtonsStatus(value)
    }
    if (name === "nightModeSwitch") { 
      console.log('switch controller'); 
      if (lightMode === 0) {
        console.log('Dark to light'); 
        setLightMode(1)
      } else {
        setLightMode(0)
      }
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const changeCheckedButtonsStatus = (value) => {
    let mockedCheckedArray = []

    for (let i = 0; i < checked.length; i++) {
      console.log('Value:' + value + ', I:' + i)
      if (parseInt(value) === parseInt(i)) {
        console.log('same')
        mockedCheckedArray.push(true)
      }
      else {
        mockedCheckedArray.push(false)
      }
    }
    console.log(mockedCheckedArray)
    setChecked([...mockedCheckedArray])
  }

  const manualSizeChange = () => {
    setGameDifficulty(3)
    changeCheckedButtonsStatus(3)      
  }

  return (
    <div className="sideBarMainDiv">
      <div className="divDifficultyButtons">
        <label>
          <Checkbox
            checked={checked[0]}
            onChange={handleChange}
            name="difficulty"
            value={0}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Easy
        </label>
        <label>
          <Checkbox
            checked={checked[1]}
            onChange={handleChange}
            name="difficulty"
            value={1}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Medium
        </label>
        <label>
          <Checkbox
            checked={checked[2]}
            onChange={handleChange}
            name="difficulty"
            value={2}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Difficult
        </label>
        <label>
          <Checkbox
            checked={checked[3]}
            onChange={handleChange}
            name="difficulty"
            value={3}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Personalized
        </label>
      </div>
      <form className="formSidebar" onSubmit={handleSubmit}>
        <div>
          <button
            onClick={() => {
              setRows(rows + 1);
              manualSizeChange()
            }}
            className="arrowButtons"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            onClick={() => {
              setRows(rows - 1);
              manualSizeChange()
            }}
            className="arrowButtons"
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <label className="labelSidebar">

            <input
              type="text"
              name="rows"
              value={rows}
              className="inputSidebar"
              onChange={handleChange}
            />
            Rows:&nbsp;
          </label>
        </div>
        <div>
          <button
            onClick={() => {
              setColumns(columns + 1);
              manualSizeChange()
            }}
            className="arrowButtons"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            onClick={() => {
              setColumns(columns - 1);
              manualSizeChange()
            }}
            className="arrowButtons"
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <label className="labelSidebar">
            <input
              type="text"
              name="columns"
              value={columns}
              className="inputSidebar"
              onChange={handleChange}
              label="Easy"
            />
            Columns:&nbsp;
          </label>
        </div>

      </form>

      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch 
              sx={{ m: 1 }} 
              checked={lightMode}
              onChange={handleChange}
              name="nightModeSwitch"
            />
          }
          label="Night mode"
        />
      </FormGroup>
    </div>
  );
}

export default Sidebar;
