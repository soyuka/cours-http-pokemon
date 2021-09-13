const port = 3000
const MaDatabase = require('../database.js')
const { Database } = require('ark.db')
const Api = require('../index.js')

const arkDb = new Database()
const db = MaDatabase(arkDb)
const api = Api(db)

api.listen(port, () => {
    console.log(`API pokemon listening at http://localhost:${port}`)
})

