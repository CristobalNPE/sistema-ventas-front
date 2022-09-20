import React, {useEffect, useState} from 'react';
import '../styles/ItemList.css'
import Item from '../components/Item.jsx'

const ItemList = (props) => {


    function itemsElements(){
        return props.productsList.map(item =>(
            <Item
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.precio}
                stock={item.stock}
                amount={item.amount}

                addProduct={props.addProduct}
                removeProduct={props.removeProduct}
                getProductById={props.getProductById}
            />
        ))
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
