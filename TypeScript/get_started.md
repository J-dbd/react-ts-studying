# 타입 추론 (Types by Inference)

# 타입 정의하기 (Defining Types)

타입을 구축하기 위한 두 가지 구문 중 \*\*`interface`를 우선 사용하고 특별할 때 `type`을 사용한다.

### interface

1. 객체의 형태를 명시적으로 나타내기 위해 사용할 수 있다.
2. class로도 (명시하기 위해) 선언할 수 있다.
3. 함수의 매개변수와 리턴 값을 명시하기 위해 사용할 수 있다.

interface에서 사용 가능한 타입들

1. javascript의 원시 타입들(boolean, bigint, null, number, string, object, undefined)
2. any, void

## `interface` & `type aliases`

Declare the shape of an object

[학습링크](https://www.typescriptlang.org/play?&e=83#code/PTAEBUAsFMCdtAQ3qALgdwPagLaIJYB2ammANgM4mgAm0AxmcgqjKBZIgA4KYBmSQgCgQoTACMAVg1QAuUEVRw+ietCqJCNNAE8eSMvkQV1AOhHALEGDqQoAbnFsV8OfE1gAaQdr6ZYaGw4mBSooPSYOMHE9MbqVqphrAgUiDjQ5kKoeggAQviwNOA5oAC8oADeQqCg6EQA5hTyAEwA3EIAvu1CisqqeQU0AJKESrAqapXVtQ1NoG2dQkIRhKGg4oMAjPL5hcX65RUzhI0toF3LmKthG4XNO4MjYxMIh8en8+fdorkMiACuJggOQAyvRYPguGF8Bp2KhYP96Kh-rBEGRdPoKDpQtAcJ4rPhUAByKhcEIucRkFjYXqwNwAD0C0AKoEB1MwmRWa1uNAAzA9Ck8+pNyjzNt8wFBoLZxJhWOx-lwybAwtB6UotA0xMkArSXhotBizFZ9gg0UYTFQaNhWDDQPYjApRnATEj8FcjRRvOhIO5oATneN+lROI4kKAANbSrCFTLZfQAeXQ6LehEwSJRhDR8nh-wQHVAADJQLsijl2vGEAAlCREMqVUBpjOwLNkeQqSj5oslx6Bl7dPX9UAABWgqnTEdAao1NCopdNUxqETImBRfH+bbQCOg7RqfEM6nbaJM7Q6PT7Q4Awr76FHiNPoFo573nkOqkvyKvxhuj53d6B93wQ8AOPHdFiEKkwkwZN5CTFMGzqE45mabwm2RFtsy3PMvgg6AwnoG873ka98FvR96yORCPhQ8JPzXH8QM7bxAOAjsgQuE1ODCVJ8Bob0EHgCIokfbQdFXVkgUHNQqEwRwAkrBJDDiChTFAEEeHofA+FItEyB0bxxD+NlQDE-4ZjIdF6jw9Y8LGKdYFgfwrHSChUislTQCGARTNASBZLgMQ5KZADyBXKj7Mc2AvRM8TYmEUQTAQPz0GBHgwQhKFwk0UAuEch06DQF0As0bRghQPx6DZGhnPUNz1FqGBiBjCMtTqeUpPqwwo1AEiyMITJoPggjSLvdphr6+tBolUAE0IBA8EkfxaC0vg4EfSZDIwaByMrAwLXq+wqA6igEhQVhEGhC9pLsXgeGIEqjT25SbvCFcTBocxRCgO10k0KgfLiqd1REwQnVfDbbDoRhkC1QkEnYBgrm0VBXAyJYOtAABpQkNUXHKUSi+RZXIMdCFPdGroQbHUFx99aJXFF5FCCETnJqwRmCuUYACWIgUQR64rTG4EAIzQrO0VdUBcAr+AJKXaAYDwLvdfqll24dFS4WxDmmZd-CZ+EGlPbp1c17W8dQTBsXkQh-hwQzYGNpZRAAEWgO6aC1D1TICepMGPbxbStFa1sISYIg3bRDKQKwyRcFGwyW-m5vqZXHFUgAJaDoCCvwAi4f5KVIvSgbj6BqtEStosJElw02uzYgs6g8G65IcFBjrMlEWbeAEZIbLWeAKC-a684R5kTgMdF+GC8urKsXn6uQVdDSr+0jsp6Kg7hVRJ388YwqsVh4EQbQ7X5v3MG0LgmEmS2d5VWRnbASAaa4JoQFCXf9-3aDTCE4AABHPMoQVYUGALyAA7M0XkUDeQAFZgBV3BJCVAABaY6aDDpoKrsAeBzQABsAAOZopCAAMABifBxDSHNDIUIIAA)

매우 비슷하고 많은 경우 똑같이 사용할 수 있다. 타입스크립트가 구조적인 타입 시스템이기 때문에 두 사용법을 intermix할 수 있음.

```typescript
// Because TypeScript is a structural type system,
// it's possible to intermix their use too.
const bird3: BirdInterface = bird1;

// They both support extending other interfaces and types.
// Type aliases do this via intersection types, while
// interfaces have a keyword.
type Owl = { nocturnal: true } & BirdType;
type Robin = { nocturnal: false } & BirdInterface;

interface Peacock extends BirdType {
  colourful: true;
  flies: false;
}
interface Chicken extends BirdInterface {
  colourful: false;
  flies: false;
}

let owl: Owl = { wings: 2, nocturnal: true };
let chicken: Chicken = { wings: 2, colourful: false, flies: false };
```

|        | `Type aliases`                | `interface` |
| ------ | ----------------------------- | ----------- |
| extend | O                             | O           |
| 방식   | intersection types(교차 타입) | keyword     |
| 개방성 | closed                        | open        |

### 교차 타입(intersection types)

```javascript
type BirdType = {
  wings: 2,
};

type Owl = { nocturnal: true } & BirdType;
```

두 개 이상의 타입을 결합하여 새로운 타입을 생성하는 TypeScript의 기능으로, '&' 기호를 사용하여 타입을 결합한다.

### 권장사항

> **interface** over type aliases
> 더 나은 오류 메시지를 받을 수 있다!

```javascript
//owl : type
//chicken : interface
owl = chicken;

  Type 'Chicken' is not assignable to type 'Owl'.
  Property 'nocturnal' is missing in type 'Chicken' but required in type '{ nocturnal: true; }'.(2322)

chicken = owl;
// TypeScript가 인터페이스인 Chicken과 작업할 때더 간결하고 초점을 맞춘 메시지를 제공함
  Type 'Owl' is missing the following properties from type 'Chicken': colourful, flies(2739)
```

### 확장성(개방성)

> 인터페이스를 두 번 선언하여 확장할 수 있는 반면, 타입 별칭은 선언된 이후에 변경할 수 없다.

> For publicly exposed types, it's a better call to make them an interface.

[publicly exposed types] : 외부에 공개되는 타입, 즉 다른 모듈이나 코드에서 접근할 수 있는 타입

인터페이스는 타입을 확장할 수 있으므로, 다른 모듈이나 코드에서 해당 타입을 사용하고 확장할 수 있다. 이는 코드의 유연성과 확장성을 높일 수 있으므로 'pulicily exposed type'인 경우에는 interface가 더 적절하다.

#### interface

```javascript
// One major difference between type aliases vs interfaces
// are that interfaces are open and type aliases are closed.
// This means you can extend an interface by declaring it
// a second time.

interface Kitten {
  purrs: boolean;
}

interface Kitten {
  colour: string;
}
```

#### type

Puppy 타입은 처음에는 color 속성을 가지고 있고, 두 번째로 선언된 Puppy 타입은 toys 속성을 추가하여 변경하려고 했지만, 타입 별칭은 닫혀있기 때문에 오류가 발생한다.

```javascript
// In the other case a type cannot be changed outside of
// its declaration.

type Puppy = {
  color: string,
};

type Puppy = {
  toys: number,
};
```

### edge cases around type & inteface

[stack overflow](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/52682220#52682220)

# 타입 구성 (Composing Types)

> 여러가지 타입을 이용하여 새 타입을 작성하는 방법

**객체들을 조합하여 더 크고 복잡한 객체를 만드는 방법**과 유사하게, TypeScript에 타입으로 이를 수행하는 두 가지 코드가 바로 union, generic이다.

## Unions

> 타입이 여러 타입 중 하나일 수 있음을 선언하는 방법

- 다양한 타입을 처리하는 방법을 제공

```javascript
type MyBool = true | false;

//유니언 타입이 가장 많이 사용된 사례:
//값이 다음과 같이 허용되는 string 또는 number의 리터럴집합을 설명하는 것
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
//array 또는 string을 받는 함수
function getLength(obj: string | string[]) {
  return obj.length;
}
```

- 함수에 stirng혹은 array를 넣어서 타입별로 처리를 다르게 할 수도 있음, type check는 typeof를 사용

## Generic

> 변수에 타입을 제공한다

```javascript

interface BackPack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: BackPack<string>;
const object = backpack.get();
//backpack.add(23); //error!
backpack.add("hi");
//console.log(object);
```

`declare const backpack: BackPack<string>;` : 타입스크립트에게 backpack이라는 상수가 있다고 알려주어 컴파일 시 오류를 막는다. 이 코드는 외부에서 제공되는 타입 정보를 사용하기 위한 선언으로, backpack 객체는 해당 파일 내에서 구체적인 정의가 없을 수 있다.

만약 실제로 backpack 객체를 생성하고 사용하려면, declare 키워드를 제거하고 구체적인 정의를 추가해야 합니다. 예를 들어, class를 선언하고 instacnce를 만드는 방법 등이 있다.

# 구조적 타입 시스템 (Structural Type System)

> Type checking focuses on the _shape_ that values have. 타입 검사가 값이 있는 *형태*에 집중한다. 이는 때때로 “덕 타이핑(duck typing)” 또는 “구조적 타이핑” 이라고 불립니다.

```javascript
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x} , ${p.y}`);
}

const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"

const color = { hex: "#187ABF" };
//printPoint(color);
// @errors: 2345

class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
printPoint(newVPoint); // prints "13, 56"
```

- `point`는 `Point` 타입으로 선언된 적이 없지만 타입 검사에서 point와 Point의 형태가 같기 때문에 통과하여 사용할 수 있다.

- 형태 일치(shape-matching)는 일치시킬 object의 field의 하위집합만 필요하다. point3, rect는 일치하지 않는 속성도 있으나 검사하는 object의 두 타입을 모두 갖고 있으므로 통과한다. 그러나 color는 일치시킬 타입의 속성을 갖고 있지 않아 오류를 일으킨다.

- 구조적으로 class와 object가 형태를 따르는 방법은 같다. class도 같은 방식으로 쓸 수 있다.

> object/class 에 필요한 모든 속성이 존재할 때 구현 세부 정보에 관계 없이 일치하게 보아 pass시킨다.

---

# TS for java/c#

## 타입 다시 생각하기 (Rethinking Types)

### 이름으로 구체화된 타입 시스템 (Nominal Reified Type Systems)

java/c#에서의 타입과 개념 자체가 좀 다른데, typescript는 타입이 서로 대체 가능하다.(좀 더 읽어 보아야 함)

### 집합으로서의 타입 (Types as Sets)

> TypeScript에서 타입은 공통의 무언가를 공유하는 값의 집합으로 생각하는 것이 좋다.

### 삭제된 구조적 타입 (Erased Structural Types)

> TypeScript에서, 객체는 정확히 단일 타입이 _아니다_.

예시: 인터페이스를 만족하는 객체 생성 시 선언적인 관계가 없더라도 해당 인터페이스가 예상되는 곳에 인터페이스를 만족하는 객체를 쓸 수 있음.

> TypeScript의 타입 시스템은 명목이 아닌 구조적입니다.
> 타입 간의 관계는 특정 관계로 선언되었는지가 아닌, 포함된 프로퍼티에 의해 결정됨.

> TypeScript의 타입 시스템은 또한 구체화되지 않았습니다

사실, 타입(미리 선언한 interface)은 런타임에 어떤 형태로도 존재하지 않습니다.

### 구조적 타입화의 결과 (Consequences of Structural Typing)

- 빈 타입 (Empty Types)
- 동일한 타입 (Identical Types)

### 반영 (Reflection)

---

# TypeScript for Functional Programmers

## 점진적인 타이핑 (Gradual typing)

> typeScript는 표현식의 타입을 알 수 없을 때마다 any 타입을 사용

## 구조적인 타이핑 (Structural typing)

```javascript
let o = { x: "hi", extra: 1 }; // 성공
let o2: { x: string } = o; // 성공
```

- `{ x: "hi", extra: 1 }` 는 필수 프로퍼티가 모두 있고 해당 프로퍼티에 할당 가능한 타입이 있으므로 `{ x : string }` 에 할당할 수 있다.
- 나머지 프로퍼티는 할당을 막지 않고, {x : string}의 서브타입으로 만든다.

- named type은 타입에 이름을 붙인 것. (할당을 위해서라면 type aliases는 별다른 차이점이 없으나, T.A는 재귀 정의/타입 매개변수 관련한 interface에서는 다르게 동작)

## 유니언 (Unions)

## 유닛 타입 (Unit types)

https://www.typescriptlang.org/ko/docs/handbook/typescript-in-5-minutes-func.html#%EC%9C%A0%EB%8B%9B-%ED%83%80%EC%9E%85-unit-types

## Haskell과 비슷한 개념 (Concepts similar to Haskell)

### 문맥적인 타이핑 (Contextual typing)

```javascript
let s = "I'm a string!";

declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
let sns = map((n) => n.toString(), [1, 2, 3]);
```

T는 [1,2,3]으로 T=number를 추론, U는 n=>n.tostring()의 리턴 타입으로 U=string을 추론, sns가 string[]타입을 갖도록 한다.

TypeScript는 배열과 함께 map을 먼저 선언하는 것을 선호: ntellisense는 왼쪽에서 오른쪽으로만 작동하기 때문에...

### 타입 별칭 (Type aliases)

### 판별 유니언 (Discriminated Unions)

```javascript
type Shape =
  | { kind: "circle", radius: number }
  | { kind: "square", x: number }
  | { kind: "triangle", x: number, y: number };
function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius * s.radius;
  } else if (s.kind === "square") {
    return s.x * s.x;
  } else {
    return (s.x * s.y) / 2;
  }
}
```

### 타입 매개변수 (Type Parameters)

https://www.typescriptlang.org/ko/docs/handbook/typescript-in-5-minutes-func.html#%ED%83%80%EC%9E%85-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98-type-parameters

### 모듈 시스템 (Module system)

https://www.typescriptlang.org/ko/docs/handbook/typescript-in-5-minutes-func.html#%EB%AA%A8%EB%93%88-%EC%8B%9C%EC%8A%A4%ED%85%9C-module-system

### readonly 와 const(readonly and const)
