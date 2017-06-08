const router = require('express').Router();
const Order = require('../db/models/order');
const Inventory = require('../db/models/inventory');
const notFound = new Error(404)
const outOfStock = new Error(" Item is out of Stock ")

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
router.post('/:itemId', (req,res,next) => {
    let currentOrder;
    Order.findOrCreate({
        where: {
            orderId: req.session.orderId,
            userId:req.session.userId,
            submitted:false
        }    
    })
    .then(order => {
        req.session.orderId = order.id
        currentOrder = order;
        return Inventory.findItem(req.params.itemId)
    })
    .then(item => {
        return item.decrementQuantity(1)
    })
    .then(itemDecremented => {
        return currentOrder.setItem(req.params.itemId);
    })
    .then(updatedOrder => {
        res.json(updatedOrder);
    })
    .catch(next)
})

/*
    Removes item from order
*/
router.delete('/:itemId', (req,res,next) => {
     let currentOrder;
    Order.findOne({
        where: {
            orderId: req.session.orderId
        }    
    })
    .then(order => {
        if(!order){
            next(notFound)
        }else{
            currentOrder = order;
            return Inventory.findOne({
               where: {
                itemId: req.params.itemId
               } 
            })
        }     
    })
    .then(item => {
        return item.incrementQuantity(1);
    })
    .then(itemIncremented => {
        return currentOrder.removeItem(req.params.itemId)
    })
    .then(updatedOrder => {
        res.json(updatedOrder);
    })
    .catch(next)
})

/*
    Submits order
*/
router.put('/:orderId', (req,res,next) => {
    Order.update({
        submitted:true
    },{
        where:{
            orderId: req.params.orderId
        },
        returning:true
    })
    .then(submittedOrder => {
        if(!submittedOrder[0]){
            next(notFound)
        }else{
            const order = submittedOrder[1][0];
            req.session.orderId = null;
            res.json(order)
        }
    })
    .catch(next)

})

/*
    Getting Users most recent order
*/
router.get('/:userId', (req,res,next) => {
   Order.findOne({
       where:{
           userId:req.params.id,
           submitted:false
       }
   })
   .then(cart => {
       res.json(cart);
   })
   .catch(next);
})

/*
    Get User's order history 
*/
router.get('/:userId/history', (req,res,next) => {
    Order.findAll({
        where:{
            userId:req.params.userId,
            submitted:true
        }
    })
    .then(orderHistory => {
        res.json(orderHistory)
    })
})

router.delete('/:orderId', (req,res,next) => {
    Order.destroy({
        where:{
            id:req.params.orderId
        }
    })
    .then((deletedOrder) => {
        res.json(deletedOrder)
    })
    .catch(next);
})









module.exports = router;