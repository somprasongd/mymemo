const request = require('supertest');
const expect  = require('expect');
var app = require('./server.js').app;
describe('Server', () => {
  describe('GET /', () => {
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Hello World!')
        .end(done)
    });
  });


  describe('GET /error', () => {
    // use with expect
    it('should return json object response', (done) => {
      request(app)
        .get('/error')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            error: "Page not found!"
          });
        })
        .end(done)
    });
  });

  describe('GET /users', () => {
    it('should return user object response', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'A',
            age: 22
          });
        })
        .end(done)
    });
  });
});
