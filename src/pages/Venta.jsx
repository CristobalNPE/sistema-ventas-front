import React, {useEffect, useState} from 'react';
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

    const [inventory, setInventory] = useState(ProductsData)

    const [productsList, setProductsList] = useState([])

    function getProductById(id) {
        return inventory.find(p => p.id == id);
    }

    function addProduct(product) {
        const exist = productsList.find(p => p.id === product.id)
        if (exist) {
            setProductsList(
                productsList.map(prod => prod.id === product.id ? {...exist, amount: exist.amount + 1} : prod)
            )
        } else {
            setProductsList([...productsList, {...product, amount: 1}])
        }
    }

    function removeProduct(product) {
        const exist = productsList.find(p => p.id === product.id)
        if (exist.amount === 1) {
            setProductsList(
                productsList.filter(prod => prod.id !== product.id)
            )
        } else {
            setProductsList(
                productsList.map(prod => prod.id === product.id ? {...exist, amount: exist.amount - 1} : prod)
            )
        }
    }

    function setTotal() {
        const sum = productsList.reduce((a, c) => a + c.amount * c.precio, 0)
        console.log("SUM? " + sum)
        setVenta(prevState => (
            {
                ...prevState,
                total: sum
            }
        ))
    }


    useEffect(() => {
        setTotal()
    }, [productsList]);


    //*----------------------------


    return (
        <div className="main-container">
            <h1>Nueva Venta</h1>
            <CodeReader addProduct={addProduct} inventory={inventory}/>
            <ItemList addProduct={addProduct} removeProduct={removeProduct} productsList={productsList}
                      getProductById={getProductById}/>


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
                        <span className="panel-data">${Math.ceil(venta.total - (venta.total * 0.19))}</span>
                    </div>

                    <div className="result">
                        <h2>IVA: </h2>
                        <span className="panel-data">${Math.ceil(venta.total * 0.19)}</span>
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
