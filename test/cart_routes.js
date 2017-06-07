const app = require('../server/app');
const supertest = require('supertest');
const expect = require('chai').expect;
const db = require('../server/db').db;
const Cart = require('../server/db').Cart;





describe('Testing /api/cart', function() {

  beforeEach(function () {
    return  db.sync({force:true})
      .then(()=> {
        return Order.create({
          id:2,
          userId:1,
          submitted: false
        })
        .then(order => {
          return Item.create({
            name:"Snarf",
            description:"He was a memeber of the Thundercats. He was really annoying",
            price:100,
            imageUrl:"www.thundercats.com/Snarf"
          });
      });
    });
  });

  it('finds existing orders', function(done) {
    supertest(app)
      .post('/api/cart/item/1')
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

  it('deletes an order', function(done) {
    supertest(app)
      .delete('/api/cart/order/2')
      .expect(200)
      .end(function(err, res) {
        done();
      });
    });

});
