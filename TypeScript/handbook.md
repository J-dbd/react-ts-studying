- [The Basic](#the-basic)
  - [정적 타입 검사](#--------)
  - [예외가 아닌 실행 실패 Non-exception Failures](#-------------non-exception-failures)
  - [skip](#skip)
  - [지워진 타입](#------)
  - [다운레벨링](#-----)
- [Everyday Types](#-everyday-types)
  - [원시 타입 : string, number, 그리고 boolean](#--------string--number------boolean)
  - [배열](#--)
  - [`any`](#-any-)
  - [변수에 대한 타입 표기](#------------)
  - [함수](#--)
    - [매개변수 타입 표기](#----------)
    - [반환 타입 표기](#--------)
    - [익명 함수](#-----)
  - [객체 타입](#-----)
    - [옵셔널 프로퍼티](#--------)
  - [타입 조합하기 : 유니언 타입](#----------------)
  - [타입 조합하기: 타입 별칭(Type Aliases)](#---------------type-aliases-)
  - [타입 조합하기(객체 타입 만들기) : interface](#---------------------interface)
    - [타입 별칭과 인터페이스의 차이점](#-----------------)
  - [타입 단언 (Type Assertions)](#-------type-assertions-)
  - [리터럴 타입](#------)
    - [리터럴 추론](#------)
      - [해결방안](#----)
  - [null 과 undefined](#null---undefined)
  - [열거형](#---)
  - [자주 사용되지 않는 원시형 타입](#-----------------)
- [Narrowing](#-narrowing)
- [More on Functions](#more-on-functions)
- [Object Types](#object-types)
- [Type Manipulateion](#type-manipulateion)
- [Classes](#classes)
- [Modules](#modules)

# The Basic

## 정적 타입 검사

| javascript                | typescript               |
| ------------------------- | ------------------------ |
| 동적 타입 시스템만 제공   | 정적 타입 시스템 제공    |
| 코드를 실행해야 확인 가능 | 코드 실행 전에 예측 가능 |

## 예외가 아닌 실행 실패 Non-exception Failures

[ex] 명세에 따르면 호출 가능하지 않은 것에 대하여 호출을 시도할 경우....

| javascript         | typescript                    |
| ------------------ | ----------------------------- |
| 오류를 던지지 않음 | 오류를 던짐                   |
| `undefined`를 반환 | 정의되지 않았다는 오류를 발생 |

- 정적 타입 시스템은 어떤 코드가 오류를 발생시키지 않는 “유효한” JavaScript 코드일지라도, 정적 타입 시스템 내에서 오류로 간주되는 경우라면 이를 알려준다.

- 명시적인 버그는 아니지만 버그로 타당히 간주되는 경우를 잡아낼 수 있게 된다.

- 오타, 호출되지 않은 함수, 기본적인 논리 오류...

```javascript
const user = {
  name: "Daniel",
  age: 26,
};
user.location;

//[js] undefined 를 반환
//[ts] Property 'location' does not exist on type '{ name: string; age: number; }'.
```

## skip

- 프로그래밍 도구로서의 타입
- tsc, TypeScript 컴파일러
- 명시적 타입
- [엄격도](https://www.typescriptlang.org/ko/docs/handbook/2/basic-types.html#%EC%97%84%EA%B2%A9%EB%8F%84)(`"strict": true` 플래그)
  - noImplicitAny
  - strictNullChecks

## 지워진 타입

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

```javascript
"use strict";
function greet(person, date) {
  console.log(
    "Hello ".concat(person, ", today is ").concat(date.toDateString(), "!")
  );
}
greet("Maddison", new Date());
```

1. person과 date 인자는 더 이상 타입 표기를 가지지 않습니다.
2. “템플릿 문자열” - 백틱(` 문자)을 사용하여 작성된 문장 - 은 연결 연산자(+)로 이루어진 일반 문자열로 변환되었습니다.
   > 타입 표기는 프로그램의 런타임 동작을 전혀 수정하지 않습니다.

## 다운레벨링

> ys는 예전 버전의 것으로 다시 작성해서 돌린다. 설정가능함.
> [읽어둘 것!](https://www.typescriptlang.org/ko/docs/handbook/2/basic-types.html#%EB%8B%A4%EC%9A%B4%EB%A0%88%EB%B2%A8%EB%A7%81)

# [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

## 원시 타입 : string, number, 그리고 boolean

String, Number, Boolean : 특수 내장 타입이며 ts에서는 **항상** string, number, boolean을 사용해야 함.

## 배열

```javascript
let num_array: number[] = [1, 2, 3];
let num_array1: Array<number> = [1, 2, 3];
let str_array: string[] = ["a", "b", "c"];
```

## `any`

- 단지 안심시킬 뿐
- `noImplicitAny` 컴파일러 플래그를 사용하면 암묵적으로 any로 간주하는 모든 경우에 오류 발생 시킴.

## 변수에 대한 타입 표기

- 변수명 왼쪽에 타입을 표기하여 명시적으로 지정할 수 있음
- 그러나 대부분의 경우 타입 표기는 필요하지 않고, 자동으로 코드 내 타입을 추론하고자 함.

## 함수

```javascript
function getFavoriteNumber(name: string): number {
  console.log(name);
  return 26;
}
```

### 매개변수 타입 표기

매개변수에 타입이 표기되었다면, 해당 함수에 대한 인자는 검사가 이루어짐. 안 해도 올바른 개수의 인자가 전달되었는지 항상 검사한다.

### 반환 타입 표기

매개변수 목록 뒤에 표기하는데 표기하지 않아도 ts가 return문을 바탕으로 자동으로 추론한다.

### 익명 함수

- 문맥적 타입 부여를 통해 타입추론이 가능하다.

## 객체 타입

```javascript
// 매개 변수의 타입은 객체로 표기되고 있습니다.
function printCoord(pt: { x: number, y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

- 각 프로퍼티를 구분할 때 , 또는 ;를 사용가능
- 가장 마지막에 위치한 구분자의 표기는 선택 사항

### 옵셔널 프로퍼티

```javascript
function printName(obj: { first: string, last?: string }) {
  // ...
}
// 둘 다 OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

- 옵셔널 프로퍼티를 읽었을 때, javascript에서는 존재하지 않는 프로퍼티에 접근시 undefined를 얻게 되므로... undefined인지 아닌지 확인하고 나서 그 값을 사용해야 한다.

```javascript
function printName(obj: { first: string, last?: string }) {
  // 오류 - `obj.last`의 값이 제공되지 않는다면 프로그램이 멈추게 됩니다!
  // console.log(obj.last.toUpperCase());
  //

  // undefined인지 여부를 확인해야 함
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // 최신 JavaScript 문법을 사용하였을 때 또 다른 안전한 코드
  console.log(obj.last?.toUpperCase());
}
```

## 타입 조합하기 : 유니언 타입

유니언 타입은 서로 다른 두 개 이상의 타입들을 사용하여 만드는 것으로 유니언 타입의 값은 타입 조합에 사용된 타입 중 무엇이든 하나를 타입으로 가질 수 있다.

유니언 타입의 멤버 : 조합에 사용된 각 타입.

- TypeScript에서 유니언을 다룰 때는 해당 유니언 타입의 모든 멤버에 대하여 유효한 작업일 때에만 허용된다. 만약 `string | number` 유니언 타입일 때 string타입에만 유효한 메서드는 사용할 수 없음.

```
Property 'toUpperCase' does not exist on type 'string | number'.
  Property 'toUpperCase' does not exist on type 'number'.
```

- 특정 타입에만 사용할 수 있는 메서드는 분기시켜 사용(1) 하거나 `Array.isArray`와 같은 함수를 사용.

```javascript
function printId(id: number | string) {
  if (typeof id === "string") {
    // 이 분기에서 id는 'string' 타입을 가집니다

    console.log(id.toUpperCase());
  } else {
    // 여기에서 id는 'number' 타입을 가집니다
    console.log(id);
  }
}

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // 여기에서 'x'는 'string[]' 타입입니다
    console.log("Hello, " + x.join(" and "));
  } else {
    // 여기에서 'x'는 'string' 타입입니다
    console.log("Welcome lone traveler " + x);
  }
}
```

- 유니언의 모든 멤버가 어떤 프로퍼티를 공통으로 가진다면, 좁히기 없이도 해당 프로퍼티를 사용할 수 있다.

여기까지는 객체 타입과 유니언 타입을 사용할 때 직접 해당 타입을 표기함.

## 타입 조합하기: 타입 별칭(Type Aliases)

- 타입 별칭은 단지 별칭에 지나지 않는다(타입 별칭을 사용하여도 동일 타입에 대하여 각기 구별되는 “여러 버전”을 만드는 것은 아니다!)
- 별도로 이름 붙인 타입을 새로 작성하는 것.

## 타입 조합하기(객체 타입 만들기) : interface

> 값의 구조(즉, 예측된 property를 가졌는지의 여부)만 따진다.

타입이 가지는 구조와 능력에만 관심을 가진다는 점은 TypeScript가 구조적 타입 시스템이라고 불리는 이유

### 타입 별칭과 인터페이스의 차이점

get_started.md 에 기술
| | interface | type aliases |
|-|-|-|
| | interface extend | 교집합을 통해 타입 확장 |
| | 기존 인터페이스에 새 필드 추가 가능 | 타입 생성된 뒤 duplicate identify가 불가능함 |

## 타입 단언 (Type Assertions)

예를 들어 코드상에서 document.getElementById가 사용되는 경우, TypeScript는 이때 HTMLElement 중에 무언가가 반환된다는 것만을 알 수 있는 반면에, 당신은 페이지 상에서 사용되는 ID로는 언제나 HTMLCanvasElement가 반환된다는 사실을 이미 알고 있을 수도 있습니다.

```javascript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
T

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

- 컴파일러에게 제거됨(like 타입 표기)
- tsx가 아닐 경우 꺾쇠괄호 사용 가능

한번 읽어볼 것([링크](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#%ED%83%80%EC%9E%85-%EB%8B%A8%EC%96%B8))

## 리터럴 타입

> 구체적인 숫자/문자열을 타입 위치에서 지정 가능하다.

- union과 함께 사용하면 유용하게 쓸 수 있음.

```javascript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre"); // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

### 리터럴 추론

숫자/문자열의 경우 추론하는데 가끔 문제가 생길 수 있음. 원하는 대로 특정 숫자/문자열만 조건적으로 통과되어야 하는데 너 숫자? pass, 너 문자열string? pass.해버릴 경우가 있음.

```javascript
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

- req.method는 string으로 추론되지, "GET"으로 추론되지 않는다.

#### 해결방안

1. 둘 중에 한 위치에 타입 단언을 추가

```javascript
// 수정 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// 수정 2
handleRequest(req.url, req.method as "GET");
```

2. as const를 사용하여 객체 전체를 리터럴 타입으로 변환

```javascript
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

## null 과 undefined

읽어보고 정리할 것([링크](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#null%EA%B3%BC-undefined))

## 열거형

나중에 볼 예정

## 자주 사용되지 않는 원시형 타입

- bigint
- symbol

---

# [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

요약: union 등으로 여러 인자를 받을 경우 특정타입만 쓸 수 있는 메서드를 쓸 때 typeof로 타입별 분기처리를 해주어야 한다.

# More on Functions

# Object Types

# Type Manipulateion

# Classes

# Modules
