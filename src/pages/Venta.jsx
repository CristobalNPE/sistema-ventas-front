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
        discount: 0,
        paymentMethod: "Efectivo",
        document: "Boleta",
        transaction: "Venta"
    })
    const [isDiscountApplied, setIsDiscountApplied] = useState(false)

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
        setVenta(prevState => (
            {
                ...prevState,
                total: sum
            }
        ))
    }

    function applyDiscount() {
        setIsDiscountApplied(true)
        setVenta(prevState => (
            {
                ...prevState,
                discount: Math.ceil(prevState.total * 0.25)
            }
        ))
    }

    function removeDiscount() {
        setIsDiscountApplied(false)
        setVenta(prevState => (
            {
                ...prevState,
                discount: 0
            }
        ))
    }


    useEffect(() => {
        setTotal()
        setVenta(prevState => (
            {
                ...prevState,
                items: productsList
            }
        ))
        if (isDiscountApplied) applyDiscount()

    }, [productsList]);


    useEffect(() => {
        console.log(venta)
    },);


    return (
        <div className="main-container">
            <div>
                <h1>Nueva Venta</h1>
                <CodeReader addProduct={addProduct} inventory={inventory}/>
                <ItemList addProduct={addProduct} removeProduct={removeProduct} productsList={productsList}
                          getProductById={getProductById}/>
            </div>


            <div className="panel">
                <div className="panel__options">
                    <div className="options">
                        <div className="radio">
                            <input className="radio__input" name="metodo-pago" id="debito" type="radio"/>
                            <label className="radio__label" htmlFor="debito">Débito</label>
                            <input className="radio__input" name="metodo-pago" id="credito" type="radio"/>
                            <label className="radio__label" htmlFor="credito">Crédito</label>
                            <input className="radio__input" name="metodo-pago" id="efectivo" type="radio"/>
                            <label className="radio__label" htmlFor="efectivo">Efectivo</label>

                        </div>
                        <div className="radio">
                            <input className="radio__input" name="tipo-boleta" id="boleta" type="radio"/>
                            <label className="radio__label" htmlFor="boleta">Boleta</label>
                            <input className="radio__input" name="tipo-boleta" id="factura" type="radio"/>
                            <label className="radio__label" htmlFor="factura">Factura</label>

                        </div>
                    </div>


                    {!isDiscountApplied ?
                        <button onClick={applyDiscount} className="btn">Aplicar Descuento <DiscountIcon
                            fontSize={"small"}/></button> :
                        <button onClick={removeDiscount} className="btn">Quitar Descuento <DiscountIcon
                            fontSize={"small"}/></button>}

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
                        <span className="panel-data">${venta.discount}</span>
                    </div>
                    <div className="result total">
                        <h1>TOTAL: </h1>
                        <span className="panel-data big">${venta.total - venta.discount}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Venta;
