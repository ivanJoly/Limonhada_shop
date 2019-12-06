import React from 'react';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';

require('./CartList.css');
const img_thumbail = require('../../../assets/bag.png');



const CartList = (props) => {
    let cart;
    return(
        <td className='cart-list-table'>
            <thead>
                <tr>
                    <th className='head-img'></th>
                    <th className='head-name'>Name</th>
                    <th className='head-quantity'>Quantity</th>
                    <th className='head-price'>Price</th>
                    <th className='head-remove'>Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='cart-thumbail'>
                        <img src={img_thumbail} alt=""/>
                    </td>
                    <td>
                        <span>Think Outside</span>
                    </td>
                    <td>
                        <div className='cart-quantity'>
                            <button>
                                <IosArrowBack />
                            </button>
                            <input name="" id=""/>
                            <button>
                                <IosArrowForward />
                            </button>
                        </div>
                    </td>
                    <td>
                        <span>$</span>
                        <span>200</span>
                    </td>
                    <td className='cart-remove'>
                        <IosCloseCircleOutline fontSize="28px"/>
                    </td>
                </tr>
            </tbody>
        </td>
    )
}

export default CartList;