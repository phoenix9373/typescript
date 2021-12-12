{
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  type StackNode = {
    readonly value: string;
    readonly next?: StackNode;
  };

  class StackImpl implements Stack {
    private _size: number = 0;
    private head?: StackNode;
    get size() {
      return this._size;
    }
    constructor(private capacity: number) {}

    push(value: string): void {
      if (this._size === this.capacity) {
        throw new Error('Stack is full...!')
      }
      const node: StackNode = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    // string | undefined는 사용자가 항상 null 체크를 해야하기 때문에 비추..!
    pop(): string {
      // null === undefined는 false이다. 즉, this.head === undefined이면 null일 때 통과할 수도 있다.
      // null == undefined는 true이다. 즉, this.head == null이면, null과 undefined를 모두 체크할 수 있다.
      if (this.head == null) {
        throw new Error("Stack is empty..!");
      }

      const node = this.head;
      this.head = node.next;
      this._size--;

      return node.value;
    }
  }

  const stack = new StackImpl(3);
  stack.push("a");
  stack.push("b");
  stack.push("c");
  stack.push("d");
  while (stack.size !== 0) {
    console.log(stack.size);
    console.log(stack.pop());
  }
  console.log(stack.pop()); // Error
}
