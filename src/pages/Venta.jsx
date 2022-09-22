import React, {useEffect, useState} from 'react';
import '../styles/Pages.css';
import CodeReader from '../components/CodeReader.jsx';
import ProductsData from '../constants/productsData.js';
import ItemList from '../components/ItemList.jsx';
import DiscountIcon from '@mui/icons-material/Discount';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Modal from '../components/Modal.jsx'


const Venta = () => {

    const ventaInitialState = {
        id: 0,
        seller: "VENDEDOR",
        items: [],
        total: 0,
        discount: 0,
        paymentMethod: "Sin Definir",
        document: "Sin Definir",
        transaction: "Venta"
    }

    const [venta, setVenta] = useState(ventaInitialState)
    const [isDiscountModalVisible, setIsDiscountModalVisible] = useState(false)
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

    function showDiscountModal() {
        setIsDiscountModalVisible(true)
    }

    function applyDiscount(discount) {


        if (discount.isPercentage) {
            const totalDiscount = Math.ceil(((venta.total * discount.amount) / 100))

            setVenta(prevState => (
                {
                    ...prevState,
                    discount: totalDiscount,
                }
            ))

        } else {
            setVenta(prevState => (
                {
                    ...prevState,
                    discount: discount.amount,
                }
            ))
        }
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

    function handleChange(event) {
        const {value, name} = event.target

        setVenta(prevState => (
            {
                ...prevState,
                [name]: value
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
                            <input
                                className="radio__input"
                                name="paymentMethod"
                                id="Débito"
                                type="radio"
                                onChange={handleChange}
                                checked={venta.paymentMethod === "Débito"}
                                value="Débito"
                            />
                            <label className="radio__label" htmlFor="Débito">Débito</label>

                            <input
                                className="radio__input"
                                name="paymentMethod"
                                id="Crédito"
                                type="radio"
                                onChange={handleChange}
                                checked={venta.paymentMethod === "Crédito"}
                                value="Crédito"
                            />
                            <label className="radio__label" htmlFor="Crédito">Crédito</label>

                            <input
                                className="radio__input"
                                name="paymentMethod"
                                id="Efectivo"
                                type="radio"
                                onChange={handleChange}
                                checked={venta.paymentMethod === "Efectivo"}
                                value="Efectivo"
                            />
                            <label className="radio__label" htmlFor="Efectivo">Efectivo</label>

                        </div>


                        <div className="radio">
                            <input
                                className="radio__input"
                                name="document"
                                id="Boleta"
                                type="radio"
                                onChange={handleChange}
                                checked={venta.document === "Boleta"}
                                value="Boleta"
                            />
                            <label className="radio__label" htmlFor="Boleta">Boleta</label>

                            <input
                                className="radio__input"
                                name="document"
                                id="Factura"
                                type="radio"
                                onChange={handleChange}
                                checked={venta.document === "Factura"}
                                value="Factura"
                            />
                            <label className="radio__label" htmlFor="Factura">Factura</label>

                        </div>
                    </div>


                    {!isDiscountApplied ?
                        <button onClick={showDiscountModal} className="btn">Aplicar Descuento <DiscountIcon
                            fontSize={"small"}/></button> :
                        <button onClick={removeDiscount} className="btn">Quitar Descuento <CancelOutlinedIcon
                            color={"error"}/></button>}

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

                <div className="panel__buttons">
                    <button
                        onClick={() => {
                            setVenta(ventaInitialState);
                            setProductsList([])
                        }}
                        className="btn btn-secondary">Cancelar Venta
                    </button>

                    <button className="btn btn-secondary">Descargar Cotización</button>

                    <button onClick={() => alert(JSON.stringify(venta))}
                            className="btn btn-important">Ingresar Venta
                    </button>
                </div>

            </div>

            <Modal
                total={venta.total}
                applyDiscount={applyDiscount}
                venta={venta}
                setVenta={setVenta}
                isDiscountApplied={isDiscountApplied}
                setIsDiscountApplied={setIsDiscountApplied}

                isDiscountModalVisible={isDiscountModalVisible}
                setIsDiscountModalVisible={setIsDiscountModalVisible}
            />

        </div>
    );
};

export default Venta;