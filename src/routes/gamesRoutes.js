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
        { message: 'Game not found' }
    );

    res.json(game)
});

route.post('/', async (req, res) => {
    const { game, publisher, year } = req.body
    if (!game || !publisher || !year)
        return res.status(400).json({ message: 'game, publisher e year são obrigatórios' })
    const newGame = await gameServices.create({ game, publisher, year })
    res.status(201).json(newGame)
})

route.delete('/:id', async (req, res) => {
    const removed = await gameServices.delete(req.params.id)
    if (!removed) return res.status(404).json({ message: 'Game not found' })
    res.json({ message: 'Game deletado com sucesso', removed })
})

export default route;