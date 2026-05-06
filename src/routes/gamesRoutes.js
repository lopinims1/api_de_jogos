import express from 'express'
import { gameServices } from '../service/gamesService.js'
const route = express.Router();

route.get('/', async (req, res) => {
    const games = await gameServices.getAll()
    res.json(games)
});

route.get('/:id', async (req, res) => {
    const game = await gameServices.getById(req.params.id)
    if (!game) return res.status(404).json({ message: 'Game not found' })
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

route.put('/:id', async (req, res) => {
    const { game, publisher, year } = req.body

    if (!game || !publisher || !year)
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' })

    const updatedGame = await gameServices.update(req.params.id, { game, publisher, year })
    if (!updatedGame) return res.status(404).json({ message: 'Game not found' })
    res.json(updatedGame)
})

route.patch('/:id', async (req, res) => {
    const fields = {}
    if (req.body.game !== undefined) fields.game = req.body.game
    if (req.body.publisher !== undefined) fields.publisher = req.body.publisher
    if (req.body.year !== undefined) fields.year = req.body.year

    if (Object.keys(fields).length === 0)
        return res.status(400).json({ message: 'Nenhum campo enviado' })

    const updatedGame = await gameServices.patch(req.params.id, fields)
    if (!updatedGame) return res.status(404).json({ message: 'Game not found' })
    res.json(updatedGame)
})

export default route;