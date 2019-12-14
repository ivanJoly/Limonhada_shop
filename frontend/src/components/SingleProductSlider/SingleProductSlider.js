import React, { Component } from 'react';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';

require('./SingleProductSlider.css');

class SingleProductSlider extends Component{

    state = {
        position: 0
    }

    handleSlider = (e, id) => {
        if(id == 'left'){
            this.setState((prevState, props) => {
                return {position: prevState.position - 1};
            })
        }else{
            this.setState((prevState, props) => {
                return {position: prevState.position + 1};
            })
        }
    }

    render(){

        let img_profile;
        let imgs_slider = [];

        if(this.props.img_profile){
            img_profile = (
                <div 
                className={`image-container profile`}
                key={this.props.img_profile.original_filename}
                style={
                    {
                        backgroundImage: `url(${this.props.img_profile.secure_url})`,
                        transform: `translateX(${0*100 - this.state.position*100}%)`
                    }
                }></div>
            )
        }
        
        if(this.props.imgs){
            imgs_slider = this.props.imgs.map((img, index) => {
                let indice = index + 1
                return (
                    <div 
                    className={`image-container`}
                    key={img.original_filename}
                    style={
                        {
                            backgroundImage: `url(${img.secure_url})`,
                            transform: `translateX(${indice*100 - this.state.position*100}%)`
                        }
                    }></div>
                )
            })
        }

        return(
            <div className={`single-product-slider-container ${imgs_slider.length != 0 ? 'loaded' : ' '}`}>
                {img_profile}
                {imgs_slider}
                <div className='buttons-container'>
                    <button
                    className={`${this.state.position == 0 ? 'disabled' : ' '} `}
                    onClick={(e) => this.handleSlider(e, 'left')}>{<IosArrowBack/>}</button>
                    <button
                    className={`${this.state.position == imgs_slider.length ? 'disabled' : ' '} `}
                    onClick={(e) => this.handleSlider(e, 'right')}>{<IosArrowForward/>}</button>
                </div>
            </div>
        )
    }
}

export default SingleProductSlider;
