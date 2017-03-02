const assert = require('assert')
const request = require('supertest')
const app = require('../../app')

describe('POST /rest/signin', function() {
  it('respond with json', function(done) {
    request(app)
      .post('/rest/signin')
      .send({ username: 'test', password: '123' })
      .type('application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)

        console.log(JSON.stringify(res.body))
        assert.equal(res.body.status.code, 0)
        done()
      })
  })
})
