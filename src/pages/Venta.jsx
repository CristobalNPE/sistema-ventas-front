import React, {useState} from 'react';
import '../styles/Pages.css';
import CodeReader from '../components/CodeReader.jsx';

import ProductsData from '../constants/productsData.js';
import ItemList from '../components/ItemList.jsx';
import DiscountIcon from '@mui/icons-material/Discount';

const Venta = () => {

    const [venta, setVenta] = useState({
        id: 0,
        seller: "VENDEDOR",
        items: [],
        total: 0,
        transaction: "Venta"
    })
    //*----------------------------
    const [productCode, setProductCode] = useState();

    function handleChange(event) {
        const {name, value} = event.target
        setProductCode(value)
    }

    function handleCode() {

        const item = ProductsData.filter(i => i.id == productCode)
        if (item.length === 0) return;

        setVenta(prevState => ({
            ...prevState,
            items: [...prevState.items, item[0]] //Is not adding the very first item to the array!!!!
        }))

        console.log(venta)
    }
    //*----------------------------


    function totalHandler(totalAmount) {
        console.log("TOTAL AMOUNT: " + totalAmount)

        setVenta(prevState => ({
            ...prevState,
            total: totalAmount
        }))
    }


    return (
        <div className="main-container">
            <h1>Nueva Venta</h1>
            <CodeReader productCode={productCode} handleChange={handleChange} handleCode={() => handleCode()}/>
            <ItemList items={venta.items} totalHandler={totalHandler}/>


            <div className="panel">
                <div className="panel__options">
                    <div className="options">
                        <div className="payment">
                            <label htmlFor="debito">Débito</label>
                            <input name="metodo-pago" id="debito" type="radio"/>
                            <label htmlFor="credito">Crédito</label>
                            <input name="metodo-pago" id="credito" type="radio"/>
                            <label htmlFor="efectivo">Efectivo</label>
                            <input name="metodo-pago" id="efectivo" type="radio"/>
                        </div>
                        <div className="recipe">
                            <label htmlFor="boleta">Boleta</label>
                            <input name="tipo-boleta" id="boleta" type="radio"/>
                            <label htmlFor="factura">Factura</label>
                            <input name="tipo-boleta" id="factura" type="radio"/>
                        </div>
                    </div>

                    <button className="btn">Aplicar Descuento <DiscountIcon fontSize={"small"}/></button>

                </div>
                <div className="panel__results">
                    <div className="result">
                        <h2>Neto: </h2>
                        <span className="panel-data">$10990</span>
                    </div>

                    <div className="result">
                        <h2>IVA: </h2>
                        <span className="panel-data">$1990</span>
                    </div>
                    <div className="result">
                        <h2>Descuento: </h2>
                        <span className="panel-data">$0</span>
                    </div>
                    <div className="result total">
                        <h1>TOTAL: </h1>
                        <span className="panel-data big">${venta.total}</span>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default Venta;
