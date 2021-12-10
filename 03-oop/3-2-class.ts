/**
 * 객체지향적으로 '커피기계' 만들기
 */

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    // 1. static 키워드 유/무
    // class 내에서는 변수를 선언할 때, const나 let을 사용하지 않는다.
    // static을 붙이지 않으면, 객체 생성마다 중복 선언된다 => 메모리 낭비
    // 클래스 변수는 this.BEANS_GRAMM_PER_SHOT => CoffeeMaker.BEANS_GRAMM_PER_SHOT로 접근한다.
    static BEANS_GRAMM_PER_SHOT: number = 7; // 클래스 변수
    coffeeBeans: number = 0; // 멤버 변수

    // 1-2. 메서드도 static으로 활용 가능
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // 2. instance를 만들 때, 항상 호출되는 함수
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // 3. method 정의(function 키워드를 선언하지 않아도 된다.)
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(32);
  console.log(maker); // CoffeeMaker { coffeeBeans: 32 }

  // static 메서드로 객체 생성
  // Math.[method]와 같이 클래스로 메서드를 바로 사용하는 예시
  const maker2 = CoffeeMaker.makeMachine(22);
  console.log(maker2);
}
