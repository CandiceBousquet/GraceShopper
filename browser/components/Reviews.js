import React from 'react';

export default function Reviews(props){
    const selectedItem = props.selectedItem;
    const reviews = selectedItem.reviews;

    // return (
    //     <div className="reviews">
    //         <h3>Reviews of lunch with {selectedItem.name} </h3>
    //         {
    //             reviews && reviews.length ? reviews.map(review => (
    //                 <div key={review.id}>
    //                     <input value={review.rating} className="rating-loading" displayOnly="true" />
    //                     <p>{review.content}</p>
    //                 </div>
    //             ))
    //             : <h4>[...no reviews for this lunch companion yet]</h4>
    //         }
    //     </div>
    // );

    return (
        <div className="reviews">
            <h3>Reviews of lunch with {selectedItem.name} </h3>
            <ul>
                {reviews && reviews.length ? reviews.map(review => (
                    <li key={review.id} >
                        <p>{`${review.rating}: ${review.content}`}</p>
                    </li>
                    ))
                : <h4>[...no reviews for this lunch companion yet]</h4>
                }
            </ul>
        </div>
    );
}
