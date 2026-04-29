import express from 'express'
import { gameServices } from '../service/gamesService.js'
const route = express.Router();

route.get('/', async (req, res) => {
    const games = await gameServices.getAll()
    res.json(games)
});

route.get('/:id', async (req, res) => {
    const game = await gameServices.getById(req.params.id)
    if (!game) return res.status(404).json(
        {message: 'Game not found'}
    );

    res.json(game)
});

export default route;