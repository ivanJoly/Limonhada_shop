import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';

require('./Navigation.css');

class Navigation extends Component{
    render(){
        return(
            <header>
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
            </header>
        )
    }
}

export default Navigation;