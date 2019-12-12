import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import LogoInstagram from 'react-ionicons/lib/LogoInstagram'
import LogoTwitter from 'react-ionicons/lib/LogoTwitter'
import LogoFacebook from 'react-ionicons/lib/LogoFacebook'

require('./Footer.css');
const Api = require('../../config/apiConfig');


class Footer extends Component{
    state={
        subscribe: false,
        mail: '',
        mailResponse: ''
    }

    handleChange = (e) => {
        this.setState({mail: e.target.value});
    }

    formAction = (e) => {
        console.log('Formulario correcto');
        e.preventDefault();
        fetch(`${Api.config.url}/api/sendmail`, {
            method: 'POST',
            body: JSON.stringify({mail: this.state.mail}),
            headers:{
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response);
            if(response.status === 200){
                this.setState({mailResponse: response.msg})
            }else{
                this.setState({mailResponse: response.msg})
            }
        })
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
                                <input type="email" name="email" id="email" value={this.state.mail} onChange={(e) => this.handleChange(e)}/>
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
                        this.state.mailResponse != ''
                        ?
                        <div className='subscribe'><span>{this.state.mailResponse}</span></div>
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