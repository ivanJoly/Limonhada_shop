import React from 'react';

require('./Loading.css');

const Loading = (colorSecondary) => {
    return(
    <div className={`loading-container ${colorSecondary ? 'secondary': ' '}`}>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    )
}

export default Loading;