/**
 * 1. 절차지향적으로 커피 기계 만들기
 * p1. 커피를 만드려면, 커피콩을 가지고 있어야한다.
 * p2. 커피콩을 가지고, 커피를 만들 수 있는 함수가 필요하다.
 */
{
  // CoffeeCup: 커피 한 잔을 정의한다.
  type CoffeeCup = {
    shots: number; // shot 몇 개가 들어갔는지
    hasMilk: boolean; // 우유 첨가 여부
  };

  const BEANS_GRAMM_PER_SHOT: number = 7; // 조건 변수(고정)
  let coffeeBeans: number = 0; // 가지고 있는 커피콩 수(변수)

  function makeCoffee(shots: number): CoffeeCup {
    /**
     * 커피를 만드는 함수
     * 몇 개의 샷을 넣으면, 몇 개의 커피를 만들 수 있는지
     */

    if (shots * BEANS_GRAMM_PER_SHOT > coffeeBeans) {
      throw new Error("Not enough coffee beans!");
    }

    coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log(coffee);
}
