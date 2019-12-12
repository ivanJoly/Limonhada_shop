import React from 'react';

require('./CartThank.css');

const CartThank = (props) => {
    return(
        <div className="cart-thanks-container">
            <h2>Thank you</h2>
            <h4>for your order</h4>
            <p>You made our day we hope we make yours.</p>
            <p>In the next 24 hours we will contact you to be able to agree a day of delivery of your purchase!</p>
            <p className='slogan'>Make it yours.</p>
        </div>
    )
}

export default CartThank;