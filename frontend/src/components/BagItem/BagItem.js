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
        this.handleInitialLikeHeartItem(this.props.id);
        this.handleInitialCartItem(this.props.id);
    }

    handleImageLoaded = () => {
        this.setState({image_loaded: true})
    }

    /*HEART*/

    handleInitialLikeHeartItem = async (id) => {
        let response = await this.props.handleInitialLikeHeart(id);
        console.log('response', response);
        this.setState({like: response});
    }

    handleLikeHeartItem = async (id, actual) => {
        let response = await this.props.handleLikeHeart(id, actual);
        console.log('response', response);
        this.setState({like: response});
    }

    /*HEART*/

    /*Cart Refactorizado*/

    handleInitialCartItem = (e, id, actual) => {
        let response = this.props.handleInitialCart(e, id, actual);
        this.setState({cart: response})
    }

    handleCartItem = (e, id, actual) => {
        let response = this.props.handleCart(e, id, actual);
        this.setState({cart: response});
    }

    /*Cart Refactorizado*/

    /*Handle Routes*/

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

    /*Handle Routes*/

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
                                <MdHeart color="#ec5e54" onClick={() => this.handleLikeHeartItem(this.props.id, this.state.like)}/> 
                                : 
                                <MdHeartOutline onClick={() => this.handleLikeHeartItem(this.props.id, this.state.like)}/>
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
