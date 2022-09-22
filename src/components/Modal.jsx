import React, {useEffect, useState} from 'react';
import '../styles/Modal.css'

const Modal = (props) => {

    const [discount, setDiscount] = useState({
        isPercentage: true,
        amount: 0
    })


    function handleDiscountType(event) {
        const {value} = event.target
        setDiscount(
            {
                isPercentage: value === "porcentaje",
                amount: 0
            }
        )
    }

    function handleDiscountAmount(event) {
        const {value} = event.target
        if (!discount.isPercentage) {
            const dscAmount = value > props.total ? props.total : value

            setDiscount(prevState => (
                {
                    ...prevState,
                    amount: dscAmount
                }
            ))
        } else {
            setDiscount(prevState => (
                {
                    ...prevState,
                    amount: value
                }
            ))
        }
    }

    useEffect(() => {
        if (props.isDiscountApplied) {
            props.applyDiscount(discount)
        }
    }, [props.venta.total]);


    return (
        <div className={`modal ${!props.isDiscountModalVisible && `hidden`}`}>
            <h1>Aplicar Descuento</h1>
            <div className="radio">
                <input
                    onChange={handleDiscountType}
                    value="porcentaje"
                    checked={discount.isPercentage}
                    className="radio__input"
                    name="discount-type"
                    id="porcentaje"
                    type="radio"
                />
                <label className="radio__label" htmlFor="porcentaje">Porcentaje</label>

                <input
                    onChange={handleDiscountType}
                    value="monto-fijo"
                    checked={!discount.isPercentage}
                    className="radio__input"
                    name="discount-type"
                    id="monto-fijo"
                    type="radio"
                />
                <label className="radio__label" htmlFor="monto-fijo">Monto Fijo</label>
            </div>

            {!discount.isPercentage ?
                <div className="input-text">
                    <label className="input-text__label" htmlFor="monto">Monto:</label>
                    <input
                        className="input-text__input"
                        type="text"
                        id="monto"
                        name="discountAmount"
                        value={discount.amount}
                        onChange={handleDiscountAmount}
                    />
                </div> :
                <div className="input-text">
                    <label className="input-text__label" htmlFor="porcentaje">Porcentaje:</label>
                    <select
                        className="input-text__input"
                        id="porcentaje"
                        name="porcentaje"
                        value={discount.amount}
                        onChange={handleDiscountAmount}
                    >
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                    </select>
                </div>}
            <h2>Total con descuento:
                ${props.total - (discount.isPercentage ? Math.ceil(((props.total * discount.amount) / 100)) : discount.amount)}</h2>


            <div className="buttons">
                <button onClick={() => props.setIsDiscountModalVisible(false)} className="btn btn-secondary">Descartar
                </button>
                <button
                    onClick={() => props.applyDiscount(discount, props.setIsDiscountApplied(true), props.setIsDiscountModalVisible(false))}
                    className="btn">Aplicar
                </button>
            </div>
        </div>
    );
};

export default Modal;