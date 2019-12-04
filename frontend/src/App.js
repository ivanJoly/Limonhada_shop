import React, { Component, Fragment} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import HeaderImg from './components/HeaderImg/HeaderImg';
import BagItems from './containers/BagItems/BagItems';
import SingleProduct from './containers/SingleProduct/SingleProduct';

import UnderConstruction from './components/UnderConstruction/UnderConstruction'

class App extends Component {

  handleInitialLikeHeart = async (id) => {
    let ls = await localStorage.getItem(id)
    if(ls){
        console.log('LS', true);
        return true;
    }else{
        console.log('LS', false);
        return false;
    }
  }

  handleRemoveLikeHeart = (id) => {
      localStorage.removeItem(id);
      return false
  }

  handleAddLikeHeart = (id) => {
      localStorage.setItem(id, true);
      return true
  }

  handleLikeHeart = (id, actual) => {
      if(actual){
          return this.handleRemoveLikeHeart(id);
      }else{
          return this.handleAddLikeHeart(id);
      }
  }


  handleRemoveCart = (e, id, cart) => {
    let newCart = JSON.parse(cart).filter(el => el != id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    e.stopPropagation()
  }

  handleAddCart = (e, id, cart) => {
          let newCart = JSON.parse(cart);
          newCart.push(id);
          localStorage.setItem('cart', JSON.stringify(newCart));
          e.stopPropagation()
  }

  handleInitialCart = (id) => {
      let cart = localStorage.getItem('cart');
      if(cart){
          let okCart = JSON.parse(cart);
          if (okCart.find(el => el === id)){
              return true
          }else{
              return false
          }
      }else{
          let arr = []
          localStorage.setItem('cart', JSON.stringify(arr));
          return false
      }
  }

  handleCart = (e, id, actual) => {
      let cart = localStorage.getItem('cart');
      if(actual){
          this.handleRemoveCart(e, id, cart)
          this.setState({cart: false});

          return false;
      }else{
          this.handleAddCart(e, id, cart)
          this.setState({cart: true});

          return true;
      }
  }

  render(){

    return (
      <div className="App">
        <Layout>
          <Route path='/' exact component={UnderConstruction}/>
          <Route path='/shop' exact render={props => (
            <Fragment>
              <HeaderImg />
              <BagItems
                handleBagBySlug={this.handleBagBySlug}
                handleLikeHeart={this.handleLikeHeart}
                handleInitialLikeHeart={this.handleInitialLikeHeart}
                handleCart={this.handleCart}
                handleInitialCart={this.handleInitialCart}/>
            </Fragment>
            )
          }/>
          <Route path='/cart' exact component={UnderConstruction}/>
          <Route path={`/bag/:name/:model`} exact 
          render= { props => (
            <SingleProduct
              key={props.match.params.name}
              handleLikeHeart={this.handleLikeHeart}
              handleInitialLikeHeart={this.handleInitialLikeHeart}
              handleCart={this.handleCart}
              handleInitialCart={this.handleInitialCart}/>
          )
          }/>
          <Route path='/policy' exact component={UnderConstruction}/>
        </Layout>
      </div>
    );
  }
}

export default App;
