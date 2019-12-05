import React,{ Component, Fragment } from 'react';

import CartWithProducts from '../../components/Cart/CartWithProducts/CartWithProducts';
import CartWithoutProducts from '../../components/Cart/CartWithoutProducts/CartWithoutProducts';

class Cart extends Component{
    state = {
        cart:[],
        loading: true
    }

    componentDidMount(){
        let localS = JSON.parse(localStorage.getItem('cart'));
        if(localS.length != 0){
            this.setState({cart: localS, loading: false})
        }else{
            this.setState({loading: false})
        }
    }

    handleCartItem = (e, id, actual) => {
        let response = this.props.handleCart(e, id, actual);
        this.setState({cart: response});
    }

    render(){
        let cart;

        if(this.state.cart.length == 0 && this.state.loading == true){
            cart = <span>Loading</span>
        }else if (this.state.cart.length == 0 && this.state.loading == false){
            cart = <CartWithoutProducts />
        }else if(this.state.cart.length != 0 && this.state.loading == false){
            cart = <CartWithProducts />
        }

        return(
            <Fragment>
                {cart}
            </Fragment>
        )
    }
}

export default Cart;