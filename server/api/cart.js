const router = require('express').Router();
const Order = require('../db/models/order');

///Will need to work on the express-sessions for when user not logged in

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
})

router.put('/:userId')
router.post('/:userId')






module.exports = router;