import { useState } from "react";
import '../Css/Sidebar.css'

function Sidebar(props) {

    const rows = props.rows
    const columns = props.columns
    const setRows = props.setRows
    const setColumns = props.setColumns
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rows") setRows(value);
        if (name === "columns") setColumns(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (  
        <div className="sideBarMainDiv">
            <form className="formSidebar" onSubmit={handleSubmit}>
                <label className="labelSidebar">Rows:&nbsp;
                    <input type="text" name="rows" value={rows} className="inputSidebar" onChange={handleChange} />
                </label>
                <label className="labelSidebar">Columns:&nbsp;
                    <input type="number" name="columns" value={columns} className="inputSidebar" onChange={handleChange} />
                </label>
            </form>
        </div>
    );
}

export default Sidebar;