import React from 'react';
import Rater from 'react-rater';

export default function Reviews(props){
    const selectedItem = props.selectedItem;
    const reviews = selectedItem.reviews;

    return (
        <div className="reviews">
            <h3>Reviews of lunch with {selectedItem.name} </h3>
            {
                reviews && reviews.length ? reviews.map(review => (
                    <div key={review.id}>
                        <Rater total={5} rating={review.rating} interactive={false} />
                        <p>{review.content}</p>
                    </div>
                ))
                : <h4>[...no reviews for this lunch companion yet]</h4>
            }
        </div>
    );
}
