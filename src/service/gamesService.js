import readGames from '../config/db.js'

class GamesServices {
    async getAll() {
        try {
            const games = await readGames()
            return games
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        const games = await readGames()
        const game = games.find(g => g.id === Number(id))
        return game
    }
};

export const gameServices = new GamesServices();