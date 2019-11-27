import React, { Component } from 'react';

import SingleProductInfo from '../../components/SingleProductInfo/SingleProductInfo';
import SingleProductSlider from '../../components/SingleProductSlider/SingleProductSlider';

require('./SingleProduct.css');

class SingleProduct extends Component {
    render(){
        return(
            <div className='single-product'>
                <div className="single-product-container">
                    <div className="single-product-slider">
                        <SingleProductSlider/>
                    </div>
                    <div className="single-product-info">
                        <SingleProductInfo/>
                    </div>
                </div>
            </div>
        )
    }
} 

export default SingleProduct;