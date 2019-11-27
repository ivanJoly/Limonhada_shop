import React from 'react';
import MdStar from 'react-ionicons/lib/MdStar';
import MdHeart from 'react-ionicons/lib/MdHeart';


require('./SingleProductInfo.css');

const SingleProductInfo = (props) =>{ 
    return(
        <div className="single-product-info-container">
            <div className="model">
                <h3>Tote bag</h3>
            </div>
            <div className="name">
                <h1>Ride a unicorn</h1>
            </div>
            <div className="price-and-stars">
                <div className="price">
                    <span>$</span>
                    <span>220.00</span>
                </div>
                <div className="stars">
                    <MdStar color='#eaeaea'/>
                    <MdStar color='#eaeaea'/>
                    <MdStar color='#eaeaea'/>
                    <MdStar color='#eaeaea'/>
                    <MdStar color='#9E9E9E'/>
                </div>
            </div>
            <div className="facts">
                <h3 className='fact-heading'>3 simple facts</h3>
                <div className="facts-list">
                    <ul>
                        <li>comfortable and easy to transport</li>
                        <li>economical but quality</li>
                        <li>please! You ride a unicorn</li>
                    </ul>
                </div>
            </div>
            <div className="line-separator"></div>
            <div className="description">
                <p>
                    {
                    `Bolso hecho a mano en tela 100% algodón.
                    Resistente, con manija de tela!
                    Medidas: 42x37cm y manijas de 35cm de alto (desde el hombro a la apertura del bolso)
                    Estampado con Diseño único!`
                    }
                </p>
            </div>
            <div className="to-buy">
                <div className="quantity"></div>
                <div className="add-to-cart">
                    <button>Add To Cart</button>
                </div>
                <div className="heart">
                    <button>
                        <MdHeart color='#ec5e54'/>
                    </button>
                </div>
            </div>
        </div>
)
}

export default SingleProductInfo;