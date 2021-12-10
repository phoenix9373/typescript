/**
 * 3. CoffeeMaker 클래스
 * 이번 목표는 '캡슐화'
 * 캡슐화는 노출할 정보만 선택적으로 노출하는 것(정보 은닉)
 * private, public 키워드 활용, 추가로 protected도 있다.
 * public(기본값): 외부에서 자유롭게 접근 가능
 *
 */
{
  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // 멤버변수(class level) => 생성할 때마다 중복 호출된다.
    private coffeeBeans: number = 0; // 멤버변수(instance level)

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans; // 생성자 함수에 전달된 값만큼 내부 변수 정의
    }

    // 메서드를 이용하여 객체를 생성하는 경우, 생성자 함수를 통한 객체 생성을 제한한다.
    // constructor에 private 키워드를 붙인다. new 키워드는 내부 생성자 함수를 참고하여 사용한다.
    static makeCoffeeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
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

      this.coffeeBeans += beans;
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

  const maker = CoffeeMaker.makeCoffeeMachine(28); // new: instance를 만든다 / (): 생성자 호출
  console.log(maker);
  maker.checkCoffeeBeans();
}
