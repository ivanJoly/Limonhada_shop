import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MdStar from 'react-ionicons/lib/MdStar';
import MdHeart from 'react-ionicons/lib/MdHeart';
import MdHeartOutline from 'react-ionicons/lib/MdHeartOutline';
import IosCartOutline from 'react-ionicons/lib/IosCartOutline';

require('./SingleProductInfo.css');

class SingleProductInfo extends Component{

    handleRouteCart = (e) => {
        this.props.history.push({
            pathname: `/cart`
          })
          e.stopPropagation()
    }

    render(){
        let model;
        let name;
        let price;
        let stars;
        let facts;
        let description;

        if(this.props.bag.length == 0){
            model = <span></span>;
            name = <span></span>;
            price = <span></span>;
            stars = <span></span>;
            facts = (
                [...Array(3)].map( el => {
                    return <span></span>;
                })
            )
            description = <span></span>;
        }else{
            model = (`${this.props.bag.model} bag`);
            name = (`${this.props.bag.name}`);
            price = (
                <Fragment>
                    <span>$</span>
                    <span>{this.props.bag.price}</span>
                </Fragment>
            )
            stars = (
                [...Array(5)].map( (star, index) => {
                    return <MdStar key={index} color={this.props.bag.stars > index ? '#eaeaea' : '#9E9E9E'}/>
                })
            )
            facts = (
                this.props.bag.facts.map( (el, index) => {
                    return <li key={index}>{el}</li>;
                })
            )
            description = (`${this.props.bag.description}`)

        }
    
    return(
        <div className={`single-product-info-container ${this.props.bag ? 'loaded' : ' '}`}>
            <div className="model">
                <h3>{model}</h3>
            </div>
            <div className="name">
                <h1>{name}</h1>
            </div>
            <div className="price-and-stars">
                <div className="price">
                    {price}
                </div>
                <div className="stars">
                    {stars}
                </div>
            </div>
            <div className="facts">
                <h3 className='fact-heading'>3 simple facts</h3>
                <div className="facts-list">
                    <ul>
                        {facts}
                    </ul>
                </div>
            </div>
            <div className="line-separator"></div>
            <div className="description">
                <p>
                    {description}
                </p>
            </div>
            <div className="to-buy">
                <div className="quantity"></div>
                <div className="add-to-cart">
                {
                        this.props.cart ?
                        (
                        <button onClick={(e) => this.handleRouteCart(e)}>
                            <span>
                                <IosCartOutline fontSize="18px"/>
                            </span>
                        </button>
                        )
                        :
                        (
                        <button onClick={(e) => this.props.handleCart(e, this.props.bag._id, this.props.cart)}>
                            Add to Cart
                        </button>
                        )
                    }
                </div>
                <div className="heart">
                    <button className={`${this.props.like ? 'active': 'unactive'}`} onClick={() => this.props.handleLikeHeart(this.props.bag._id, this.props.like)}>
                            {
                                this.props.like 
                                ? 
                                <MdHeart color="#ec5e54"/> 
                                : 
                                <MdHeartOutline/>
                            }
                    </button>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(SingleProductInfo);