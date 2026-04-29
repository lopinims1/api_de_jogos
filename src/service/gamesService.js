import games from '../data/games.json' assert { type: 'json' }
 
// Da uma bisolhada no JSON e retorna como um array
async function getAllGames() {
    return games
}
 
// Mostra um jogo específico com o id dele
async function getGameById(id) {
    const game = games.find(g => g.id === Number(id))
    return game || null
}
 
// Cria um novo gameles e salva no JSON
async function createGame(newGame) {
    const lastId = games.length > 0 ? games[games.length - 1].id : 0
    const game = {
        id: lastId + 1,
        game: newGame.game,
        publisher: newGame.publisher,
        year: newGame.year
    }
 
    games.push(game)
    return game
}
 
// Atualiza um gameles com o id dele no JSON
async function updateGame(id, updatedData) {
    const index = games.findIndex(g => g.id === Number(id))
 
    if (index === -1) return null
 
    games[index] = { ...games[index], ...updatedData, id: games[index].id }
    return games[index]
}
 
// Evapora o gameles com o id dele no JSON
async function deleteGame(id) {
    const index = games.findIndex(g => g.id === Number(id))
 
    if (index === -1) return null
 
    const deleted = games.splice(index, 1)
    return deleted[0]
}
 
export {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}
