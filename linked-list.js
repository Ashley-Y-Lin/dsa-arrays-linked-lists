/** Node: node for a singly linked list. */

class Node {
  val = null;
  next = null;

  constructor(val) {
    this.val = val;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;
    this.tail = newNode;

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.tail === null) this.tail = newNode;
    if (this.head !== null) newNode.next = this.head;
    this.head = newNode;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.tail === null) throw new Error;

    let current = this.head;

    while (current !== null) {
      const poppedVal = this.tail.val;
      if (current.next === null) {
        this.head = null;
        this.tail = null;
        this.length -= 1;
        return poppedVal;
      }
      if (current.next === this.tail) {
        current.next = null;
        this.tail = current;
        this.length -= 1;
        return poppedVal;
      }

      current = current.next;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.head === null) throw new Error;

    let current = this.head;

    if (current.next === null) {
      this.head = null;
      this.tail = null;
      this.length -= 1;
    } else {
      this.head = current.next;
      this.length -= 1;
    }

    return current.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0) throw new Error;
    if (this.head === null) throw new Error;

    let current = this.head;

    for (let i = 0; i < idx; i++) {
      current = current.next;
      if (current === null) {
        throw new Error;
      }
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0) throw new Error;
    if (this.head === null) throw new Error;

    let current = this.head;

    for (let i = 0; i < idx; i++) {
      current = current.next;
      if (current === null) {
        throw new Error;
      }
    }

    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0) throw new Error;

    let newNode = new Node(val);

    if (idx === 0) {
      const prevHead = this.head;
      this.head = newNode;
      newNode.next = prevHead;
    }

    let current = this.head;

    for (let i = 1; i < idx; i++) {
      current = current.next;
      if (current === null) {
        throw new Error;
      }
    }

    if (current.next === null) {
      current.next = newNode;
      this.tail = newNode;
    } else {
      const prevNext = current.next;
      current.next = newNode;
      newNode.next = prevNext;
    }

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if ((idx < 0) || (idx > this.length - 1)) throw new Error;
    if (this.head === null) throw new Error;

    if (idx === 0) {
      const prevHead = this.head;
      if (prevHead.next !== null) {
        this.head = prevHead.next;
      } else {
        this.head = null;
        this.tail = null;
      }
      this.length -= 1;
      return prevHead.val;
    }

    let current = this.head;

    for (let i = 1; i < idx; i++) {
      current = current.next;
      if (current === null) {
        throw new Error;
      }
    }


    if (current.next === null) {
      this.tail = current;
      current.next = null;
      this.length -= 1;
    } else {
      const removed = current.next;
      current.next = removed.next;
      this.length -= 1;
      return removed.val;
    }
  }

  /** average(): return an average of all values in the list */

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

  /** reverseInPlace(): reverses a linked list in place, without
   * creating a new list or new nodes
   */

  reverseInPlace() {
    let originalHead = this.head;

    this.head = this.tail;

    let prev = originalHead.next;
    let current = this.head;
    let idx = 0;

    while (idx < this.length - 1) {
      if (this.head === prev) {
        originalHead.next = null;
        current.next = originalHead;
        this.tail = originalHead;
        break;
      } else {
        current.next = prev;
        prev = prev.next;
      }

      current = current.next;
      idx += 1;
    }


  }
}

module.exports = LinkedList;
