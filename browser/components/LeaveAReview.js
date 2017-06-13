import React, { Component } from 'react';

export default class LeaveAReview extends Component {

	constructor(props){
        super(props);
        this.state = {
            review: '',
            rating: null,
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

    handleRatingChange(evt){
        const rating = evt.target.value;
        this.setState({
            rating: rating
        })
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

    render(){
        return (
            <form className="ReviewForm" onSubmit={this.handleSubmit}>
                <label className="control-label">Rate This VIP:</label>
                <input className="studentNameInput rating rating-loading" data-min="0" data-max="5" data-step="1" onChange={this.handleRatingChange} />
                <input type="text" placeholder="Review?" className="studentEmailInput" onChange={this.handleReviewChange} />
                <button type="submit" className="btn leaveReviewBtn"> Submit Review </button>
            </form>
        );
    }
}
