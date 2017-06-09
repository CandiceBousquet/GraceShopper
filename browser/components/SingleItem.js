import React from 'react';
import Reviews from './Reviews'
import LeaveAReview from './LeaveAReview'

export default function SingleItem({selectedItem, addToCart, addReview, userId}){
    console.log("SingleItem Component, props.selectedItem: ", selectedItem);
    return (
        selectedItem && (
        <div className="selectedItem">
            <img src={ selectedItem.imageUrl } max-width="400" />
            <h2 className="selectedItemName">HAVE LUNCH WITH: {selectedItem.name}</h2>
            <p className="selectedItemDescr">{selectedItem.description}</p>
            <h3 className="price">Price: ${selectedItem.price}</h3>
            <button className="addToCart btn" onClick={ () => {addToCart(selectedItem)} }>Add to Cart</button>
            <Reviews selectedItem={selectedItem} />
            <LeaveAReview selectedItem={selectedItem} addReview={addReview} userId={userId} />
        </div>)
    )
}