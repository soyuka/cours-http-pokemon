const app = require('../index.js')
const port = 3000

app.listen(port, () => {
    console.log(`API pokemon listening at http://localhost:${port}`)
})
