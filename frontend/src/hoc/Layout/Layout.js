import React, { Component, Fragment } from 'react';

import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

class Layout extends Component{
    render(){
        return(
            <Fragment>
                <Navigation/>
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </Fragment>
        )
    }
}

export default Layout;
