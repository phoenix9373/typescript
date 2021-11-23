{
  /**
   * Type Aliases: 타입스크립트를 쓰는 핵심적인 기능!!
   * 기능: 타입을 직접 정의해서 활용가능하다.
   */

  // 1. 기본 타입 지정
  type Text = string;
  const name: Text = "ellie";
  const address: Text = "korea";

  // object 타입도 지정이 가능하다.
  type Student = {
    name: string;
    age: number;
  };

  const student: Student = {
    // animal: "dog", 정의되지 않은 타입에 대해 에러
    name: "ellie",
    age: 12,
  };

  // 2. String Literal Types
  // 쓰는 이유?:
  type Name = "name"; // string이 아니고 'name'??
  let jinName: Name;
  jinName = "name"; // 그 값을 그대로 가져야한다.

  type Boal = true;
  const isCat: Boal = true; // true만 할당 가능.
}
