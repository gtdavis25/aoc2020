module.exports = class TicketRule {
  constructor(field, l1, h1, l2, h2) {
    this.field = field;
    this.l1 = l1;
    this.h1 = h1;
    this.l2 = l2;
    this.h2 = h2;
  }

  isValid(field) {
    return (
      (this.l1 <= field && field <= this.h1) ||
      (this.l2 <= field && field <= this.h2)
    );
  }
};
