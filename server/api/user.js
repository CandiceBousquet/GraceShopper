const router = require('express').Router();
const User = require('../db/models/user');



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
        res.json(user);
    })
    .catch(next);
})

router.put('/:id', (req,res,next) => {
    User.update(req.body)
    .then((user) => {
        res.json(user);
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
        res.json(user);
    })
    .catch(next);
})






module.exports = router;