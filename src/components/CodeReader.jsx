import React, {useState} from 'react';
import '../styles/CodeReader.css'

const CodeReader = (props) => {



    function handleSubmit(event) {
        event.preventDefault()
        console.log("PRODUCT CODE: " + props.productCode)
        props.handleCode()
    }


    return (
        <div className="code-reader">
            <label htmlFor="code">Código del producto :</label>
            <input autoFocus onChange={props.handleChange} value={props.productCode} name="code" id="code" type="text"/>
            <button onClick={handleSubmit}>HOLA</button>
        </div>
    );
};

export default CodeReader;
