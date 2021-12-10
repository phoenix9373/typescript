/**
 * 4. 추상화(abstraction)
 *
 *
 */
{
  type CoffeeCup = {
    shots: number; // shot 몇 개가 들어갔는지
    hasMilk: boolean; // 우유 첨가 여부
  };

  // 집에서만 사용하는 커피 메이커라면? 어떤 메서드를 가져야할까?
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 카페에서 사용하는 커피 메이커라면? 어떤 메서드를 가져야할까?
  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // 멤버변수(class level) => 생성할 때마다 중복 호출된다.
    private coffeeBeans: number = 0; // 멤버변수(instance level)

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans; // 생성자 함수에 전달된 값만큼 내부 변수 정의
    }

    // 메서드를 이용하여 객체를 생성하는 경우, 생성자 함수를 통한 객체 생성을 제한한다.
    // constructor에 private 키워드를 붙인다. new 키워드는 내부 생성자 함수를 참고하여 사용한다.
    static makeCoffeeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    // 커피콩이 얼마나 있는지 확인
    checkCoffeeBeans() {
      console.log(`Remain ${this.coffeeBeans} coffeeBeans!`);
    }

    // 커피콩 채우기
    // 직접 접근을 제한하고, 변수 값을 받아서 조건을 검사하면 더 안전하게 코딩 가능하다.
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("Value for beans should be greater than 0");
      }
      console.log(`fill the coffee beans about ${beans}`);
      this.coffeeBeans += beans;
    }

    clean() {
      console.log("cleaning the coffee machine...");
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT > this.coffeeBeans) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up...!");
    }

    private extract(shots: number): CoffeeCup {
      console.log("Pulling up Coffee");
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeCoffeeMachine(28);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  // amateur.makeCoffee();
  pro.makeCoffee();
}
