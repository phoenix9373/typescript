/**
 * either 클래스 구현
 * left와 right에 각각 서로 다른 타입을 유연하게 받도록 만들어보자.
 * TIP: generic은 보통 대문자 한 글자만 사용한다.
 */

// either: a or b

interface Either<L, R> {
  left: () => L;
  right: () => R;
}

// 생성자 함수에 대해 <L, R>로 작성하는지?
class SimpleEither<L, R> implements Either<L, R> {
  constructor(private leftValue: L, private rightValue: R) {}

  left(): L {
    return this.leftValue;
  }

  right(): R {
    return this.rightValue;
  }
}

const either: Either<number, number> = new SimpleEither(1, 2);
console.log(either.left());
console.log(either.right());
const best: Either<string, boolean> = new SimpleEither("a", true);
console.log(best.left());
console.log(best.right());
