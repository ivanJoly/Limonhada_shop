import React, { Component } from 'react';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';

require('./SingleProductSlider.css');

const img_profile = 'https://res.cloudinary.com/dofq7q8oh/image/upload/v1574808189/1574808188281.png';
const img_profile2 = 'https://res.cloudinary.com/dofq7q8oh/image/upload/v1574808189/1574808187959.jpg';
const img_profile3 = 'https://res.cloudinary.com/dofq7q8oh/image/upload/v1574808189/1574808188141.jpg';

class SingleProductSlider extends Component{

    state = {
        position: 0,
        minMaxPosition: [0,2],
        imgs: [img_profile, img_profile2, img_profile3]
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
        let imagesDiv = this.state.imgs.map((img, index) => {
            return (
                <div 
                className={`image-container ${index === 0 ? 'profile' : ' '}`}
                key={index}
                style={
                    {
                        backgroundImage: `url(${img})`,
                        transform: `translateX(${index*100 - this.state.position*100}%)`
                    }
                }></div>
            )
        })

        return(
            <div className={`single-product-slider-container ${this.state.imgs.lenght != 0 ? 'loaded' : ' '}`}>
                {imagesDiv}
                <div className='buttons-container'>
                    <button
                    className={`${this.state.minMaxPosition[0] == this.state.position ? 'disabled' : ' '} `}
                    onClick={(e) => this.handleSlider(e, 'left')}>{<IosArrowBack/>}</button>
                    <button
                    className={`${this.state.minMaxPosition[1] == this.state.position ? 'disabled' : ' '} `}
                    onClick={(e) => this.handleSlider(e, 'right')}>{<IosArrowForward/>}</button>
                </div>
            </div>
        )
    }
}

export default SingleProductSlider;
