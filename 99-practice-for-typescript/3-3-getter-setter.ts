{
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
        throw new Error(`${num} is invalid number for age`);
      }
      this.internalAge = num;
    }
    constructor(private firstName: string, private lastName: string) {}

    callMyName() {
      console.log(`Hi! ${this.fullName}`);
    }
  }

  const user = new User("Jay", "Column");
  user.callMyName();
}
