/**
 * Generic에 조건을 설정하는 방법
 */

interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log(`full time!!`);
  }
  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log(`part time!!`);
  }
  workPartTime() {}
}

// 안 좋은 예시: 세부적인 타입을 인자로 받아서, 추상적인 타입으로 다시 리턴하는 함수는 ❌
function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
}

// 조건 설정: extends로 Employee를 구현한 타입만 가능하다.
function pay<T extends Employee>(employee: T): T {
  // T는 일반적인 타입으로, pay 메서드가 있는지 알 수 없다.
  employee.pay();
  return employee;
}

const jin = new FullTimeEmployee();
const jack = new PartTimeEmployee();

jin.workFullTime();
jack.workPartTime();

const jinAfterPay = pay(jin);
const jackAfterPay = pay(jack);

// *문제점: jinAfterPay는 workFullTime을 잃어버린다.
// *이유: 세부 클래스의 정보를 pay 단계에서 잃어버리기 때문이다.
// *좋지 않은 해결: const jinAfterPay = pay(jin) as FullTimeEmployee;
// *좋은 해결: generic 활용

/**
 * Generic with Object
 * getValue 구현하기
 */

const obj = {
  name: "ellie",
  age: 20,
};

const obj2 = {
  animal: "🐒",
};

// *keyof: T 안에 있는 key 중 하나.
// *T[K]: T의 K 값을 반환한다.
function getValue<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

console.log(getValue(obj, "name")); // ellie
console.log(getValue(obj, "age")); // 20
console.log(getValue(obj2, "person")); // Error: type check
