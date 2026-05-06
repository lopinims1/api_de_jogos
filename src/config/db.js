import fs from 'fs/promises'

async function readGames() {
    const data = await fs.readFile('./src/data/games.json', 'utf-8');
    const games = JSON.parse(data);
    return games;
}

async function writeGames(games) {
    const data = JSON.stringify(games, null, 2)
    await fs.writeFile('./src/data/games.json', data, 'utf-8')
}

export { readGames, writeGames }