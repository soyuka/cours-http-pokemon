const express = require('express')

const app = express()
const data = []
 
app.use(express.static('public'))
app.use(express.json())

/**
 * Créer un pokemon (CREATE)
 * POST /pokemons {id: 1, pokemon: 'Bulbizar'}
 */
app.post('/pokemons', function (req, res) {
  // Récupérer le body avec
  const pokemon = req.body
  data.push(pokemon)

  res.status(201).json(pokemon).end()
})
 
/**
 * Récupérer la liste des pokemons en base (READ)
 * GET /pokemons
 */
app.get('/pokemons', function (req, res) {
  res.status(200).json(data).end()
})

/**
 * Récupérer le pokémon X (READ)
 * GET /pokemons/1
 */
app.get('/pokemons/:id', function (req, res) {
  // Récupérer l'identifiant avec
  const id = req.params.id
  const pokemon = data.find(function(pokemon) {
    return pokemon.id === parseInt(id)
  })

  return res.json(pokemon)
})

/**
 * Mettre a jour le pokémon X (Update)
 * PUT /pokemon/1 {nom: 'Bulbizar'}
 */
app.put('/pokemons/:id', function (req, res) {
  const index = data.findIndex(function(pokemon) {
    return pokemon.id === parseInt(req.params.id)
  })

  data[index] = req.body

  res.status(200).end()
})

/**
 * Supprimer le pokemon X (Delete)
 * DELETE /pokemons/1
 */
app.delete('/pokemons/:id', function (req, res) {
  // Récupérer l'identifiant avec
  const id = req.params.id
  const index = data.findIndex(function(pokemon) {
    return pokemon.id === parseInt(id)
  })

  data.splice(index, 1)
  return res.status(204).end()
})

module.exports = app






