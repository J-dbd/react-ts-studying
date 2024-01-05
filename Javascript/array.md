# Methods

## `map()`

- map() 은 어떤 배열을 다른 형태의 배열로 재생산할때 사용하는 반복문이다. 배열의 각 요소들에게 일괄적으로 함수를 적용하고 싶을 때 사용한다.

### map과 typescript의 interface, 자료구조 관련 메모

[React & TypeScript - Course for Beginners](https://www.youtube.com/watch?v=FJDVKeh7RJI) /
[github](https://github.com/piyush-eon/react-typescript-taskify/blob/master/src/components/SingleTodo.tsx)

- 자료구조를 잘 고려해야 한다. 여기서 todos는 todo의 배열이고, map에 주어진 함수는 todo(todos의 element)를 순회하며 특정 조건(element의 id가 주어진 id와 일치하는가?)를 확인하는 건 filter와 같다.
- 그러나 여기서는 T/F만 바꾸어주는 것이 목적이므로, `...`(복사?)를 사용하여 기존 todo 객체의 내용을 동일하게 가져오고, `isDone`이라는 property의 T/F를 !를 사용하여 바꾸어준다. (전제: 동일한 id를 가진 tod일때) 아닐 때에는 todo를 그대로 전달하며 새로운 배열을 생성한다!

```javascript
//////
export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}
/////
const [todo, setTodo] = useState<string>("");
const [todos, setTodos] = useState<Todo[]>([]);

//////
  const handleDone = (id: number) => {
    setTodos(
      //todos.map((todo)=>todo.id == id? !todo.isDone : todo.isDone);
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
```

## `filter()` vs `map()`

[JS-📚-map-과-filter-차이 [Inpa Dev 👨‍💻:티스토리]](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-map-%EA%B3%BC-filter-%EC%B0%A8%EC%9D%B4)

|                    | `map()`                                                                                                                                                               | `filter()`                                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 기능               | 모든 배열의 요소마다 callback함수를 호출<br>그 함수의 반환값으로 새로운 배열을 생성                                                                                   | 모든 배열 요소마다 callback함수를 호출<br>그 함수(테스트)를 통과한 모든 요소를 반환(통과 못하면 버림)                                                     |
| callback           | 새로운 배열 요소를 생성하는 함수<br>`arr.map(callback(currentValue[, index[, array]])[, thisArg])`                                                                    | 각 요소를 검증하는 함수. T반환시 유지, F반환시 버린다.<br> `arr.filter(callback(element[, index[, array]])[, thisArg])`                                   |
| callback 함수 인자 | `currentValue`: 처리할 요소(배열의 요소)<br>`index`[op]: 처리할 현재 요소의 idx<br>`array`[op]: map을 호출한 배열<br>`thisArg`[op] callback실행할 때 this로 실행할 값 | `element`: 처리할 현재 요소<br>`index`[op]: 처리할 현재 요소의 idx<br>`array`[op]: Filter를 호출한 배열<br>`thisArg`[op]: callback실행시 this로 사용할 값 |
