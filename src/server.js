import express from 'express'
import route from './routes/gamesRoutes.js'
const app = express()
const PORT = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API de Jogos desenvolvida em grupo, por: Henrique Hoppen, Miguel Lopes, Eduardo Casanova e Fernando Zhang.')
})

app.use('/games', route)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})

