import { readArtists } from '../config/db.js'
 
class GamesServices {
    async getAll() {
        try {
            const games = await readArtists()
            return artists
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        const games = await readArtists()
        const game = games.find(g => g.id === Number(id))
        return game
    }
};

export const gameServices = new GamesServices();