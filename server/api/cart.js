const router = require('express').Router();
const Order = require('../db/models/order');
const notFound = function() { return new Error('Not found') };
const outOfStock = function() { return new Error('Item is out of Stock') };
const Item = require('../db/models/item');
const Promise = require('bluebird');
///Will need to work on the express-sessions for when user not logged in

/*
    1. Create new Cart / Order -- X
    2. Update Cart / Order
        a. add item to order -- X
        b. submit order
        c. delete from order -- X
    3. Get recent Cart if exists -- X
    4. Get all order history
    5. Delete Order
*/

/*
    Creates or Finds an Order/Cart
    Will set the current oder to that new or created order
    It will then find the item that is being added to the order in the inventory
    It will then decrement that item from the inventory
    It will then add that item to the order
    And return that updated order
*/
router.post('/item/:itemId', (req, res, next) => {
    let currentOrder;
    let currentItem;
    Order.findOrCreate({
            where: {
                id:req.body.orderId || req.session.orderId,
                submitted:false
            } 
        })
        .spread((order, ifCreated) => {
            req.session.orderId = order.id;
            currentOrder = order;
            if(ifCreated){
                return order.update({
                    userId:req.body.userId || req.session.userId
                })
            }  
        })
        .then(()=>{
            return Item.findById(req.params.itemId);
        })
        .then(item => {
            currentItem = item;
            //item.decrementQuantity(1); //if you add the same item twice to your order, it doesn't actually add to your order but it does decrement quantity
        })
        .then(() => {
            return currentOrder.addItem(currentItem);
        })
        .then(updatedOrder => {
            //if item exists then this will send back an instance of that association;
            res.json(currentOrder);
        })
        .catch(next);
})

/*
    Removes item from order -- does not check whether item is actually on order;
    route should only be used by frontend when it's known that order has item
*/
router.delete('/item/:itemId', (req, res, next) => {
    let currentOrder;
    Order.findById(req.session.orderId)
        .then(order => {
            if (!order) next(notFound);
            else currentOrder = order;
        })
        .then(() => {
            return Item.findById(req.params.itemId)
        })
        .then((item) => {
            if (!item) next(notFound);
            return item.incrementQuantity(1);
        })
        .then(() => {
            return currentOrder.removeItem(req.params.itemId)
        })
        .then(result => {
            if (result) res.sendStatus(204);
            else res.send('Nothing to delete')
        })
        .catch(next);

})

/*
    Submits order
*/
router.put('/order/:orderId', (req, res, next) => {
    Order.update({
            submitted: true
        }, {
            where: {
                id: req.params.orderId
            },
            returning: true
        })
        .then(submittedOrder => {
            if (!submittedOrder[0]) {
                next(notFound)
            } else {
                const order = submittedOrder[1][0];
                req.session.orderId = null;
                res.json(order);
            }
        })
        .catch(next);

})

/*
    Getting User's cart
*/
router.get('/user/:userId', (req, res, next) => {
    Order.findOne({
            where: {
                userId: req.params.userId,
                submitted: false
            },
            include:[Item]
        })
        .then(cart => {
            res.json(cart);
        })
        .catch(next);
})

/*
    Get User's order history
*/
router.get('/user/:userId/history', (req, res, next) => {
    Order.findAll({
            where: {
                userId: req.params.userId,
                submitted: true
            },
            include:[Item]
        })
        .then(orderHistory => {
            res.json(orderHistory);
        })
})

router.delete('/order/:orderId', (req, res, next) => {
    Order.destroy({
            where: {
                id: req.params.orderId
            }
        })
        .then(result => {
            if (result) res.sendStatus(204);
            else res.send('Nothing to delete')
        })
        .catch(next);
})



module.exports = router;

