import React, {useState} from 'react';
import '../styles/Item.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Item = (props) => {
    const [amount, setAmount] = useState(1);

    function increaseAmount(){
        setAmount(prevAmount => prevAmount + 1);
    }
    function decreaseAmount(){
        if (amount === 0) return;
        setAmount(prevAmount => prevAmount - 1);
    }

    return (
        <tr className="item">
            <td className="item__id">{props.id}</td>
            <td className="item__name">{props.name}</td>
            <td className="item__price" >${props.price}</td>
            <td className="item__amount">
                {amount}
                <div className="amount-buttons">
                    <button onClick={increaseAmount} className="amount-button plus"><AddIcon fontSize={"small"}/></button>
                    <button onClick={decreaseAmount} className="amount-button minus"><RemoveIcon fontSize={"small"}/></button>
                </div>

            </td>
            <td className="item__total">${amount * props.price}</td>
        </tr>
    );
};

export default Item;
