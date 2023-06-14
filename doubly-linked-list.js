/** Node: node for a doubly linked list. */

class Node {
  val = null;
  next = null;
  prev = null;

  constructor(val) {
    this.val = val;
  }
}

class DoublyLinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /** get(idx) returns a node at the given index */

  _get(idx) {

  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      // list is empty
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } else {
      // list has things in it
      const currTail = this.tail;
      currTail.next = newNode;
      newNode.prev = currTail;
      this.tail = newNode;
      this.length += 1;
    }
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      // list is empty
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } else {
      // list has things in it
      const currHead = this.head;
      newNode.next = currHead;
      currHead.prev = newNode;
      this.head = newNode;
      this.length += 1;
    }
  }

  /** pop(): remove last item & return its value */

  pop() {
    const prevLast = this.tail;

    if (this.length === 1) {
      // list has one item
      this.head = null;
      this.tail = null;
      this.length -= 1;
    } else {
      // list has > 1 item
      const newLast = this.tail.prev;
      newLast.next = null;
      this.tail = newLast;
      this.length -= 1;
    }

    return prevLast.val;
  }

  /** shift(): remove first item & return its value */

  shift() {
    const prevFirst = this.head;

    if (this.length === 1) {
      // list has one item
      this.head = null;
      this.tail = null;
      this.length -= 1;
    } else {
      // list has > 1 item
      const newFirst = this.head.next;
      newFirst.prev = null;
      this.head = newFirst;
      this.length -= 1;
    }

    return prevFirst.val;
  }

  /** getAt(idx): get val at idx.*/

  getAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error; // index out of bounds

    if (this.head === null) throw new Error; // nothing in list

    let current = this.head;

    for (let i = 0; i < idx; i++) {
      current = current.next;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) throw new Error; // index out of bounds

    if (this.head === null) throw new Error; // nothing in list

    let current = this.head;

    for (let i = 0; i < idx; i++) {
      current = current.next;
    }

    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) throw new Error; // index out of bounds

    const newNode = new Node(val);
    let current = this.head;

    if (this.head === null) {
      // insert into empty list
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } else if (idx === this.length) {
      // insert at beginning of list
      this.push(val);
    } else if (idx === 0) {
      // insert at end of list
      this.unshift(val);
    } else {
      for (let i = 1; i < idx; i++) {
        current = current.next;
      }

      let prevNext = current.next;
      if (prevNext) {
        prevNext.prev = newNode;
      }

      newNode.prev = current;
      newNode.next = prevNext;
      current.next = newNode;
      this.length += 1;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error; // index out of bounds
    if (this.head === null) throw new Error; // nothing in list

    let current = this.head;

    if (idx === this.length - 1) {
      // remove at end of list
      return this.pop();
    } else if (idx === 0) {
      // remove at beginning of list
      return this.shift();
    } else {
      for (let i = 0; i < idx; i++) {
        current = current.next;
      }

      // current is the one being removed
      let afterCurr = current.next;
      let beforeCurr = current.prev;
      if (afterCurr) {
        beforeCurr.next = afterCurr;
        afterCurr.prev = beforeCurr;
      } else {
        beforeCurr.next = null;
        this.tail = beforeCurr;
      }

      this.length -= 1;

      return current.val;
    }
  }

  /** return average (mean) of list values. */

  average() {
    if (this.head === null) return 0;

    let current = this.head;
    let sum = 0;

    while (current !== null) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
}

module.exports = DoublyLinkedList;
