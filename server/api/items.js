const express = require('express');
const router = express.Router();
const Item = require('../db/models/item.js')

router.get('/', (req, res, next) => {
    Item.findAll({
            include: {

            }
        })
        .then(result => res.json(result))
        .catch(next)
})

router.get('/:itemId', (req, res, next) => {
    Item.findAll({

        })
        .then(result => res.json(result))
        .catch(next)
})



module.exports = router