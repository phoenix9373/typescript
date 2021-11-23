{
  /**
   * Discriminated
   * 두 가지 타입을 구분할 때 사용.
   * 가독성을 높이기 위해, 두 타입에 같은 프로퍼티를 추가.
   */

  type SuccessState = {
    result: "success";
    response: {
      body: string;
    };
  };

  type FailState = {
    result: "fail";
    reason: string;
  };

  type LoginState = SuccessState | FailState;

  function login(): LoginState {
    return {
      result: "success",
      response: {
        body: "logged in!",
      },
    };
  }

  // Quiz: printLoginState(state: LoginState)
  // success -> 🎇 body
  // fail -> 😥 reason

  function printLoginState(state: LoginState) {
    // 공통된 property를 활용하여 타입 구분.
    if (state.result === "success") {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`🎉 ${state.reason}`);
    }
  }
}
