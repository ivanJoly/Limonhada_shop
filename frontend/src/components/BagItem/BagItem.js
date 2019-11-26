import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MdHeart from 'react-ionicons/lib/MdHeart';
import MdHeartOutline from 'react-ionicons/lib/MdHeartOutline';
import IosCartOutline from 'react-ionicons/lib/IosCartOutline';


require('./BagItem.css');

class BagItem extends Component {
    state={
        image_loaded: false,
        like: false,
        cart: false
    }

    componentDidMount(){
        this.handleInitialLikeHeart(this.props.id);
        this.handleInitialCart(this.props.id);
    }

    handleImageLoaded = () => {
        this.setState({image_loaded: true})
    }

    handleInitialLikeHeart = (id) => {
        if(localStorage.getItem(id)){
            this.setState({like: true})
        }
    }

    handleRemoveLikeHeart = (id) => {
        localStorage.removeItem(id);
        this.setState({like: false});
    }

    handleAddLikeHeart = (id) => {
        localStorage.setItem(id, true);
        this.setState({like: true});
    }

    handleLikeHeart = (id) => {
        if(this.state.like){
            this.handleRemoveLikeHeart(id);
        }else{
            this.handleAddLikeHeart(id);
        }
    }

    handleInitialCart = (id) => {
        let cart = localStorage.getItem('cart');
        if(cart){
            let okCart = JSON.parse(cart);
            if (okCart.find(el => el === id)){
                this.setState({cart: true});
            }
        }else{
            let arr = []
            localStorage.setItem('cart', JSON.stringify(arr));
        }
    }

    handleCartItem = (e, id, actual) => {
        let response = this.props.handleCart(e, id, actual);
        this.setState({cart: response});
    }

    handleRouteCart = (e) => {
        this.props.history.push({
            pathname: `/cart`
          })
          e.stopPropagation()
    }

    handleRouteItem = (slug, model) => {
        this.props.history.push({
            pathname: `/bag/${slug}/${model.toLowerCase()}`
          })
    }

    render(){
        let style = []
        style.push('bag-item-container');
        if(this.state.image_loaded){
            style.push('loaded');
        }
        return(
            <div className={style.join(' ')}>
                <div className='bag-item-img' onClick={() => this.handleRouteItem(this.props.slug, this.props.model)}>
                    <img 
                        src={this.props.url}
                        alt={this.props.name}
                        onLoad={this.handleImageLoaded}/>
                    {
                        this.state.cart ?
                        (
                        <div className="button add-cart active" onClick={(e) => this.handleRouteCart(e)}>
                            <span>
                                <IosCartOutline fontSize="18px"/>
                            </span>
                        </div>
                        )
                        :
                        (
                        <div className="button add-cart" onClick={(e) => this.handleCartItem(e, this.props.id, this.state.cart)}>
                            <span>
                                Add to Cart
                            </span>
                        </div>
                        )
                    }
                </div>
                <div className='bag-item-desc'>
                    <div className="top">
                        <div className="name">{this.props.name}</div>
                        <div className="model" >
                            {
                                this.state.like 
                                ? 
                                <MdHeart color="#ec5e54" onClick={() => this.handleLikeHeart(this.props.id)}/> 
                                : 
                                <MdHeartOutline onClick={() => this.handleLikeHeart(this.props.id)}/>
                            }
                        </div>
                        <span className="line"></span>
                    </div>
                    <div className="bottom">
                        <div className="price"><span>${this.props.price}.00</span></div>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BagItem);
