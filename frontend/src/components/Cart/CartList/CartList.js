import React from 'react';
import CartListItem from '../CartListItem/CartListItem';
require('./CartList.css');

const CartList = (props) => {
    let cart;
    return(
        <table className='cart-list-table'>
            <thead>
                <tr>
                    <th className='head-img'></th>
                    <th className='head-name'>Name</th>
                    <th className='head-quantity'>Quantity</th>
                    <th className='head-price'>Price</th>
                    <th className='head-remove'></th>
                </tr>
            </thead>
            <CartListItem
            handleCartSL={props.handleCartWP}
            upSL={props.upWP}
            downSL={props.downWP}
            cartL={props.cartWP}/>
        </table>
    )
}

export default CartList;