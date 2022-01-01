module.exports = class RecursiveCombat {
  static results = new Map();

  constructor(player1, player2) {
    this.players = [[...player1], [...player2]];
    this.history = new Set();
  }

  play() {
    while (this.players[0].length && this.players[1].length) {
      let state = this.getState();
      if (this.history.has(state)) {
        return 0;
      }

      this.history.add(state);
      this.nextRound();
    }

    return this.players[0].length ? 0 : 1;
  }

  getState() {
    return this.players.map((deck) => deck.join(",")).join(":");
  }

  nextRound() {
    let card1 = this.players[0].shift();
    let card2 = this.players[1].shift();
    let winner;
    if (this.players[0].length >= card1 && this.players[1].length >= card2) {
      winner = this.playSubgame(card1, card2);
    } else {
      winner = card1 > card2 ? 0 : 1;
    }

    if (winner === 0) {
      this.players[0].push(card1, card2);
    } else {
      this.players[1].push(card2, card1);
    }
  }

  playSubgame(card1, card2) {
    let deck1 = first(this.players[0], card1);
    let deck2 = first(this.players[1], card2);
    let subgame = new RecursiveCombat(deck1, deck2);
    let state = subgame.getState();
    if (RecursiveCombat.results.has(state)) {
      return RecursiveCombat.results.get(state);
    }

    let result = subgame.play();
    RecursiveCombat.results.set(state, result);
    return result;
  }
};

function first(list, count) {
  let newList = [];
  for (let i = 0; i < count; i++) {
    newList.push(list[i]);
  }

  return newList;
}
