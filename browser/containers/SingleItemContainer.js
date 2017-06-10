import SingleItem from '../components/SingleItem'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../action-creators/cart'
import { addReview } from '../action-creators/item'

const mapStateToProps = (state) => {
    console.log("SingleItemContainer, state.item.currentItem: ", state.item.currentItem)
    return {
        selectedItem: state.item.currentItem,
        userId: state.user.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart(item){
            dispatch(addItem(item))
        },
        addReview(review, item){
            dispatch(addReview(review, item))
        }
    }
}

const SingleItemContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItem);

export default SingleItemContainer;


