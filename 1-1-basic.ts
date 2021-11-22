{
  // Block으로 local Scope 생성

  /**
   * JavaScript 타입
   * Primitive: string, number, boolean, bigint, symbol, null, undefined
   * Object: function, array, object...
   */

  /**
   * TypeSciprt 타입
   */

  // number
  const num: number = 1;

  // string
  const str: string = "str";

  // boolean
  const isCheck: boolean = true;

  // ⛔ undefined: 값이 아직 결정되지 않음.
  // => 주로 or 연산과 함께 사용한다.
  let name: undefined; // 사용 X
  let age: number | undefined; // 사용 O
  age = undefined;
  age = 1;

  // ⛔ null: 값이 없음을 분명히 함.
  let company: null; // 사용 X
  // let person: string = null; // 사용 O
  let person2: string | null; // 사용 O

  // ⛔ unknown: 어떤 타입이 담길지 알 수 없음 -> JS에서 어떤 타입을 반환하는지 알 수 없는 경우.
  let notSure: unknown = 0;
  notSure = "string";
  notSure = 2;

  // ⛔ any: 아무 타입이나 담아도 괜찮다.
  let anything: any = 0;
  anything = "string";

  // void: 함수에서 return 값이 없으면 void 이다.
  function print(): void {
    console.log("hello");
    return;
  }

  // never: 함수 return 값은 없지만, Error를 던져야할 때 유용하다.
  // => return 값이 반드시 없어야한다.
  function throwError(message: string): never {
    // message -> server (log로 남김.)
    throw new Error(message);
    while (true) {}
  }

  // ⛔ object: 어떤 타입도 넣을 수 있다. 단, 사용하지 않는 것이 좋다.
  let obj: object;
  function acceptSomeObject(obj: object) {}

  acceptSomeObject({ name: "whale" });
  acceptSomeObject({ animal: "dog" });
}
