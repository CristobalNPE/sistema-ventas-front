import React, {useState} from 'react';
import '../styles/Modal.css'

const Modal = (props) => {

    const [discountType, setDiscountType] = useState({
        type: "porcentaje"
    })
    const [discountAmount, setDiscountAmount] = useState(0)
    const [discountPercent, setDiscountPercent] = useState(0)

    function handleDiscountType(event) {
        const {value} = event.target
        setDiscountType({type: value})
    }

    function handleChange(event) {
        const {value} = event.target
        if (discountType.type === "monto-fijo") {
            setDiscountAmount(value)
        } else {
            setDiscountPercent(value)
            setDiscountAmount(Math.ceil(((props.total * value) / 100)))
        }
    }

    return (
        <div className={`modal ${!props.isDiscountModalVisible && `hidden`}`}>
            <h1>Aplicar Descuento</h1>
            <div className="radio">
                <input
                    onChange={handleDiscountType}
                    value="porcentaje"
                    checked={discountType.type === "porcentaje"}
                    className="radio__input"
                    name="discount-type"
                    id="porcentaje"
                    type="radio"
                />
                <label className="radio__label" htmlFor="porcentaje">Porcentaje</label>

                <input
                    onChange={handleDiscountType}
                    value="monto-fijo"
                    checked={discountType.type === "monto-fijo"}
                    className="radio__input"
                    name="discount-type"
                    id="monto-fijo"
                    type="radio"
                />
                <label className="radio__label" htmlFor="monto-fijo">Monto Fijo</label>
            </div>

            {discountType.type === "monto-fijo" ?
                <div className="input-text">
                    <label className="input-text__label" htmlFor="monto">Monto:</label>
                    <input
                        className="input-text__input"
                        type="text"
                        id="monto"
                        name="discountAmount"
                        value={discountAmount}
                        onChange={handleChange}
                    />
                </div> :
                <div className="input-text">
                    <label className="input-text__label" htmlFor="porcentaje">Porcentaje:</label>
                    <select
                        className="input-text__input"
                        id="porcentaje"
                        name="porcentaje"
                        value={discountPercent}
                        onChange={handleChange}
                    >
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                    </select>
                </div>}
            {/*<h2>Discount(test): ${discountAmount}</h2>*/}
            <h2>Total con descuento: ${props.total - discountAmount}</h2>


            <div className="buttons">
                <button onClick={() => props.setIsDiscountModalVisible(false)} className="btn btn-secondary">Descartar
                </button>
                <button onClick={() => props.applyDiscount(discountAmount, props.setIsDiscountModalVisible(false))}
                        className="btn">Aplicar
                </button>
            </div>
        </div>
    );
};

export default Modal;
