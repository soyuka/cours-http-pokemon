const express = require('express')

function Api(db) {
  const app = express()
  
  app.use(express.static('public'))
  app.use(express.json())

  /**
  * Créer un pokemon (CREATE)
  * POST /pokemons {id: 1, pokemon: 'Bulbizar'}
  */
  app.post('/pokemons', async function (req, res) {
    // Récupérer le body avec
    const pokemon = req.body
    await db.put(pokemon)

    res.status(201).json(pokemon).end()
  })
  
  /**
  * Récupérer la liste des pokemons en base (READ)
  * GET /pokemons
  */
  app.get('/pokemons', async function (req, res) {
    const data = await db.getAll()
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
  app.get('/pokemons/:id', async function (req, res) {
    // Récupérer l'identifiant avec
    const id = parseInt(req.params.id)
    const pokemon = await db.get(id)
    return res.json(pokemon)
  })

  /**
  * Mettre a jour le pokémon X (Update)
  * PUT /pokemon/1 {nom: 'Bulbizar'}
  */
  app.put('/pokemons/:id', async function (req, res) {
    const id = parseInt(req.params.id)
    const pokemon = await db.get(id)

    if (!pokemon) {
      return res.status(404).end()
    }

    await db.put(req.body)

    res.json(await db.get(id)).status(200).end()
  })

  /**
  * Supprimer le pokemon X (Delete)
  * DELETE /pokemons/1
  */
  app.delete('/pokemons/:id', async function (req, res) {
    // Récupérer l'identifiant avec
    const id = parseInt(req.params.id)
    await db.del(id)
    return res.status(204).end()
  })

  return app
}

module.exports = Api
