/**
 * 2. CoffeeMachine 클래스를 생성
 * cofeeBeans 변수가 마찬가지로 있어야 하고,
 * makeCoffee 함수가 있어야한다.
 * Test 할 수 있는 함수까지 생성한다.
 */
{
  class CoffeeMaker {
    static BEANS_GRAMM_PER_SHOT: number = 7; // 멤버변수(class level) => 생성할 때마다 중복 호출된다.
    coffeeBeans: number = 0; // 멤버변수(instance level)

    //
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans; // 생성자 함수에 전달된 값만큼 내부 변수 정의
    }

    makeCoffee(shots: number): CoffeeCup {
      if (shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT > this.coffeeBeans) {
        throw new Error("Not enough coffee beans!");
      }

      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }
  type CoffeeCup = {
    shots: number; // shot 몇 개가 들어갔는지
    hasMilk: boolean; // 우유 첨가 여부
  };

  const maker = new CoffeeMaker(28); // new: instance를 만든다 / (): 생성자 호출
  console.log(maker);
}
