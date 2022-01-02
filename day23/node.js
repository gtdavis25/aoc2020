module.exports = class Node {
  constructor(label) {
    this.label = label;
  }

  appendAfter(node) {
    node.next = this.next;
    node.previous = this;
    this.next.previous = node;
    this.next = node;
  }

  removeAfter() {
    let node = this.next;
    this.next = node.next;
    node.next.previous = this;
    return node;
  }
};
