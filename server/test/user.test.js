const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
after((done)=> {
    User.deleteMany()
    .then(results => {
        done()
    }) 
    .catch(err => {
        done()
    })
})

describe("USER ROUTES" , () => {
    describe("/POST CREATE USER", () => {
        it("should return new user data",function (done) {
            const user = {
                username: "johndoe",
                email: "mail@mail.com",
                password: "123456"
            }
            chai.request(app)
            .post('/user')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.an('object')
                expect(res.body.username).to.be.a('string')
                expect(res.body.email).to.be.a('string')
                expect(res.body.password).to.be.a('string')
                expect(res.body.password).not.equal(user.password)
                done()
            })
        });

        it("should return error on create user", function (done) {
            const user = {
                username: "johndoe",
                email: "test",
                password: "2222"
            }
            chai.request(app)
            .post('/user')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(404)
                expect(res.body).to.be.an("array")
                done()
            })

        })
    });
    describe("/POST SIGN IN USER", () => {
        it("should return user token, username and id", function (done) {
            const user = {
                email: "mail@mail.com",
                password: "123456"
            }
            chai.request(app)
            .post("/user/signIn")
            .type('form')
            .send(user)
            .end((err, res) => {
                expect(res).to.be.an("object")
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('id')
                done()
            })
        })
        it("should return error with invalid email and invalid password", function (done) {
            const user = {
                email: "123@mail.com",
                password: "456789"
            }

            chai.request(app)
            .post("/user/signIn")
            .type('form')
            .send(user)
            .end((err, res) => {
                expect(res).to.be.an("object")
                expect(res).to.have.status(404)
                expect(res.body).to.equal("username / password wrong")
                expect(res.body).to.have.lengthOf.at.least(1)
                done()
            })
        })
        it("should return error with empty email and empty password", function(done){
            const user = {
                email: "",
                password: ""
            }

            chai.request(app)
            .post('/user/signIn')
            .type('form')
            .send(user)
            .end((err, res) => {
                expect(res).to.be.an("object")
                expect(res).to.have.status(404)
                expect(res.body).to.equal("username / password wrong")
                expect(res.body).to.have.lengthOf.at.least(1)
                done()
            })
        })
    })
});