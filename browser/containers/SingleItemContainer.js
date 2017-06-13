import SingleItem from '../components/SingleItem'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../action-creators/cart'
import { addReview } from '../action-creators/item'

const mapStateToProps = (state) => {
    return {
        selectedItem: state.item.currentItem,
        userId: state.user.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart(item, userId){
            dispatch(addItem(item, userId))
        },
        addReview(review, item){
            dispatch(addReview(review, item))
        }
    }
}

const SingleItemContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItem);

export default SingleItemContainer;
