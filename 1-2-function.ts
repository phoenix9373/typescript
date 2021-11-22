{
  // 1. JavaScript ⛔
  function jsAdd(num1, num2) {
    // 사용하지 않는 이유
    // 1. 어떤 값이 들어올지 모름. 어떤 값이 return 되는지 모름.
    // 2. str + str도 가능함.
    return num1 + num2;
  }

  // 1. TypeScript ✅
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // 2. JavaScript ⛔
  function jsFetchNum(id) {
    // code...
    // code...
    // code가 많아서 어떤 역할을 하는지 눈에 바로 안 들어옴.
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // 2. TypeScript ✅
  // number를 return하는 Promise 객체 return
  // Promise => fetch한 이후에 number를 다시 return 한다라고 하면 <> 안에 해당 return 타입을 기입한다.
  function fetchNum(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }
}
