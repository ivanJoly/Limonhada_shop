import React, { Component, Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
require('./Modal.css');

class Modal extends Component{
    render(){
        return(
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.close} />
                <div
                    className={`modal ${this.props.show ? 'active' : ' '}`}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal;