import React, { Component } from 'react';
import Rater from 'react-rater';

export default class LeaveAReview extends Component {
	constructor(props){
        super(props);
        this.state = {
            review: '',
            rating: 5,
            userId: this.props.userId
        };
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleReviewChange(evt){
        const review = evt.target.value;
        this.setState({
            review: review
        });
    }

    handleRatingChange(evt){
        this.setState({
            rating: evt.rating
        });
    }

    handleSubmit(evt){
        evt.preventDefault();
        if (!this.state.review || !this.state.rating){
            alert("You must enter a rating and review to publish -- Thanks!");
            return;
        }
        this.props.addReview(this.state, this.props.selectedItem);
    }

    render(){
        return (
            <form className="ReviewForm" onSubmit={this.handleSubmit}>
                {/*<input type="text" placeholder="Rating?" className="studentNameInput" onChange={this.handleRatingChange} />*/}
                <label className="rate-guest control-label">Rate this lunch companion:</label>
                <Rater total={5} rating={5} onRate={this.handleRatingChange} interactive={true} />
                <p></p>
                <textarea rows="4" cols="50" placeholder="Review?" className="review-text" onChange={this.handleReviewChange} />
                <p></p>
                <button type="submit" className="btn leaveReviewBtn btn-success"> Submit Review </button>
            </form>
        )
    }
}
