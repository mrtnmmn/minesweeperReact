import '../Css/Sidebar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"

function Sidebar(props) {

    const rows = props.rows
    const columns = props.columns
    const setRows = props.setRows
    const setColumns = props.setColumns
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rows") if ( value >= 8 ) setRows(value);
        if (name === "columns") if (value >= 8) setColumns(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (  
        <div className="sideBarMainDiv">
            <form className="formSidebar" onSubmit={handleSubmit}>
                <label className="labelSidebar">Rows:&nbsp;
                    <input type="text" name="rows" value={rows} className="inputSidebar" onChange={handleChange} />
                    <button onClick={() => {setRows(rows+1)}} className='arrowButtons'>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button onClick={() => {setRows(rows-1)}} className='arrowButtons'>
                        <FontAwesomeIcon icon={faArrowDown} /> 
                    </button>
                </label>
                <label className="labelSidebar">Columns:&nbsp;
                    <input type="text" name="columns" value={columns} className="inputSidebar" onChange={handleChange} />
                    <button onClick={() => {setColumns(columns+1)}} className='arrowButtons'>
                        <FontAwesomeIcon icon={faArrowUp} /> 
                    </button>
                    <button onClick={() => {setColumns(columns - 1)}} className='arrowButtons'>
                        <FontAwesomeIcon icon={faArrowDown} /> 
                    </button>
                </label>
            </form>
        </div>
    );
}

export default Sidebar;