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
    private coffeeBeans: number;

    constructor(
      coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
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

      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // 구성요소 1의 interface
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  // 구성요소 2의 interface
  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 구성요소 1: Cheap한 우유 첨가 -> MilkFrother라는 interface의 규격을 구현한 클래스
  class CheapMilkSteamer implements MilkFrother {
    private steaming(): void {
      console.log("Steaming the milk...");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steaming();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 구성요소 2: Fancy한 우유 첨가
  class FancyMilkSteamer implements MilkFrother {
    private steaming(): void {
      console.log("Fancy Steaming the milk...");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steaming();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 구성요소 3: Cold한 우유 첨가
  class ColdMilkSteamer implements MilkFrother {
    private steaming(): void {
      console.log("Cold Steaming the milk...");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steaming();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 구성요소 3-1: 우유 미첨가
  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // 구성요소 4: Candy 설탕 추가 -> SugarProvider라는 interface의 규격을 구현한 클래스
  class CandySugarMixer implements SugarProvider {
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

  // 구성요소 5: 설탕 추가
  class SugarMixer implements SugarProvider {
    private getSugar(): void {
      console.log("Getting some sugar from jar..!");
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  // 구성요소 5-1: 설탕 미첨가
  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  /**
   * Composition의 문제점
   * 1. 재사용성이 떨어진다.
   * - 만약 CaffeLatteMachine이 '서울우유'만 취급가능하다면?(다른 우유는 불가하다면?)
   * - Sugar도 마찬가지로 백설탕만 가능하다면?
   * 해결: Interface를 통해 클래스 간 의사소통을 하는 것이 좋다.
   * 주의: OverEngineering하지마라. 기간이 타이트한데, 확장성만 너무 고려하거나 코드의 퀄리티만 고집하지않는다.
   */

  // milk, sugar provider
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  // machine
  const sweetMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, sugar); // 같은 클래스로, 다른 객체를 전달하여 인스턴스 생성

  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  const fancyLatteMachine = new CoffeeMachine(12, fancyMilkMaker, noSugar);

  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
}
