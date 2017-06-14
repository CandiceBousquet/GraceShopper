import React from 'react';
import Rater from 'react-rater';

export default function Reviews(props){
    const selectedItem = props.selectedItem;
    const reviews = selectedItem.reviews;

    return (
        <div className="reviews">
            <h3>REVIEWS OF LUNCH WITH {selectedItem.name} </h3>
            {
                reviews && reviews.length ? reviews.map(review => (
                    <div key={review.id}>
                        <Rater total={review.rating} interactive={false} />
                        <p>{review.content}</p>
                    </div>
                ))
                : <h5 className='specialCursive'>...no reviews for this lunch companion yet. <br /><br />If you have dined with {selectedItem.name}, please tell us about it below.</h5>
            }
        </div>
    );
}
