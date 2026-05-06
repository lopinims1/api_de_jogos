import { readGames, writeGames } from '../config/db.js'

class GamesServices {

    async getAll() {
        try {
            const games = await readGames()
            return games
        } catch (error) {
            console.log(error);
        }
    };

    async getById(id) {
        const games = await readGames()
        const game = games.find(g => g.id === Number(id))
        return game
    };

    async create({ game, publisher, year }) {
        const games = await readGames();
        const newGame = {
            id: games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1,
            game,
            publisher,
            year
        };

        games.push(newGame)
        await writeGames(games)
        return newGame
    };

    async delete(id) {
        const games = await readGames()
        const index = games.findIndex(g => g.id === Number(id))

        if (index === -1) return null
        const [removed] = games.splice(index, 1)
        await writeGames(games)
        return removed
    };

    async update(id, { game, publisher, year }) {
        const games = await readGames()
        const index = games.findIndex(g => g.id === Number(id))
        if (index === -1) return null
        
        games[index] = { id: Number(id), game, publisher, year }
        await writeGames(games)
        return games[index]
    };

    async patch(id, fields) {
        const games = await readGames()
        const index = games.findIndex(g => g.id === Number(id))
        if (index === -1) return null

        games[index] = { ...games[index], ...fields }
        await writeGames(games)
        return games[index]
    };

};

export const gameServices = new GamesServices();