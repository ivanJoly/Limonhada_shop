import React from 'react';

require('./CartSummary.css')

const CartSummary = (props) => {
    let subtotal = 0;
    let shipping = 0;
    let tax = 1.5;
    let totalPrice;

    if(props.cart.length != 0){
        props.cart.map(bag => {
            subtotal = subtotal + (bag.price * bag.quantity)
        });

        if(subtotal > 600){
            shipping = 0;
        }else{
            shipping = 50;
        }

        totalPrice = (subtotal + shipping) * tax;
    }

    return(
        <div className='cart-summary'>
            <div className="order-summary">
                <h3>Order Summary</h3>
            </div>
            <div className="line-separator"></div>
            <div className="subtotal-container">
                <span>Subtotal</span>
                <span className='subtotal-value'>${subtotal}</span>
            </div>
            <div className="shipping-container">
                <span>Shipping</span>
                <span className='shipping-value'>
                    {shipping == 0 ? `Free` : `$${shipping}`}
                </span>
            </div>
            <div className="tax-container">
                <span>Taxes</span>
                <span className='tax-value'>{tax}%</span>
            </div>
            <div className="price-container">
                <span>Estimated Total</span>
                <span className='price-total'>${totalPrice}</span>
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