import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SingleProductInfo from '../../components/SingleProductInfo/SingleProductInfo';
import SingleProductSlider from '../../components/SingleProductSlider/SingleProductSlider';
import BagItem from '../../components/BagItem/BagItem';

const Api = require('../../config/apiConfig');
const image_profile = require('../../assets/bag.png');

require('./SingleProduct.css');

class SingleProduct extends Component {
    state={
        bag: [],
        related:[],
        like: false,
        cart: false
    }

    componentDidMount(){
        let slug = this.props.match.params.name;
        let model = this.props.match.params.model;

        fetch(`${Api.config.url}/api/bags/${slug}/${model}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            this.handleInitialLikeHeartItemSP(result.bag._id)
            this.handleInitialCartItemSP(result.bag._id)
            this.setState({bag: result.bag, related: result.related});
        })
    }

        /*Heart Refactorizado*/

        handleInitialLikeHeartItemSP = async (id) => {
            let response = await this.props.handleInitialLikeHeart(id);
            this.setState({like: response});
        }
    
        handleLikeHeartItem = async (id, actual) => {
            let response = await this.props.handleLikeHeart(id, actual);
            console.log('heart: ',response);
            this.setState({like: response});
        }
    
        /*Heart Refactorizado*/
    
        /*Cart Refactorizado*/
    
        handleInitialCartItemSP = (e, id, actual) => {
            let response = this.props.handleInitialCart(e, id, actual);
            this.setState({cart: response})
        }
    
        handleCartItem = (e, id, actual) => {
            let response = this.props.handleCart(e, id, actual);
            this.setState({cart: response});
        }
    
        /*Cart Refactorizado*/

    render(){

        let related;

        /*QUITAR LO DE IMG EN DEV AL TERMINAR EL PROCESO*/
        let img_p;
        
        if(this.state.related.length !== 0){
            related = this.state.related.map(bag => {

                if(process.env.NODE_ENV === 'development'){
                    img_p = image_profile
                }else{
                    img_p = bag.image_profile.url
                }

                return <BagItem
                    key={bag._id}
                    id={bag._id}
                    url={img_p}
                    name={bag.name}
                    slug={bag.slug}
                    model={bag.model[0]}
                    price={bag.price}
                    viewMore={this.viewMore}

                    handleLikeHeart={this.props.handleLikeHeart}
                    handleInitialLikeHeart={this.props.handleInitialLikeHeart}
                    handleCart={this.props.handleCart}
                    handleInitialCart={this.props.handleInitialCart}/>
            })
        }

        return(
            <div className='single-product'>
                <div className="single-product-container">
                    <div className="single-product-slider">
                        <SingleProductSlider
                            imgs={this.state.bag.images}
                            img_profile={this.state.bag.image_profile}/>
                    </div>
                    <div className="single-product-info">
                        <SingleProductInfo
                            bag={this.state.bag}
                            like={this.state.like}
                            cart={this.state.cart}

                            handleLikeHeart={this.handleLikeHeartItem}
                            handleCart={this.handleCartItem}/>
                    </div>
                </div>
                <div className='container'>
                    <div className="bag-related-items">
                        {related}
                    </div>
                </div>
            </div>
        )
    }
} 

export default withRouter(SingleProduct);