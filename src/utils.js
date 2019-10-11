module.exports = {
  pgn: {
    cure: str => str.split('{[#]} ').join(''),
    splitGames: str => str.split('[Event "?"]').map(str => `[Event "?"]${str}`).slice(1)
  }
}