import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import LogoInstagram from 'react-ionicons/lib/LogoInstagram'
import LogoTwitter from 'react-ionicons/lib/LogoTwitter'
import LogoFacebook from 'react-ionicons/lib/LogoFacebook'


require('./Footer.css');

class Footer extends Component{
    state={
        subscribe: false
    }

    formAction = (e) => {
        console.log('Formulario correcto');
        this.setState({subscribe: true});

        setTimeout(()=>{
            this.setState({subscribe: false})
        }, 3000)

        e.preventDefault();
    }

    render(){
        return(
            <footer>
                <div className="container">
                    <div className="top">
                        <div className="logo-container ">
                            <h3 className='logo'>Limonhada</h3>
                        </div>
                        <div className="newsletter">
                            <span>Newsletter</span>
                            <form onSubmit={(e) => this.formAction(e)}>
                                <input type="email" name="email" id="email"/>
                                <button type="submit">Go!</button>
                            </form>
                        </div>
                        <div className="redes">
                            <LogoFacebook fontSize='28px'/>
                            <LogoInstagram fontSize='28px'/>
                            <LogoTwitter fontSize='28px'/>
                        </div>
                    </div>
                    {
                        this.state.subscribe
                        ?
                        <div className='subscribe'><span>Thanks for subscribe us!</span></div>
                        :
                        null
                    }
                    <div className="line-separator"></div>
                    <div className="bottom">
                        <div className="registered">
                            <span>® 2019<strong> limonhada.</strong> All rights registered.</span>
                        </div>
                        <div className="navigation">
                            <Link to='/'>Home</Link>
                            <Link to='/shop'>Shop</Link>
                            <Link to='/cart'>Cart</Link>
                            <Link to='/policy'>Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;