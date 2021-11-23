{
  /**
   * Union Types: OR
   * 사용 이유: 발생하는 모든 경우의 수 중 하나만 지정해야할 때 사용한다.
   * string literal과 함께 여러 값을 | 연산으로 선언한다.
   */

  // String Literal을 활용한 Union Types
  type Direction = "left" | "right" | "up" | "down";
  function move(direction: Direction) {
    console.log(direction);
  }
  move("down"); // 매개변수 작성할 때, 가능한 값을 보여준다.

  // 예시: function 만들기 => login -> success, fail
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;

  // Quiz: printLoginState(state: LoginState)
  // success -> 🎇 body
  // fail -> 😥 reason
  const state: LoginState = {
    response: {
      body: "hello",
    },
  };
  function printLoginStateNotGood(state: LoginState) {
    // 1. property 활용: 가독성에 좋지 않음.
    if ("response" in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`🎉 ${state.reason}`);
    }
  }
  printLoginStateNotGood(state);
}
