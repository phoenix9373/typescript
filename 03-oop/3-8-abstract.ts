/**
 * Abstract
 * 상속을 이용할 때, 자식 클래스에서만 기능이 달라지고, 반복적으로 사용되는 경우에 활용
 */

{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean; // optional
    hasSugar?: boolean; // optional
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 부모
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    clean() {
      console.log("cleaning the machine...");
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up... ");
    }

    // 1. 자식 클래스에서만 접근하므로, protected
    // 2. abstract는 추상적으로만 구현하므로, 자식에서 기능이 달라진다는 것을 의미함.
    // 3. 부모 클래스에서 구현 부분이 없어야한다.
    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  // 자식
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans); // 부모 클래스의 생성자 함수
    }
    private steamMilk(): void {
      console.log("Steaming some milk... ");
    }

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  // 자식
  class SweetCoffeeMaker extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: CoffeeMaker[] = [
    new CaffeLatteMachine(16, "21"),
    new SweetCoffeeMaker(16),
    new CaffeLatteMachine(16, "21"),
    new SweetCoffeeMaker(16),
  ];
  machines.forEach((machine) => {
    console.log("--------------------------------");
    machine.makeCoffee(1);
  });
}
