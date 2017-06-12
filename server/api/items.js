const express = require('express');
const router = express.Router();
const Item = require('../db/models/item');
const Category = require('../db/models/category');
const Review = require('../db/models/review');
const itemNotFound = new Error(404);

router.get('/', (req, res, next) => {
    Item.findAll({
            include: [
                { model: Category }
            ]
        })
        .then(result => res.json(result))
        .catch(next)
})

router.get('/:itemId', (req, res, next) => {
    Item.findOne({
            where: {
                id: req.params.itemId
            },
            include: [
                { model: Category },
                { model: Review }
            ]
        })
        .then(result => {
            if (!result) {
                next(itemNotFound);
            } else {
                res.json(result);
            }
        })
        .catch(next)
})

router.put('/:itemId', (req, res, next) => {
    Item.update(req.body, {
            where: {
                id: req.params.itemId
            },
            returning: true
        })
        .then(result => {
            if (!result[0]) {
                next(itemNotFound);
            } else {
                res.json(result[1][0]);
            }
        })
        .catch(next)
})

router.delete('/:itemId', (req, res, next) => {
    Item.destroy({
        where: {
            id: req.params.itemId
        }
    })
    .then(result => {
        if (!result) {
            next(itemNotFound);
        } else {
            res.json(result);
        }
    }).catch(next);
})

router.post('/', (req, res, next) => {
    Item.create(req.body)
    .then(result => res.json(result))
    .catch(next);
})

router.post('/:itemId/review', (req, res, next) => {
    Review.create({
        content: req.body.review,
        rating: req.body.rating,
        userId: req.body.userId,
        itemId: req.params.itemId
    })
    .then(() => Item.findById(req.params.itemId))
    .then((item) => res.json(item))
    .catch(next);
})


module.exports = router;
