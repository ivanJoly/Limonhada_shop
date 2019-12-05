import React from 'react';
import { Link } from 'react-router-dom';

require('./CartWithoutProducts.css');

const CartWithoutProducts = (props) => {
    return(
        <div className='container cart-without-products'>
            <h2 className='heading'>Your cart its empty!</h2>
            <div className='line-separator'></div>
             <p className='sub-heading'>Soon, click here and go looking for the best bags, find your style!</p>
            <Link to='/shop'>Shop</Link>
        </div>
    )
}

export default CartWithoutProducts;