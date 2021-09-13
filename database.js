function Database(db) {
  async function put(pokemon) {
    await db.set(pokemon.id, pokemon)
  }

  async function get(id) {
    return await db.get(id)
  }

  async function del(id) {
    await db.delete(id)
  }

  async function getAll() {
    const all = await db.all()
    const data = []
    for (let id in all) {
      data.push(all[id])
    }

    return data

    // Ou bien: 
    // return Object.keys(all).map(id => all[id])
  }

  return {put, get, getAll, del}
}

module.exports = Database
