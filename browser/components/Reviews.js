import React from 'react';

export default function Reviews(props){
    const selectedItem = props.selectedItem;
    const reviews = selectedItem.review;

    return (
        <div className="reviews">
            <h3>REVIEWS OF LUNCH WITH {selectedItem.name} </h3>
            <ul>
                {reviews && reviews.length ? reviews.map(review => (
                    <li key={review.id} >
                        <h4>{review.rating}</h4>
                        <p>{review.content}</p>
                    </li>
                    ))
                : <h5 className='specialCursive'>...no reviews for this lunch companion yet. <br /><br />If you have dined with {selectedItem.name}, please tell us about it below.</h5>
                }
            </ul>
        </div>
    )
}