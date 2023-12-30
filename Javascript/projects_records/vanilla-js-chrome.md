# index

[vanilla-js로 chrome app 만들기](https://nomadcoders.co/javascript-for-beginners/lectures/2881) 빠르게 완주하며 남긴 기록

# 목표

- 초급 단계 강의를 통해 javascript 감각 되살리기

# javascript - html

`console.dir(document)`로 html을 document라는 이름의 객체로 가져와 콘솔 창에 찍을 수 있다(javascript can access and read the html). 왜냐하면 browser가 document라는 object를 만들어 전달해주기 때문에, javascritp의 관점에서 html은 하나의 object로 볼 수 있기 때문이다. 즉, javascript에서 html document 객체로부터 html tag 요소를 가져올 수 있다. (ex. `<title>vanilla-js-app</title>` -> `console.log(document.title)` -> vanilla-js-app)

또한 javascript는 html을 read하고 edit할 수 있다. 어떻게? document라는 object와 element를 다루는 function들로. html(을 뜻하는 object인 document)에서 함수를 통해 element를 가져온다.

1. getid
2. gettagname
3. getclassname

4. getElementById() : 해당 id를 가진 하나의 값을 반환해줄때 쓴다
5. getElementsByClassName() : 클래스 네임을 가져옴, array에 할당 (innerText불가능)
6. getElementsByTagName(): name할당 가능 array에 할당
7. queryselector : serach element by css notation
   - 동일 클래스 전부를 return 하지 않음(첫번째만 리턴)'
   - 동일 조건 전부 리턴받고 싶다면 querySelectorAll을 리턴 (arry형태)
