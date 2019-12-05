import React from 'react';

require('./CartSummary.css')

const CartSummary = (props) => {
    return(
        <div className='cart-summary'>
            <div className="order-summary">
                <h3>Order Summary</h3>
            </div>
            <div className="line-separator"></div>
            <div className="subtotal-container">
                <span>Subtotal</span>
                <span>$200</span>
            </div>
            <div className="shipping-container">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div className="tax-container">
                <span>Taxes</span>
                <span>1.5%</span>
            </div>
            <div className="price-container">
                <span>Estimated Total</span>
                <span>$205</span>
            </div>
            <button>Buy Now!</button>
        </div>
    )
}

export default CartSummary;