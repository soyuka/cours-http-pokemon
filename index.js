const express = require('express')

const app = express()
const port = 3000

const data = []
 
app.use(express.static('public'))
app.use(express.json())

/**
 * Créer un pokemon (CREATE)
 * POST /pokemons {id: 1, pokemon: 'Bulbizar'}
 */
app.post('/pokemons', function (req, res) {
})
 
/**
 * Récupérer la liste des pokemons en base (READ)
 * GET /pokemons
 */
app.get('/pokemons', function (req, res) {
})

/**
 * Récupérer le pokémon X (READ)
 * GET /pokemon/1
 */
app.get('/pokemon/:id', function (req, res) {
})

/**
 * Mettre a jour le pokémon X (Update)
 * PUT /pokemon/1 {nom: 'Bulbizar'}
 */
app.put('/pokemon/:id', function (req, res) {
})

/**
 * Supprimer le pokemon X (Delete)
 * DELETE /pokemon/1
 */
app.delete('/pokemon/:id', function (req, res) {
})

app.listen(port, () => {
    console.log(`API pokemon listening at http://localhost:${port}`)
})
