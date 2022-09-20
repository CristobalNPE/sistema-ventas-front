import React, {useEffect, useState} from 'react';
import '../styles/CodeReader.css'
import SearchIcon from '@mui/icons-material/Search';

const CodeReader = (props) => {

    const [productCode, setProductCode] = useState()

    function handleChange(event) {
        const {value} = event.target
        setProductCode(value)
    }

    function findProduct() {
        const exist = props.inventory.find(p => p.id == productCode)
        if (exist) {
            props.addProduct(exist)
        }
    }

    useEffect(() => {
        console.log("PRODUCT CODE: "+productCode)
    }, [productCode]);


    return (
        <div className="code-reader">
            <label htmlFor="code">Código del producto :</label>
            <input
                autoFocus
                onChange={handleChange}
                value={productCode}

                id="productCode"
                type="text"
            />
            <button
                className="btn"
                onClick={findProduct}
            >
                <SearchIcon fontSize={"small"}/>
            </button>
        </div>
    );
};

export default CodeReader;
