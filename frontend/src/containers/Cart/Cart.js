import React,{ Component, Fragment } from 'react';

import CartWithProducts from '../../components/Cart/CartWithProducts/CartWithProducts';
import CartWithoutProducts from '../../components/Cart/CartWithoutProducts/CartWithoutProducts';

const Api = require('../../config/apiConfig');

class Cart extends Component{
    state = {
        cart:[],
        loading: true
    }

    componentDidMount(){
        let localS = JSON.parse(localStorage.getItem('cart'));
        if(localS.length != 0){
            fetch(`${Api.config.url}/api/bags/cart`, {
                method: 'POST',
                body: JSON.stringify(localS),
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                let bagsNew = result.bags.map(bag => {
                    bag.quantity = 1;
                    return bag;
                })

                this.setState({cart: bagsNew,  loading: false});
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            console.log('Here');
            this.setState({loading: false})
        }
    }

    handleCartItem = (e, id, actual) => {
        this.props.handleCart(e, id, actual);
        let arrNew = [...this.state.cart];
        let filterArr = arrNew.filter(bag => {
            return !(bag._id == id)
        })
        this.setState({cart: filterArr});
    }

    handledUpQuantity = (id) => {
        console.log(id);
        let arrNew = [...this.state.cart];
        arrNew.map(bag => {
            if(bag._id == id){
                bag.quantity = bag.quantity + 1 
            }
            return bag;
        })

        this.setState({cart: arrNew})
    }

    handledDownQuantity = (id) => {
        let arrNew = [...this.state.cart];
        arrNew.map(bag => {
            if(bag._id == id){
                if( !(bag.quantity == 1)){
                    bag.quantity = bag.quantity - 1
                }
            }
            return bag;
        })

        this.setState({cart: arrNew})
    }

    render(){
        let cart;
        console.log(this.state.cart);
        if(this.state.cart.length == 0 && this.state.loading == true){
            cart = <span>Loading</span>
        }else if (this.state.cart.length == 0 && this.state.loading == false){
            cart = <CartWithoutProducts />
        }else if(this.state.cart.length != 0 && this.state.loading == false){
            cart = <CartWithProducts
                handleCart={this.handleCartItem}
                up= {this.handledUpQuantity}
                down={this.handledDownQuantity}
                cart={this.state.cart}/>
        }

        return(
            <Fragment>
                {cart}
            </Fragment>
        )
    }
}

export default Cart;