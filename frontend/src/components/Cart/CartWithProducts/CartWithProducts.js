import React from 'react';

import CartList from '../CartList/CartList';
import CartSummary from '../CartSummary/CartSummary';

require('./CartWithProducts.css')

const CartWithProducts = (props) => {
    return(
        <div className='container cart-with-products'>
            <div className='cart-list-container'>
                <CartList
                />
            </div>
            <div className='cart-summary-container'>
                <CartSummary 
                shippingValue={28}
                priceTotal={200}/>
            </div>
        </div>
    )
}

export default CartWithProducts;