const request = require('supertest');
const app = require('.')
const assert = require('assert')

describe('API Pokemon', function() {
  beforeEach(function() {
    app.set('data', [])
  })

  it('should create a Pokemon when calling POST /pokemons', function(done) {
		request(app)
      .post('/pokemons')
      .send({id: 1, name: 'Bulbizar'})
      .set('Content-Type', 'application/json')
      .expect(201)
      .end(done)
  })

  it('should get pokemons when calling GET /pokemons', function(done) {
    const data = [{id: 1, name: 'mew'}]
    app.set('data', data)
    request(app)
      .get('/pokemons')
      .end(function (err, res) {
        assert.deepStrictEqual(data, res.body)
        done()
      })
  })

  it('should get pokemons when calling GET /pokemons/:id', function(done) {
    const data = [{id: 1, name: 'mew'}, {id: 3, name: 'mewtwo'}]
    app.set('data', data)
    request(app)
      .get('/pokemons/3')
      .end(function (err, res) {
        assert.strictEqual(res.body.name, 'mewtwo')
        assert.strictEqual(res.body.id, 3)
        done()
      })
  })

  it('should delete pokemons when calling DELETE /pokemons/:id', function(done) {
    const data = [{id: 1, name: 'mew'}, {id: 3, name: 'mewtwo'}]
    app.set('data', data)
    request(app)
      .delete('/pokemons/3')
      .end(function (err, res) {
        assert.strictEqual(undefined, data.find(function(pokemon) {
          return pokemon.id === 3
        }))
        done()
      })
  })

})
