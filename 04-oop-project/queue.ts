{
  interface Queue {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  /**
   * Queue
   * 1. 선입선출
   * 2. push -> 요소 삽입
   * 3. pop -> 가장 앞에 넣은 것 출력
   */

  type QueueNode = {
    value: string;
    next?: QueueNode;
  };

  class QueueImpl implements Queue {
    private _size: number = 0;
    public head?: QueueNode;
    public tail?: QueueNode;

    get size(): number {
      return this._size;
    }

    push(value: string): void {
      const node: QueueNode = {
        value,
      };

      if (this.head == null && this.tail == null) {
        this.head = node;
        this.tail = node;
      }

      if (this.head != null && this.tail != null) {
        this.tail.next = node;
        this.tail = node;
      }

      this._size++;
    }

    pop(): string {
      if (this.head == null) {
        throw new Error("Queue is empty...!");
      }

      const value = this.head.value;

      if (this.head === this.tail) {
        this.tail = this.head.next;
      }

      this.head = this.head.next;

      this._size--;
      return value;
    }
  }

  const queue = new QueueImpl();

  queue.push("a");
  queue.push("b");
  queue.push("c");

  // console.log(queue.size);
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue);
}
