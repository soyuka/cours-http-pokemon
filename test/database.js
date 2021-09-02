const assert = require('assert')
const MaDatabase = require('../database.js')
const { Database } = require('ark.db')

describe('DataBase', function() {
  let db
  let arkDb

  beforeEach(function() {
    arkDb = new Database()
    db = MaDatabase(arkDb)
  })

  it('should add data', async function() {
    const pokemon = {id: 1, name: 'mew'}
    await db.put(pokemon)
    const pokemonSauvegarde = await arkDb.get(1)
    assert.deepStrictEqual(pokemon, pokemonSauvegarde)
  })

  it('should get data', async function() {
    const pokemon = {id: 1, name: 'mew'}
    await db.put(pokemon)
    assert.deepStrictEqual(pokemon, await db.get(1))
  })

  it('should get all data', async function() {
    const pokemon = {id: 1, name: 'mew'}
    await db.put(pokemon)
    const pokemon2 = {id: 2, name: 'mewtwo'}
    await db.put(pokemon2)
    assert.deepStrictEqual([pokemon, pokemon2], await db.getAll())
  })
})
