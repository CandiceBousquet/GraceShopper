const app = require('../../server/app');
const supertest = require('supertest');
const expect = require('chai').expect;
const db = require('../../server/db').db;
const User = require('../../server/db').User;



describe('Testing /api/user', function() {



    beforeEach(function () {
      return  db.sync({force: true})
      .then(()=> {
         User.create({
              name:"Grant",
              email:"grant@gant.com",
              address:"1221 west 56th street",
              city:"New York",
              state:"NY",
              zipcode:"11211",
              isAdmin:true
            })
        })
    });




  it('respond with ALL users', function(done) {
    supertest(app)
      .get('/api/user')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.length(1);
        expect(res.body[0].name).to.eql('Grant');
        done();
      });
  });

  it('creates a new user', function(done) {
    supertest(app)
    .post('/api/user')
    .send({
          name:"Snappy Johnson",
          email:"SJ@gant.com",
          address:"1221 west 56th street",
          city:"New York",
          state:"NY",
          zipcode:"11211",
          isAdmin:false
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.name).to.eql('Snappy Johnson');
         expect(res.body.address).to.eql('1221 west 56th street');
        done();
      });
  });

  it('gets user by ID', function(done) {
    supertest(app)
    .get('/api/user/1')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.name).to.eql('Grant');
        done();
      });
  });

  it('Updates User', function(done) {
    supertest(app)
     .put('/api/user/1')
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

  it('Deletes User', function(done) {
    supertest(app)
     .delete('/api/user/1')
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });

});



       