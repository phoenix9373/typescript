/**
 * Composition: 구성요소
 * 상속의 문제점: 수직적인 관계로 인해 수정에 대해 자식 클래스 모두가 영향을 받는다. 상속이 깊어지면 복잡해진다.
 * 해결: composition을 활용 -> 즉, dependency injection을 활용한다.
 * 의존성 주입은 중복되는 코드, 역할을 추출하여 하나의 기능으로 만들고, 중복되는 부분을 다른 곳에서 주입식으로 활용하도록 만드는 것을 말한다.
 * 장점: 코드의 재사용성을 높여준다.
 * 단점: 생성자 함수 안에 활용하는 요소(클래스)에 상당히 의존적이다. 즉, 여기서는 milk 추가와 sugar 추가 클래스에 대한 의존성이 높다.
 */

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean; // optional
    hasSugar?: boolean; // optional
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 부모 클래스
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
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

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots....`);
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

  // 구성요소 1: 우유 첨가
  class CheapMilkSteamer {
    private steaming(): void {
      console.log("Steaming the milk...");
    }
    makeMilk(coffee: CoffeeCup): CoffeeCup {
      this.steaming();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  // 구성요소 2: 설탕 추가
  class AutomaticSugarMixer {
    private getSugar(): void {
      console.log("Getting some sugar...");
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  // 구성요소 활용 1: 우유 첨가
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer
    ) {
      super(beans); // 부모 클래스의 생성자 함수
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkFrother.makeMilk(coffee);
    }
  }

  // 구성요소 활용 2: 설탕 추가
  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private sugar: AutomaticSugarMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  // 구성요소 활용 3: 우유 첨가 + 설탕 추가
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: CheapMilkSteamer,
      private sugar: AutomaticSugarMixer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // const machines: CoffeeMaker[] = [
  //   new CoffeeMachine(16),
  //   new CaffeLatteMachine(16, "21"),
  //   new SweetCoffeeMaker(16),
  //   new CoffeeMachine(16),
  //   new CaffeLatteMachine(16, "21"),
  //   new SweetCoffeeMaker(16),
  // ];
  // machines.forEach((machine) => {
  //   console.log("--------------------------------");
  //   machine.makeCoffee(1);
  // });
}
