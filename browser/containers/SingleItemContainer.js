import SingleItem from '../components/SingleItem'
import { connect } from 'react-redux'
import { addToCart } from '../action-creators/cart'

const mapStateToProps = (state) => {
    return {
        selectedItem: state.item.selected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart(item){
            dispatch(addToCart(item))
        }
    }
}

const SingleItemContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItem);

export default SingleItemContainer;


