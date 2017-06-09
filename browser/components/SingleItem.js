import React, from 'react';
import Reviews from './Reviews'

export default function SingleItem(props){
    const selectedItem = props.selectedItem;
    const addToCart = props.addToCart;

    return (
        <div className="selectedItem">
            <img src={ selectedItem.imageUrl } width="400" height="400" />
            <h2 className="selectedCampusName">HAVE LUNCH WITH: {selectedItem.name}</h2>
            <p className="selectedCampusDescription">{selectedItem.description}</p>
            <h3 className="price">"Price: $"{selectedItem.price}</h3>
            <button className="addToCart btn" onClick={ () => {addToCart(selectedItem)} }>Add to Cart</button>
            <Reviews selectedItem={selectedItem} />
        </div>
    )
}