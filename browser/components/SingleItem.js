import React from 'react';
import Reviews from './Reviews'
import LeaveAReview from './LeaveAReview'

export default function SingleItem({selectedItem, addToCart, addReview, userId}){
    return (
        selectedItem && (
        <div className="selectedItem">
            <img className="item-img" src={ selectedItem.imageUrl }/>
            <div className='item-descr'>
                <h2 className="selectedItemName">HAVE LUNCH WITH: {selectedItem.name}</h2>
                <p className="selectedItemDescr">{selectedItem.description}</p>
                <h3 className="price">Price: ${selectedItem.price}</h3>
                <button className="addToCart btn" onClick={ () => {addToCart(selectedItem.id, userId)} }>Add to Cart</button>
            </div>
            <div className='item-review'>
                <Reviews selectedItem={selectedItem} />
                <LeaveAReview selectedItem={selectedItem} addReview={addReview} userId={userId} />
            </div>
        </div>)
    )
}