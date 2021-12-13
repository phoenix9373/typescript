{
  // Stack이라는 interface는 T라는 타입을 받을 수 있다.
  // T는 push와 pop에서 각각 인자와 리턴값의 타입이다.
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  };

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0;
    private head?: StackNode<T>;
    get size() {
      return this._size;
    }
    constructor(private capacity: number) {}

    push(value: T): void {
      if (this._size === this.capacity) {
        throw new Error("Stack is full...!");
      }
      // Type Inference: this.head에 할당하므로, 타입 추론이 명시적으로 StackNode<T>를 가리킨다.
      const node = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    // string | undefined는 사용자가 항상 null 체크를 해야하기 때문에 비추..!
    pop(): T {
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

  // **타입을 명시하지 않으면 unknown으로 되어있다.
  const stack = new StackImpl<number>(3);
  stack.push(3);
  stack.push(2);
  stack.push(4);
  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  const stack2 = new StackImpl<string>(3);
  stack2.push("3");
  stack2.push("2");
  stack2.push("4");
  while (stack2.size !== 0) {
    console.log(stack2.pop());
  }
}
