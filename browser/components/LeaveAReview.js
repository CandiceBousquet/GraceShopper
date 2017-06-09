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
                <input type="text" placeholder="Rating?" className="studentNameInput" onChange={this.handleRatingChange} />
                <input type="text" placeholder="Review?" className="studentEmailInput" onChange={this.handleReviewChange} />
                <button type="submit" className="btn leaveReviewBtn"> Submit Review </button>
            </form>
        )
    }
}
