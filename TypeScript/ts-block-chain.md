# Overview of TS

1. How ts works
2. Implicit Types vs Explicit Types
3. Tyeps of TS

# Functions

## 1. call signiture

```javascript
//call signiture
type Add = (a: number, b: number) => number;
//const add를 Add 타입이라고 함으로써 ts는 자동으로 a와 b,그리고 a+b의 타입이 number임을 알 수 있다.
const add: Add = (a, b) => a + b;
```

## 2. overloading

> 동일 이름에 매개 변수/매개변수 타입/리턴 타입이 다른 여러 버전의 함수를 만드는 것

직접 작성하기보다 외부 라이브러리에 자주 보이는 형태로, 하나의 함수가 복수의 Call Signature를 가질 때 발생한다.

call signiture의 매개변수에 따른 예외 처리

```javascript
type Add = {
    (a:number, b:number):number;
    (a:number, b:string):void;
    (a:number, b:number, c?:number):number;
}

// 매개변수의 데이터 타입이 다른 경우 예외 처리
const add:Add = (a, b)=>{
    if(typeof(b)=="string") {
        return a;
    }
    else{
        return a+b;
    }
}
// 매개변수의 수가 다른 경우 예외 처리
const add5:Add = (a, b, c?:number) => {
    if(c && typeof(b)=='number') return a+b+c;
    else if(c && typeof(b)! == "number") return a+c;
    return a;
}

```

외부 라이브러리에서 쓰는 방식

```javascript
type Config = {
    path:string,
    state:object
}
type Push = {
    (path:string):void
    (config:Config):void
}

const push:Push =(config) =>{
    if(typeof(config)=="string") {
        console.log(config);
    }else{
        console.log(config.path);
    }
}
```

## 3. Polymorphism (Generic usage)

> generic = type's placeholder

```javascript
// Polymorphism

// 배열을 받고 그 배열의 결과를 print해주는 함수를 만든다.

type SuperPrint = {
  (arr: number[]): void,
};
const printArray: SuperPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

printArray([1, 2, 3, 4]);
//printArray(['a','b','c','d']);

//generic = placeholder of type

type SuperPrint2 = {
  <T>(arr: T[]): T,
};
const printArray2: SuperPrint2 = (arr) => {
  arr.forEach((i) => console.log(i));
  return arr[0];
};

printArray2([1, 2, 3, 4]);
printArray2(["a", "b", "c", "d"]);
```

- generic 추가하기

```javascript
type SuperPrint2 = {
  <T, M>(arr: T[], b: M): T,
};
```

- generic을 이용해서 call signiture를 사용하는 일은 드물 것. 주로 패키지/라이브러리 이용시 generic을 생성함. (라이브러리를 만들거나 다른 개발자가 쓸 걸 만들 때 제내릭을 사용할 것)

- generic으로 타입 생성하거나 타입 확장 가능

- 타입선언(?)시 하나의 요소가 다양한 타입을 받을 수 있을 때라던지, 타입 커스텀이 필요할 때 제네릭을 쓸 수 있다!

> '제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.'

# Classes and interface

리엑트
