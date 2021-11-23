/**
 * Type Inference
 * 동작 방식: return 값 또는 매개변수 등에 대해 TS가 자동으로 타입을 추론하는 것.
 * 단점: 타입이 추론되도록 하는 것보다, 직접 타입을 지정해주는 것이 좋다.
 */

{
  // 1. primitive 값 추론
  let text = "hello"; // string으로 타입 추론
  // text = 1; // compile error

  function print(message: string) {
    // ... 표시는 any 타입을 가진다는 경고. 타입을 명시하는 것이 좋다.
    console.log(message);
  }

  // 2. 함수에서 타입 추론: return 값에 대해 number로 추론한다.
  function add(x: number, y: number) {
    return x + y;
  }
}
