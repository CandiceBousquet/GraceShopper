import React from 'react';

export default function Reviews(props){
    const selectedItem = props.selectedItem;
    const reviews = selectedItem.reviews;

    return (

    )

    // return (
    //     <div className="reviews">
    //         <h3>Reviews of lunch with {selectedItem.name} </h3>
    //         <ul>
    //             {reviews && reviews.length ? reviews.map(review => (
    //                 <li key={review.id} >
    //                     <h4>{review.rating}</h4>
    //                     <p>{review.content}</p>
    //                 </li>
    //                 ))
    //             : <h4>[...no reviews for this lunch companion yet]</h4>
    //             }
    //         </ul>
    //     </div>
    // );
}
