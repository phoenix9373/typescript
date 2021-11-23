{
    /**
     * Enum 장단점
     * 활용: 여러 가지 상수 값을 한 곳에 모아서 활용할 때 사용한다.
     */
    // in JavaScript
    var MAX_NUM = 6;
    var MAX_STUDENTS_PER_CLASS = 10;
    // 연관된 상수가 여러개 있다면? => 관리하기 어렵다.
    var MONDAY = 0;
    var TUESDAY = 1;
    var WEDNEDAY = 2;
    // 따라서 Object.freeze로 읽기 전용 선언하는 것이 일반적인 JS에서 방법
    var DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
    // 하지만 타입스크립트에서는? => enum 타입을 활용한다.
    // 1. 값을 지정하지 않으면 index 값이 출력된다.
    // 2. 값을 문자열로 지정하면, 나머지도 값을 지정해야한다.(자동 할당이 불가)
    var Days = void 0;
    (function (Days) {
        Days[Days["Monday"] = 0] = "Monday";
        Days[Days["Tuesday"] = 1] = "Tuesday";
        Days[Days["Wednesday"] = 2] = "Wednesday";
    })(Days || (Days = {}));
    console.log(Days.Tuesday);
    var day = Days.Wednesday;
    day = Days.Tuesday;
    day = 10; // Days에 지정된 타입 외에 다른 값을 지정해도 compile error가 없음.
    console.log(day);
    // 결론: 타입스크립트에서도 enum을 사용하지 않는 것이 좋다.
}
