{
  /**
   * 아래 함수의 문제점: number만 사용 가능.
   * @param arg number
   * @returns number
   */
  function badCheckNotNull(arg: number | null): number {
    if (arg == null) {
      throw new Error("Invalid number");
    }

    return arg;
  }

  // bad
  function checkNotNullBad(arg: any | null): any {
    if (arg == null) {
      throw new Error("Invalid number");
    }

    return arg;
  }

  // **good: generic 활용 -> <T> 통상적인 타입 모두.
  // 여기서 T는 사용자가 전달하는 인자에 대응하는 타입.
  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error("Invalid number");
    }

    return arg;
  }
  const result = checkNotNull(123); // compile 시점에 GENERIC 타입이 number로 정의된다.
  const str: string = checkNotNull("123"); // compile 시점에 GENERIC 타입이 string로 정의된다.
}
