# Built-in React Hooks

> Hooks let you use different React features from your components.

# `useRef`

[공식문서](https://react.dev/reference/react/useRef)

> useRef is a React Hook that lets you reference a value that’s not needed for rendering.

- react-ts 기초 에서는...
  > `useRef` is basically used when we use document.getElementByClassName, we are **hooking** that particular components, HTML.

1. useRef 선언
2. initialize value.
3. provide the ref to input tag(원하는 곳에 ref를 제공) `ref = {inputRef}`
4. ref(`..useRef(null)`) 에 type을 작성 (3번에 ref를 넣은 곳에 마우스hover하여 type get)

### `useRef` in ...

#### React & TypeScript - Course for Beginners

```
useRef는 이 코드에서 입력 필드에 대한 참조를 생성하는 데 사용됩니다. 이렇게 하면 React가 이 입력 필드에 직접 접근할 수 있게 됩니다.

useRef를 사용하는 주된 이유는 blur() 메소드를 호출하기 위해서입니다. blur() 메소드는 HTMLInputElement 인터페이스의 메소드로, 해당 요소가 포커스를 잃게 만드는 역할을 합니다.

이 코드에서는 사용자가 할 일을 입력하고 'Go' 버튼을 클릭하여 할 일을 추가한 후, 입력 필드의 포커스를 제거하기 위해 blur()를 호출합니다. 이를 통해 사용자가 할 일을 추가한 후에도 계속해서 입력 필드에 포커스가 남아 있지 않게 만들 수 있습니다. 이는 사용자 경험을 개선하는 데 도움이 됩니다.

따라서 이 코드에서 useRef는 입력 필드에 대한 참조를 생성하고, 이 참조를 통해 blur() 메소드를 호출하는 데 사용됩니다. 이는 React 컴포넌트가 DOM 요소에 직접 접근할 수 있게 만드는 useRef의 주요 사용 사례 중 하나입니다.
```
