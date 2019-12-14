import React,{ Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';
import Modal from '../../components/Modal/Modal';
import CartThank from '../../components/Cart/CartThank/CartThank';
import CartWithProducts from '../../components/Cart/CartWithProducts/CartWithProducts';
import CartWithoutProducts from '../../components/Cart/CartWithoutProducts/CartWithoutProducts';

const Api = require('../../config/apiConfig');

class Cart extends Component{
    state = {
        cart:[],
        loading: true,
        modal: false
    }

    componentDidMount(){
        let localS = JSON.parse(localStorage.getItem('cart'));
        if(localS.length != 0){
            fetch(`${Api.config.url}/api/bags/cart`, {
                method: 'POST',
                body: JSON.stringify(localS),
                headers:{
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
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
                console.log('error');
                console.log(err);
            })
        }else{
            this.setState({loading: false})
        }
    }

    handleModalOpen = () => {
        this.setState({modal: true});

    }

    handleModalClose = () => {
        let arr = []
        localStorage.setItem('cart', JSON.stringify(arr));
        this.setState({modal: false, cart:[]});
        this.props.history.push('/');
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
        if(this.state.cart.length == 0 && this.state.loading == true){
            cart = <Loading />
        }else if (this.state.cart.length == 0 && this.state.loading == false){
            cart = <CartWithoutProducts />
        }else if(this.state.cart.length != 0 && this.state.loading == false){
            cart = <CartWithProducts
                handleCart={this.handleCartItem}
                handleModal={this.handleModalOpen}
                up= {this.handledUpQuantity}
                down={this.handledDownQuantity}
                cart={this.state.cart}/>
        }

        return(
            <Fragment>
                {cart}
                <Modal show={this.state.modal} close={this.handleModalClose}>
                    <CartThank close={this.handleModalClose}/>
                </Modal>
            </Fragment>
        )
    }
}

export default withRouter(Cart);