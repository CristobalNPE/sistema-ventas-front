import React from 'react';
import '../styles/Item.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Item = (props) => {

    function increaseAmount() {
        const product = props.getProductById(props.id)
        props.addProduct(product)
    }

    function decreaseAmount() {
        const product = props.getProductById(props.id)
        props.removeProduct(product)
    }


    return (
        <tr className="item">
            <td className="item__id">{props.id}</td>
            <td className="item__name">{props.name}</td>
            <td className="item__price">${props.price}</td>
            <td className="item__amount">
                {props.amount}
                <div className="amount-buttons">
                    <button onClick={increaseAmount} className="amount-button plus"><AddIcon fontSize={"small"}/>
                    </button>
                    <button onClick={decreaseAmount} className="amount-button minus"><RemoveIcon fontSize={"small"}/>
                    </button>
                </div>

            </td>
            <td className="item__total">${props.price * props.amount}</td>
        </tr>
    );
};

export default Item;
