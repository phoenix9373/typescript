{
  // 1. Array: 2가지 방법 => generic 활용 여부
  const foods: string[] = ["🥙", "🥗", "🥫", "🌯", "🌮"]; // 선호
  const scores: Array<number> = [1, 3, 4, 5];

  // 전달받은 매개변수를 수정 금지할 때, generic을 활용하지 않는다.
  function printArray(fruits: readonly string[]) {
    // fruits.push("2"); // error
  }

  // 2. Tuple
  // - 언제 사용하는지: 배열에서 서로 다른 타입을 함께 담고 싶은 경우, 사용한다.
  // - 비추천 이유: 인덱스로 접근 시, 가독성이 많이 떨어짐.
  // - 대안: interface, type alias, class (대안으로 변경 가능하면 최대한 바꾸도록 한다.)
  // - 좋은 예: React의 useState
  let student: [string, number]; // string과 number를 담는 튜플 선언
  student = ["name", 23];
  student[0]; // name => student.name 등으로 하는 것이 좋다.
  student[1]; // 123
}
