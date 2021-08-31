const request = require('supertest');
const app = require('.')

describe('API Pokemon', function() {
  it('should create a Pokemon when calling POST /pokemons', function(done) {
		request(app)
      .post('/pokemons')
      .send({id: 1, name: 'Bulbizar'})
      .set('Content-Type', 'application/json')
      .expect(201)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }

        done()
      })
  })
})
