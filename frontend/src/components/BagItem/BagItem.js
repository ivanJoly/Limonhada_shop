import React, { Component } from 'react';

require('./BagItem.css');

class BagItem extends Component {
    state={
        image_loaded: false
    }

    handleImageLoaded = () => {
        this.setState({image_loaded: true})
    }

    render(){
        let style = []
        style.push('bag-item-container');
        if(this.state.image_loaded){
            style.push('loaded');
        }
        return(
            <div className={style.join(' ')}>
                <div className='bag-item-img' onClick={this.props.viewMore}>
                    <img 
                        src={this.props.url} 
                        alt={this.props.name}
                        onLoad={this.handleImageLoaded}/>
                    <div className="button add-cart" onClick={this.props.addToCart}>
                        <span>Add to Cart</span>
                    </div>
                </div>
                <div className='bag-item-desc'>
                    <div className="top">
                        <div className="name">{this.props.name}</div>
                        <div className="model"></div>
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

export default BagItem;
