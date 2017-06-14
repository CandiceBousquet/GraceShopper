import React, { Component } from 'react';
import Rater from 'react-rater';

export default class LeaveAReview extends Component {

	constructor(props){
        super(props);
        this.state = {
            review: '',
            rating: 5,
            userId: this.props.userId
        }
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleReviewChange(evt){
        console.log(this.state);
        const review = evt.target.value;
        this.setState({
            review: review
        })
    }

    // handleRatingChange(evt){
    //     console.log('rating event', evt);
    //     const rating = evt.target.value;
    //     this.setState({
    //         rating: rating
    //     })
    // }

    handleRatingChange(evt){
        console.log('rating event', evt.rating);
        this.setState({
            rating: evt.rating
        });
    }

    handleSubmit(evt){
        console.log('!!!', this.state)
        evt.preventDefault();
        if (!this.state.review || !this.state.rating){
            alert("You must enter a rating and review to publish -- Thanks!");
            return
        }
        this.props.addReview(this.state, this.props.selectedItem);
    }

    render() {
        return (
            <form className="ReviewForm" onSubmit={this.handleSubmit}>
                <label className="rate-guest control-label">Rate This VIP:</label>
                <Rater total={5} rating={5} onRate={this.handleRatingChange} interactive={true} />
                {/*<StarRating defaultValue={5} stars={5} min={1} max={5} step={1} className="star-rating" onRatingChange={this.handleRatingChange} />*/}
                {/*<select onChange={this.handleRatingChange}>
                    {
                        [5, 4, 3, 2, 1].map(rating => (
                            <option key={rating.id} value={rating}>{rating}</option>
                        ))
                    }
                </select>*/}
                <input type="text" placeholder="Review?" className="review-text" onChange={this.handleReviewChange} />
                <button type="submit" className="btn leaveReviewBtn"> Submit Review </button>
            </form>
        );
    }
}


//     render() {
//         return (
//             <form className="ReviewForm" onSubmit={this.handleSubmit}>
//                 <label className="control-label">Rate This VIP:</label>
//                 <input className="studentNameInput rating rating-loading" data-min="0" data-max="5" data-step="1" onChange={this.handleRatingChange} />
//                 {/*<select onChange={this.handleRatingChange}>
//                     {
//                         [5, 4, 3, 2, 1].map(rating => (
//                             <option key={rating.id} value={rating}>{rating}</option>
//                         ))
//                     }
//                 </select>*/}
//                 <input type="text" placeholder="Review?" className="studentEmailInput" onChange={this.handleReviewChange} />
//                 <button type="submit" className="btn leaveReviewBtn"> Submit Review </button>
//             </form>
//         );
//     }
// }
