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
                <span className='subtotal-value'>$200.00</span>
            </div>
            <div className="shipping-container">
                <span>Shipping</span>
                <span className='shipping-value'>
                    {props.priceTotal > 450 ? 'Free' : `$${props.shippingValue}`}
                </span>
            </div>
            <div className="tax-container">
                <span>Taxes</span>
                <span className='tax-value'>1.5%</span>
            </div>
            <div className="price-container">
                <span>Estimated Total</span>
                <span className='price-total'>$2005.00</span>
            </div>
            <div className="line-separator top"></div>
            <div className="details">
                <h3>Shipping & taxes</h3>
                <p>The final values ​​of the shipment and taxes may be viable depending on the area in which you are.</p>
            </div>
            <div className="line-separator "></div>
            <button>Buy Now!</button>
        </div>
    )
}

export default CartSummary;