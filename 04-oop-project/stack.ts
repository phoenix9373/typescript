/**
 * Stack 클래스 구현
 * 1. push
 * 2. pop
 *
 * 요소를 가지고 있어야한다.
 */

type StackNode = {
  readonly value: string;
  readonly next?: StackNode;
};

class NodeElement {
  public value: string;
  public next: NodeElement | null = null;

  constructor(value: string, next: NodeElement | null) {
    this.value = value;
    this.next = next;
  }

  getValue(): string {
    return this.value;
  }

  getNextNode(): NodeElement | null {
    return this.next;
  }
}

interface Stack {
  readonly size: number;
  push(value: string): void;
  pop(): string | null;
}

class StackImpl implements Stack {
  // private과 getter를 조합해서 size를 사용하는 이유: 내부에서는 접근 가능, 외부에서는 조회만 가능하도록 만듦
  // 변수 앞에 _ 를 추가한다.
  private _size: number = 0;

  // setter가 없으므로, 외부에서 수정 불가능.
  get size() {
    return this._size;
  }
  private head: NodeElement | null = null;

  push(value: string): void {
    if (this.head === null) {
      this.head = new NodeElement(value, null);
    } else {
      const nextNode = new NodeElement(value, this.head);
      this.head = nextNode;
    }
    this._size++;
  }

  pop(): string | null {
    if (this.head === null) {
      throw Error("Stack is empty...!");
    }

    const popValue = this.head.getValue();
    const nextHead = this.head.getNextNode();

    this._size--;
    this.head = nextHead;
    return popValue;
  }
}

const stack = new StackImpl();
stack.push("a");
stack.push("b");
stack.push("c");
console.log(stack.size);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.size);
console.log(stack.pop());
console.log(stack.size);
