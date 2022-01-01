module.exports = class Combat {
  constructor(player1, player2) {
    this.players = [[...player1], [...player2]];
  }

  play() {
    while (this.players[0].length && this.players[1].length) {
      this.nextRound();
    }

    return this.players[0].length ? 0 : 1;
  }

  nextRound() {
    let card1 = this.players[0].shift();
    let card2 = this.players[1].shift();
    if (card1 > card2) {
      this.players[0].push(card1, card2);
    } else {
      this.players[1].push(card2, card1);
    }
  }
};
