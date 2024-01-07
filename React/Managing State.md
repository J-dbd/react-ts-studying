# Preserving and Resetting State ([링크](https://react.dev/learn/preserving-and-resetting-state#the-ui-tree))

> react는 ui-tree를 기준으로 컴포넌트를 리랜더링 할 지 말 지를 결정한다. 즉, 랜더링할 때 컴포넌트 UI tree구조를 비교하기에... state가 무엇이든(즉, 컴포넌트의 state가 변하더라도) ui tree상 같으면 리랜더링하지 않는다.

- 리엑트에게 UI tree는 마치 컴포넌트와 상태의 **주소**와 같다. 어떤 엘리먼트의 몇 번째 자식인지가 중요하다(?). 이는 JSX의 로직과는 별개인 듯 하다(jsx에서 return 문의 분기, if처리와는 별개로 적용 되지만, <div>안에 담고 말고로 갈리는 걸 보니...)

[한국어로 번역한 블로그](https://yunjeoming.dev/blog/preserve-and-reset-state)
/ [조금 더 정리된 블로그](https://velog.io/@jay/do-you-know-ui-tree)
