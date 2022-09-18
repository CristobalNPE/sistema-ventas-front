import React, {useEffect} from 'react';
import '../styles/ItemList.css'
import Item from '../components/Item.jsx'

const ItemList = (props) => {


    function itemsElements() {
        return props.items.map(item => <Item key={item.id} id={item.id} name={item.name} price={item.precio}/>)
    }

    useEffect(() => {
        props.totalHandler(calculateTotal())
    }, [props.items]);

    function calculateTotal() {
        let total= props.items.reduce((total, item) => (total += item.precio), 0);
        console.log("Total: "+total)
        return total;
    }

    return (
        <table className="itemList">
            <tr>
                <th className="head__code">Código</th>
                <th className="head__name">Nombre</th>
                <th className="head__price">Precio</th>
                <th className="head__amount">Cantidad</th>
                <th className="head__total">Total</th>
            </tr>
            {itemsElements()}
        </table>
    );
};

export default ItemList;
