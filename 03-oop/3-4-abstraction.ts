/**
 * Abstraction: 추상화
 * 장점: Interface를 간단하고, 쉽게 만들어줌. 따라서 사용자가 메서드 활용을 쉽게 할 수 있도록 함.
 * 방법: 1. 접근제어자로 추상화, 2. Interface로 추상화
 * 과정: 외부에서 알 필요 없는 메서드에 private 키워드를 붙인다.
 * 설명: 외부 사용자는 CoffeeMachine 클래스에서 makeCoffee를 제외한
 *      - grindBeans(), preheat(), extract() 메서드는 알 필요가 없다.
 *      - 따라서 캡슐화(접근 제어자)를 이용한 추상화로 해당 메서드는 private 처리한다.
 *      - 추가로 Interface를 통해, CoffeeMachine이 어떤 메서드를 구현해야하는지 명시한다.
 *      - Interface가 없는 언어에서는 캡슐화로 추상화를 구현한다.
 */

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // Naming: interface 부분에 'I'를 붙이거나, class 부분을 더 명시적으로 바꾼다.
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // Interface 활용
  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  // implements CoffeeMaker => interface에 정의된 메서드를 모두 구현해야한다.
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    // 변수
    private static BEANS_GRAMM_PER_SHOT: number = 7; // static: 상수
    private coffeeBeans: number = 0; // 멤버변수

    // 생성자 함수
    private constructor(coffeeBeans: number) {
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
      // 3가지 과정으로 구분
      this.grindBeans(shots); // 1. 커피콩 갈기
      this.preheat(); // 2. 커피 기계 예열
      return this.extract(shots); // 3. 커피 추출
    }
  }

  // maker의 Type은 class(CoffeeMachine) or interface(CoffeeMaker)가 될 수 있다.
  // 1. CoffeeMachine 클래스로 생성한 instance는 모든 메서드(fillCoffeeBeans, makeCoffee)를 활용할 수 있다.
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);

  // 2. Interface로 추상화 => CoffeeMaker Interface로 타입을 지정한 instance
  // -> maker2는 fillCoffeeBeans에 접근할 수 없다.
  // -> Interface에 정의된 메서드에만 접근할 수 있기 때문이다.
  // -> 따라서 사용자가 사용할 수 있는 메서드를 Interface로 관리할 수 있다.(interface를 활용한 추상화 방법)
  const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
  maker2.makeCoffee(2);

  // 3. 또 다른 Interface로 타입을 정의해서 인스턴스 생성 => 해당 interface에 있는 메서드만 사용 가능.
  const maker3: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  maker3.fillCoffeeBeans(32);
  maker3.makeCoffee(2);
  maker3.clean();

  // 4. AmaBarista vs ProBarita => 서로 다른 클래스에 대해 역할이 다르다.
  // CoffeeMaker와 CommercialCoffeeMaker는 가능한 기능이 다름.(Commercial쪽이 더 많음)
  class AmaBaristaUser {
    constructor(private machine: CoffeeMachine) {
      // private을 붙이면 자동으로 this.machine = machines; 이 된다.
    }
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBaristaUser {
    constructor(private machine: CommercialCoffeeMaker) {
      // private을 붙이면 자동으로 this.machine = machines; 이 된다.
    }
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }
}
