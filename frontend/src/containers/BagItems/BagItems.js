import React, { Component } from 'react';
import BagItem from '../../components/BagItem/BagItem';


const Api = require('../../config/apiConfig');
require('./BagItems.css');

class BagItems extends Component{
    
    state={
        bags:[]
    }

    componentDidMount(){
        fetch(`${Api.config.url}/api/bags/`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            this.setState({bags: result.bags});
        })
    }

    viewMore = () => {
        alert('WIP ViewMore')
    }

    addToCart = (e) =>{
        alert('WIP AddtoCart')
        e.stopPropagation()
    }

    render(){

        let bags;  

        if(this.state.bags.length !== 0){
            bags = this.state.bags.map(bag => {
                return <BagItem
                    key={bag._id}
                    url={bag.image_profile.url}
                    name={bag.name}
                    model={bag.model[0]}
                    price={bag.price}
                    viewMore={this.viewMore}
                    addToCart={this.addToCart}/>
            })
        }
        
        return(
            <div className='container'>
                <div className='bag-items-container'>
                    {bags}
                </div>
            </div>
        )
    }
}

export default BagItems;