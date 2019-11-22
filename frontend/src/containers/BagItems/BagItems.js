import React, { Component } from 'react';
import BagItem from '../../components/BagItem/BagItem';


const Api = require('../../config/apiConfig');
require('./BagItems.css');

class BagItems extends Component{
    
    state={
        bags:[],
        active: 'all',
        filter: false
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

    addToCart = (e) => {
        alert('WIP AddtoCart')
        e.stopPropagation()
    }

    activeFilter = (e) => {
        const clicked = e.target.id
        if(clicked == 'all'){
            this.setState({active: clicked, filter: false})
        }else{
            this.setState({active: clicked, filter: true});
        }
    }

    render(){

        let bags;
        let quantity = 0;

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
            quantity = bags.length;
        }

        if(this.state.filter){
            bags = this.state.bags.filter(el => {
                return el.model[0].toLowerCase() == this.state.active
            })
            .map(bag => {
                return <BagItem
                    key={bag._id}
                    url={bag.image_profile.url}
                    name={bag.name}
                    model={bag.model[0]}
                    price={bag.price}
                    viewMore={this.viewMore}
                    addToCart={this.addToCart}/>
            })
            quantity = bags.length;
        }
        
        return(
            <div className='container bags-container'>
                <div className='bag-title'>
                    <h2 className='heading'>Our products</h2>
                    <div className='line-separator'></div>
                    <p className='sub-heading'>Here you will find all our bag models, new models are coming soon do not miss them, stay tuned!</p>
                </div>
                <div className="bag-item-header">
                    <div className="products-found">
                        <span>{ quantity }</span>
                        <span> products found</span>
                    </div>
                    <div className="filter-container">
                        <div className="filter">
                            <div id="all"
                            className={`filter-item ${this.state.active === "all" ? 'active': ''}`}
                            onClick={this.activeFilter}>All</div>
                            <div id="tote" 
                            className={`filter-item ${this.state.active === "tote" ? 'active': ''}`}
                            onClick={this.activeFilter}>Tote</div>
                            <div id="beach" 
                            className={`filter-item ${this.state.active === "beach" ? 'active': ''}`}
                            onClick={this.activeFilter}>Beach</div>
                        </div>
                    </div>
                </div>
                <div className='bag-items-container'>   
                    {bags}
                </div>
            </div>
        )
    }
}

export default BagItems;