import React, { Component } from 'react';

require('./HeaderImg.css');

class HeaderImg extends Component{
    render(){
        return(
            <div className='header-top-container'>
                <div className='container header-top'>
                    <div className='header-top-description'>
                        <span className='teaser'>Find the one of your style</span>
                        <h1 className='heading'>
                            <span>The bag</span>
                            <span>you need</span>
                        </h1>
                        <p className='sub-heading'>
                            Choose your needs depending on the two main models, then find the stamp with which you identify and wear it.
                        </p>
                        <p className='sub-heading slogan'>Make it yours.</p>
                    </div>
                    <div className='header-top-img'>
                        <img src="https://res.cloudinary.com/dofq7q8oh/image/upload/v1574435060/slider2.png" alt="Bag with hand"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderImg;