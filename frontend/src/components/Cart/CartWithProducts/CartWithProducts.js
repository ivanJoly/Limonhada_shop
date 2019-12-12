import React from 'react';

import CartList from '../CartList/CartList';
import CartSummary from '../CartSummary/CartSummary';

require('./CartWithProducts.css')

const CartWithProducts = (props) => {
    return(
        <div className='container cart-with-products-container'>
            <div className='cart-title'>
                <h2 className='heading'>Shopping Cart</h2>
                <div className='line-separator'></div>
            </div>
            <div className='cart-with-products'>
                <div className='cart-list-container'>
                    <CartList
                    handleCartWP={props.handleCart}
                    upWP={props.up}
                    downWP={props.down}
                    cartWP={props.cart}/>
                </div>
                <div className='cart-summary-container'>
                    <CartSummary
                    handleModal={props.handleModal}
                    cart={props.cart}/>
                </div>
            </div>
            
        </div>
    )
}

export default CartWithProducts;