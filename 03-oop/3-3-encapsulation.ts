/**
 * Encapsulation: 정보를 은닉하는 방법
 * public, private, protected를 활용하여 은닉한다.
 *
 * 1. private: 외부에서 접근불가.
 * 2. public: 기본값, 외부에서 접근 가능.
 * 3. protected: 외부에서 접근 불가, 상속한 자식 클래스는 접근 가능.
 */

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // 2. 따라서 private으로 선언한다.
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // 1. instance 또는 object를 생성하는 메서드를 제공하는 경우, 보통 생성자 함수를 금지한다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // private 변수인 coffeeBeans에 우회적인 접근 방법을 제공하는 메서드 정의
    fillCoffeeBeans(beans: number) {
      // 멤버변수인 coffeeBeans는 fillCoffeeBeans로만 변경 가능
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

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

  // 3. 생성 불가능
  // const maker = new CoffeeMaker(32);
  const maker = CoffeeMaker.makeMachine(32);

  /**
   * 문제점: 외부에서 maker.coffeeBeans를 바꿀 수 있다.
   * 해결: private 키워드로 coffeeBeans 데이터 보호
   * 결과: maker.coffeeBeans = -34; => invalid => private으로 compile error 발생
   *  */

  // 대안: 접근 가능한 메서드 활용
  // - fillCoffeeBeans 활용

  /**
   * Getter와 Setter
   * getter는 언제 사용? => 다른 멤버변수에 의존적인 멤버변수에 대해 업데이트가 필요할 때 사용한다.
   * setter는 언제 사용? => 특정 멤버변수에 대해 값을 재할당할 때 사용한다.
   */

  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      this.internalAge = num;
    }

    // 생성자에 축약하여 멤버변수를 선언할 수 있다.
    constructor(private firstName: string, private lastName: string) {}
  }

  const user = new User("Steve", "Jobs");
  console.log(user.fullName); // Steve Jobs
  // user.firstName = "Cornell"; // fullName은 변경되지 않음. 접근 불가
  console.log(user.fullName); // Steve Jobs

  user.age = 6; // setter 실행!
  console.log(user.age); // getter 실행
}
