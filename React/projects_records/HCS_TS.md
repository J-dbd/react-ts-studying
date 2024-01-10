# [RE-RENDER] Sibling Components:

> 같은 Page안에 있는 형제 컴포넌트들: post를 생성했을때 List만 재랜더링하기

새로운 post를 생성했을 때 이미 존재하는 목록에 살포시 새로 생기는 화면을 그리고싶었다. 물론 그냥 새로고침(refresh)읋 해서 아예 새로 로딩할 수도 있지만 부자연스러웠고 불필요한 컴포넌트까지 랜더링하기보다는 리랜더링 이슈에 대해 고민하고 싶어서 다른 방법을 찾아봤다. (그런데 정작 처음 생각할 땐 살짝 어긋난 방향으로 생각하고 있었다!)

컴포넌트간의 관계는 다음과 같다.
| 부모 | `MyStorage` | |
|-|-|-|
|자식| `PostForm`(자식1)| `PostList`(자식2)|
| |action발생 |rerendering 대상 |

## 문제상황

자식1 = `postForm` / 자식2 =`postList`

1. 부모에서 화면이 로딩될 때 fetch 해와서 boardData에 넣는다.
2. 자식1에게 자식2에서 쓸 데이터를 fetch 해오는 함수를 전달한다.
3. 자식1이 post를 하나 생성할 때 props로 받은 함수를 실행한다.

## 발생한 현상

화면이 깜빡이고, 데이터가 fetch되나 post list는 갱신되지 않았다.(원하는대로 새 post가 추가되지 않았다)

### 왜 이렇게 코드를 짰는가?

1. `createPost`를 했다면 새로 생성된 post가 db에 들어갈 것이다.
2. 이 배열을 가져와 다시 뿌려서 자식2의 리렌더링을 해야지!
3. 가져오는 action 은 부모에 있는 `fetchData` 함수인데, post를 create하는 이벤트는 자식1에 있으니 자식1으로 가져와야겠다.

### 부모 코드(문제)

```jsx
  const [boardData, setBoardData] = useState<Post[] | null>(null);
/** */
const fetchData = async () => {
  /** for checking recoil-persist*/

  const recoilToken = loginData.token;
  await api_getPostList(1, recoilToken)
    .then((res) => {
      let myData = res.data;
      myData = myData.reverse();
      setBoardData(myData);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
    });
};
useEffect(() => {
  fetchData();
}, []);

if (isLoading) {
  return <Loading />;
}

return (
  <div className="board-page-container">
    <section className="postform-container">
      <div id="box-container"
      >
        <div >
          <PostForm fetchData={fetchData} />
        </div>
      </div>
    </section>
    <PostList postData={boardData} />
  </div>
);

export default MyStroage;
```

### 자식 코드(문제)

```jsx
const handlePost = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    /*...*/
    const res = await api_createNewPost({ title, content }, recoilToken);
    /*...*/
    toast.success("성공적으로 게시되었습니다!", { autoClose: 1600 });
    fetchData?.();
  } catch (err) {
     /*...*/
};
```

## 해결

### 해결과정

> 꼭 data fetching이 필요한가? 아니다.
> 페이지가 처음 로딩될 때 `useEffect`로 가져온 데이터에 내가 방금 만든 post를 하나 추가해주면 되지 않나?

cost를 유발하는 fetching보다는 있는 자원을 더 활용해보자고 생각하니 이제 닥친건 형제 컴포넌트간의 데이터통신이었다.

### 형제 컴포넌트간 통신

> 형제 컴포넌트(두 개의 자식 컴포넌트)끼리 통신하게 하려면 부모 컴포넌트에 있는 공유 state를 이용해 자식 컴포넌트들이 서로/부모와 동기화하도록 만들어야 한다. [공식문서](https://ko.legacy.reactjs.org/tutorial/tutorial.html#lifting-state-up)

쉽게 말해서 형제 컴포넌트를 핸들링하고 싶다면 공통되는 부모 컴포넌트에 공유하는 state를 생성하고 그것을 통해 통신하는 방식으로 핸들링해야한다.

#### 부모 `myStorage`

```jsx
/*부모*/

const fetchData = async () => {
  const recoilToken = loginData.token;
  await api_getPostList(1, recoilToken)
    .then((res) => {
      let myData = res.data;
      myData = myData.reverse();
      setBoardData(myData);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
    });
};
useEffect(() => {
  fetchData();
}, []);
/*  ... */
<div className="board-page-container">
  <section className="postform-container">
    <div id="box-container">
      <div>
        <PostForm setBoardData={setBoardData} />
      </div>
    </div>
  </section>
  <PostList postData={boardData} setBoardData={setBoardData} />
</div>;
```

#### 자식 `PostForm`

> 부모로부터 setBoardData setter함수를 받아 ... 연산자를 활용해 새로 생성한(반환된) post를 더해주었다.

```jsx

const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        /*...*/
      const res = await api_createNewPost({ title, content }, recoilToken);
      const newPost = res.data;
      if (setBoardData) {
        setBoardData((prevData) =>
          prevData ? [newPost, ...prevData] : [newPost]
        );
      }
    /*...*/
      toast.success("성공적으로 게시되었습니다!", { autoClose: 1500 });
      //await fetchData();
    } catch (err) {
       /*...*/
  };


 return (
    <>
      <Form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handlePost}/>
        /* .. */
 )

```

## 결과

- 데이터 페칭은 처음 페이지가 그려질 때에만 실행
- state의 변화로 새로 생성된 post가 배열에 추가될 때 list 부분에만 (마치 카운터 숫자가 올라가듯) 변화함.

## 추가 의문

- 문제 상황에서 fetching은 (1) 초기에 페이지가 그려질 때와 (2) prop으로 전달받은 함수를 자식이 호춣랬을 때 부모페이지에서 모두 이루어졌다. 그런데 왜 list에 새로운 post가 생성되지 않았던 걸까?

## 관련 공식 문서

형제 컴포넌트끼리의 통신에 대해 공식 문서를 더 찾으면 추가해두어야 겠다.

What are good alternatives to data fetching in Effects? [링크](https://react.dev/learn/synchronizing-with-effects#re-render-with-same-dependencies)
