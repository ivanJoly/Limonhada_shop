import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SingleProductInfo from '../../components/SingleProductInfo/SingleProductInfo';
import SingleProductSlider from '../../components/SingleProductSlider/SingleProductSlider';
import BagItem from '../../components/BagItem/BagItem';
import Loading from '../../components/Loading/Loading'

const Api = require('../../config/apiConfig');

require('./SingleProduct.css');

class SingleProduct extends Component {
    state={
        bag: [],
        related:[],
        relatedBolean: false,
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
            this.handleInitialLikeHeartItemSP(result.bag._id)
            this.handleInitialCartItemSP(result.bag._id)
            this.setState({bag: result.bag, related: result.related, relatedBolean: result.relatedBolean});
        })
    }

        /*Heart Refactorizado*/

        handleInitialLikeHeartItemSP = async (id) => {
            let response = await this.props.handleInitialLikeHeart(id);
            this.setState({like: response});
        }
    
        handleLikeHeartItem = async (id, actual) => {
            let response = await this.props.handleLikeHeart(id, actual);

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
        
        if(this.state.related.length !== 0){
            related = this.state.related.map(bag => {

                return <BagItem
                    key={bag._id}
                    id={bag._id}
                    url={bag.image_profile.url}
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
                        {
                            this.state.bag.length == 0 ?
                            <Loading colorSecondary={true}/>
                            :
                            <SingleProductInfo
                            bag={this.state.bag}
                            like={this.state.like}
                            cart={this.state.cart}

                            handleLikeHeart={this.handleLikeHeartItem}
                            handleCart={this.handleCartItem}/>
                        }
                        
                    </div>
                </div>
                {
                    this.state.relatedBolean ?
                    <div className='container'>
                        <div className="bag-related-title">
                            <h2 className='heading'>Related products</h2>
                            <div className='line-separator'></div>
                        </div>
                        <div className="bag-related-items">
                            {
                                this.state.bag.length == 0 ?
                                <Loading colorSecondary={true}/>
                                :
                                related
                            }
                        </div>
                    </div>
                    :
                    null
                }
                
            </div>
        )
    }
} 

export default withRouter(SingleProduct);