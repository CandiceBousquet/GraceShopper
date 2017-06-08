const app = require('../server/app');
const supertest = require('supertest');
const expect = require('chai').expect;
const db = require('../server/db').db;
const Cart = require('../server/db').Cart;
const Order = require('../server/db').Order;
const Item = require('../server/db').Item;





describe('Testing /api/cart for existing order', function() {

    beforeEach(function() {
        return db.sync({ force: true })
            .then(() => {
                return Order.create({
                        id: 2,
                        userId: 1,
                        submitted: false
                    })
                    .then(() => {
                        return Item.create({
                            name: 'Snarf',
                            description: 'He was a memeber of the Thundercats. He was really annoying',
                            price: 100,
                            imageUrl: 'www.thundercats.com/Snarf'
                        });
                    });
            });
    });

    it('finds existing order and adds item to order', function(done) {
        supertest(app)
            .post('/api/cart/item/1')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.length(1);
                expect(res.body[0].orderId).to.eql(2);
                expect(res.body[0].itemId).to.eql(1);
                done();
            });
    });


    it('gets a users cart', function(done) {
        supertest(app)
            .get('/api/cart/user/1')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.length(1);
                expect(res.body[0].id).to.eql(2);
                expect(res.body[0].submitted).to.eql(false);
                done();
            });
    });

    it('submits an order', function(done) {
        supertest(app)
            .put('/api/cart/order/2')
            .send({
                submitted: true
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body[0].submitted).to.eql(true)
                done();
            });
    });

    it('gets a users order history', function(done) {
        supertest(app)
            .get('/api/cart/user/1/history')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.length(1);
                expect(res.body[0].id).to.eql(2);
                expect(res.body[0].submitted).to.eql(true);
                done();
            });
    });

    it('deletes an order', function(done) {
        supertest(app)
            .delete('/api/cart/order/2')
            .expect(204)
            .end((err) => {
                console.error(err)
                done();
            });
    });

});

describe('Testing /api/cart for new order', function() {

    beforeEach(function() {
        return db.sync({ force: true })
            .then(() => {
                return Item.create({
                    name: 'Priya',
                    description: 'Have lunch with me!',
                    price: 50,
                    imageUrl: 'www.thundercats.com/Snarf'
                });
            });
    });


    it('creates a new order where none exists and adds item to order', function(done) {
        supertest(app)
            .post('/api/cart/item/1')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.length(1);
                expect(res.body[0].orderId).to.eql(1);
                expect(res.body[0].itemId).to.eql(1);
                done();
            })
    });

    it('removes item from order', function(done) {
        supertest(app)
            .delete('/api/cart/item/1')
            .expect(204)
            .end((err) => {
                console.error(err)
                done();
            });
    })
});