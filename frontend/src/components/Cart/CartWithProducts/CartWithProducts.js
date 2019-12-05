import React from 'react';
import CartSummary from '../CartSummary/CartSummary';

require('./CartWithProducts.css')

const CartWithProducts = (props) => {
    return(
        <div className='container cart-with-products'>
            <div className='cart-list-container'>

            </div>
            <div className='cart-summary-container'>
                <CartSummary />
            </div>
        </div>
    )
}

export default CartWithProducts;