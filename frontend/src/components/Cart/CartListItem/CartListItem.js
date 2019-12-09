import React, { Fragment } from 'react';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';

const img_thumbail = require('../../../assets/bag.png')

const CartListItem = (props) => {
    console.log('cartListItem', props);
    let items;

    if(!props.cartL.length == 0){
        items = props.cartL.map(item => {
            return(
                <tr key={item._id}>
                    <td className='cart-thumbail'>
                        <img src={img_thumbail} alt=""/>
                    </td>
                    <td className='cart-name'>
                        <span>{item.name}</span>
                    </td>
                    <td>
                        <div className='cart-quantity'>
                            <button onClick={(e) => props.downSL(item._id)}>
                                <IosArrowBack />
                            </button>
                            <input value={item.quantity} readOnly/>
                            <button onClick={(e) => props.upSL(item._id)}>
                                <IosArrowForward />
                            </button>
                        </div>
                    </td>
                    <td className='cart-price'>
                        <span>$</span>
                        <span>{item.price}</span>
                    </td>
                    <td className='cart-remove'>
                        <IosCloseCircleOutline fontSize="28px" onClick={(e) => props.handleCartSL(e, item._id, true)}/>
                    </td>
                </tr>
            )
        })
    }
    return(
        <tbody>
            {items}
        </tbody>
    )
}

export default CartListItem;