import React from 'react';

require('./Loading.css');

const Loading = (props) => {
    return(
    <div className='loading-container'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    )
}

export default Loading;