{
  /**
   * Type Assertions: ⛔ 사용하지 않는 것이 좋다.
   * 사용: 변수 뒤에 as string 또는 변수 앞에 <string>과 같이 사용
   * 불가피한 경우: JS에서 발생
   */
  // - 함수에서 any 타입을 반환하고, string을 실제로 반환할 때.
  function jsStrFunc(): any {
    return "hello";
  }

  // - ⛔ 하지만 result.length를 가져올 수 없음. => Type Assertion 사용
  const result = jsStrFunc();
  console.log((result as string).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // ⛔ runtime에서 에러 발생

  // 해당 타입을 확신할 때, [variableName]!.[methodName]과 같이 ! 활용
  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;
  numbers.push(2); // or numbers!.push(2);

  // selector 사용할 때! => class 선택자가 무조건 있다고 할 수 있는 경우에만 사용!
  const button = document.querySelector("class")!;
  // or 있는지 잘 모르겠다면! 아래와 같이 활용!
  if (button) {
    console.log(button.nodeValue);
  }
}
