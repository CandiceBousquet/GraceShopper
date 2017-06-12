const app = require('../../server/app');
const supertest = require('supertest');
const expect = require('chai').expect;
const db = require('../../server/db').db;
const Item = require('../../server/db').Item;



describe('Testing /api/items', function() {

    beforeEach(function () {
      return  db.sync({force:true})
      .then(()=> {
         Item.create({
              name:"Snarf",
              description:"He was a memeber of the Thundercats. He was really annoying",
              price:100,
              imageUrl:"www.thundercats.com/Snarf"
            })
        })
    });




  it('respond with ALL Items', function(done) {
    supertest(app)
      .get('/api/items')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.length(1);
        expect(res.body[0].name).to.eql('Snarf');
        done();
      });
  });

  it('creates a new Item', function(done) {
    supertest(app)
    .post('/api/items')
    .send({
        name:"Kant",
        description:"German Philosopher",
        price:100,
        imageUrl:"www.metaphysics.com/Kant"
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.name).to.eql('Kant');
        expect(res.body.description).to.eql('German Philosopher');
        done();
      });
  });

  it('gets Item by ID', function(done) {
    supertest(app)
    .get('/api/items/1')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.name).to.eql('Snarf');
        done();
      });
  });

  it('Updates Item', function(done) {
    supertest(app)
     .put('/api/items/1')
      .send({
          name: 'Steven'
        })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.name).to.eql('Steven');
        done();
      });
  });

  it('Deletes Item', function(done) {
    supertest(app)
     .delete('/api/items/1')
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });

});