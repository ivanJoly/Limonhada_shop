import React, { Component } from 'react';

require('./BagItems.css');

class BagItems extends Component{
    
    state={
        bags:[]
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/bags/')
        .then(response => {
            console.log(response);
        })
    }

    render(){
        return(
            <div className='container'>
                <div className='bag-items-container'>

                </div>
            </div>
        )
    }
}

export default BagItems;