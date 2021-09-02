const express = require('express')

const app = express()
 
app.set('data', [{id: 1, name: 'mew'}, {id: 2, name: 'mewtwo'}, {id: 3, name: 'salameche'}])
app.use(express.static('public'))
app.use(express.json())

/**
 * Créer un pokemon (CREATE)
 * POST /pokemons {id: 1, pokemon: 'Bulbizar'}
 */
app.post('/pokemons', function (req, res) {
  // Récupérer le body avec
  const pokemon = req.body
  const data = app.get('data')
  data.push(pokemon)

  res.status(201).json(pokemon).end()
})
 
/**
 * Récupérer la liste des pokemons en base (READ)
 * GET /pokemons
 */
app.get('/pokemons', function (req, res) {
  const data = app.get('data')
  res.status(200)

  res.format({
    json: function() {
      res.send(data)
    },
    html: function() {
      res.send(`<ul>
        ${data.map(pokemon => `<li>${pokemon.name}</li>`).join('')}
      </ul>`)
    }
  })
})

/**
 * Récupérer le pokémon X (READ)
 * GET /pokemons/1
 */
app.get('/pokemons/:id', function (req, res) {
  // Récupérer l'identifiant avec
  const id = req.params.id
  const data = app.get('data')
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
  const data = app.get('data')
  const index = data.findIndex(function(pokemon) {
    return pokemon.id === parseInt(req.params.id)
  })

  if (index === -1) {
    return res.status(404).end()
  }

  data[index] = req.body

  res.json(data[index]).status(200).end()
})

/**
 * Supprimer le pokemon X (Delete)
 * DELETE /pokemons/1
 */
app.delete('/pokemons/:id', function (req, res) {
  const data = app.get('data')
  // Récupérer l'identifiant avec
  const id = req.params.id
  const index = data.findIndex(function(pokemon) {
    return pokemon.id === parseInt(id)
  })

  data.splice(index, 1)
  return res.status(204).end()
})

module.exports = app
