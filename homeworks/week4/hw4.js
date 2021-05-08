const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': 'o68cz37u9fo4vin7xmuigdqwga8seh',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}
request(options, (err, res, body) => {
  const topGames = JSON.parse(body).top
  for (let i = 0; i < topGames.length; i++) {
    console.log(topGames[i].viewers, topGames[i].game.name)
  }
})
