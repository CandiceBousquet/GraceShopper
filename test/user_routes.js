const express = require('express');
const app = express();
var expect = require('chai').expect;
const supertest = require('supertest');
const agent = supertest.agent(app);
const db = require('../server/db').db;
const User = require('../server/db').User;


describe('Testing User API Routes', function () {

  beforeEach(function () {
    //  db.sync({force: true})
    // .then((newDb) => {
        return  User.create({
            name:"Grant",
            email:"grant@gant.com",
            address:"1221 west 56th street",
            city:"New York",
            state:"NY",
            zipcode:"11211",
            isAdmin:true
        })
    // })
  });

//   afterEach(function () {
//     return db.sync({force: true});
//   });

it('Gets All Users', function (done) {
    agent
    .get('/api/user/')
    .expect(200)
    .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body).to.have.length(1);
        done();
    });
  });

})