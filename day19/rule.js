module.exports = class Rule {
  constructor(id, rule) {
    this.id = id;
    this.rule = rule;
  }

  static parse(s) {
    let match = s.match(/^(\d+): (.*)$/);
    if (!match) {
      throw new Error("Invalid rule: " + s);
    }

    let [, id, rule] = match;
    return new Rule(parseInt(id), rule);
  }

  match(rules, input, start = 0) {
    let match = this.rule.match(/^"[a-z]"$/);
    if (match) {
      return this.matchLiteral(input, start);
    }

    match = this.rule.match(/^\d+( \d+)*$/);
    if (match) {
      return this.matchConcatenation(rules, input, this.rule, start);
    }

    match = this.rule.match(/^\d+( \d+)* \| \d+( \d+)*$/);
    if (match) {
      return this.matchAlternation(rules, input, start);
    }

    throw new Error("Invalid rule: " + this.rule);
  }

  matchLiteral(input, start) {
    if (input[start] === this.rule[1]) {
      return { match: true, length: 1 };
    } else {
      return { match: false };
    }
  }

  matchConcatenation(rules, input, rule, start) {
    let totalLength = 0;
    let subRules = rule.split(" ").map((ruleId) => rules[parseInt(ruleId)]);
    for (let subRule of subRules) {
      let { match, length } = subRule.match(rules, input, start + totalLength);
      if (!match) {
        return { match: false };
      }

      totalLength += length;
    }

    return { match: true, length: totalLength };
  }

  matchAlternation(rules, input, start) {
    let options = this.rule.split(" | ");
    for (let option of options) {
      let { match, length } = this.matchConcatenation(
        rules,
        input,
        option,
        start
      );
      if (match) {
        return { match, length };
      }
    }

    return { match: false };
  }
};
