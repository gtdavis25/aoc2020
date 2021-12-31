module.exports = class TicketValidator {
  constructor(rules) {
    this.rules = rules;
    this.score = 0;
  }

  isValid(ticket) {
    for (let field of ticket) {
      if (!this.rules.some((rule) => rule.isValid(field))) {
        this.score += field;
        return false;
      }
    }

    return true;
  }
};
