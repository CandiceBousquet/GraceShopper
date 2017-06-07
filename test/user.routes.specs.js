const app = require('../server');
const supertest = require('supertest');

const expect = require('chai').expect;
const db = require('../server/db').db;
const User = require('../server/db').User;



describe('GET /api/user', function() {
  beforeEach(function () {
        return  User.create({
            name:"Grant",
            email:"grant@gant.com",
            address:"1221 west 56th street",
            city:"New York",
            state:"NY",
            zipcode:"11211",
            isAdmin:true
        })
 
  });

  afterEach(function () {
    return db.sync({force: true});
  });

  it('respond with json', function(done) {
    supertest(app)
      .get('/api/user')
       .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
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

});