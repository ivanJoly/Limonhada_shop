import React, { Component, Fragment } from 'react';
import { Link, NavLink} from 'react-router-dom';

require('./Navigation.css');

class Navigation extends Component{
    state={
        navOpen: false,
        windowWidth: null
    }

    handleResize = () => this.setState({
        windowWidth: window.innerWidth
      });
    
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleMenu = () => {
        document.body.classList.toggle('menu-open')
        this.setState({navOpen: !this.state.navOpen});
    }

    render(){
        let navigationBar;
        
        if(this.state.windowWidth > 992){
            navigationBar = (
            <Fragment>
                <div className='container header-container'>
                    <nav className='navigation'>
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/shop'>Shop</NavLink>
                        </li>
                    </nav>
                    <div className='logo'>
                        <h2>Limonhada</h2>
                    </div>
                    <div className='cart'>
                        <Link to='cart'>Cart</Link>
                    </div>
                </div>
            </Fragment>
            );
        }else{
            navigationBar = (
                <Fragment>
                    <div className='container header-container'>
                        <div className='logo'>
                            <h2>Limonhada</h2>
                        </div>
                        <div className='hamburger-button-container' onClick={this.handleMenu}>
                            <div className="hamburger-button">
                                <span className="top-line">
                                    <span className="top-line-inner"></span> 
                                </span>
                                <span className="bottom-line">
                                    <span className="bottom-line-inner"></span> 
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='nav-container'>
                        <nav className='navigation'>
                            <li>
                                <NavLink to='/' onClick={this.handleMenu}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/shop' onClick={this.handleMenu}>Shop</NavLink>
                            </li>
                            <li>
                                <Link to='cart' onClick={this.handleMenu}>Cart</Link>
                            </li>
                        </nav>
                    </div>
                </Fragment>
            );
        }

        return(
            <header className={`${this.state.navOpen === true ? 'menu-open' : ''}`} >
                {navigationBar}
            </header>
        )
    }
}

export default Navigation;