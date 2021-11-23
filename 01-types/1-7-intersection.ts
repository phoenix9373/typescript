{
  /**
   * Intersection Types: & 연산과 비슷한 기능
   * union과 반대되는 개념
   */

  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    employeeId: number;
    work: () => void;
  };

  function internWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.work()); // Student와 Worker가 합해진 객체
  }

  internWork({
    name: "jin",
    score: 1,
    employeeId: 12,
    work: () => {},
  });
}
