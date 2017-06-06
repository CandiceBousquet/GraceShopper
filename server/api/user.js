const router = require('express').Router();
const User = require('../db/models/user');
const userNotFound = new Error(404);


router.get('/', (req,res,next) => {
    User.findAll()
    .then((users) => {
        res.json(users);
    })
    .catch(next);
})

router.post('/', (req,res,next) => {
    User.create(req.body)
    .then((user) => {
        res.json(user);
    })
    .catch(next);
})

router.get('/:id', (req,res,next) => {
    User.findById(req.params.id)
    .then((user) => {
        if(!user) {
            res.send(userNotFound)
        }else{
             res.json(user);
        }
       
    })
    .catch(next);
})

router.put('/:id', (req,res,next) => {
    User.update(req.body, {
        where:{
            id:req.params.id
        },
        returning:true
    })
    .then((user) => {
        if(!user[0]) {
            res.send(userNotFound)
        }else{
             res.json(user[1][0]);
        }
    })
    .catch(next);
})

router.delete('/:id', (req,res,next) => {
    User.destroy({
        where:{
            id:req.params.id
        }
    })
    .then((user) => {
        if(!user) {
            res.send(userNotFound)
        }else{
             res.json(user);
        }   
    })
    .catch(next);
})






module.exports = router;