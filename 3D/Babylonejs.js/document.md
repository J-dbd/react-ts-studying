0115 공부 시작

# CSR? SSR?

일단 프로젝트를 시작하기 전에 next.js를 쓸 지 말 지를 생각해봐야 했다. 이번 프로젝트는 WebGL을 통해 3d개체가 복잡하고 많은 상호작용을 할 예정이므로 서버 측에서 랜더링하여 보내주는 SSR보다는 CSR을 선택해야 할 것 같았다. 이 생각이 맞는지는 검색을 좀 더 해봐야 한다.

[Quora 게시글](https://www.quora.com/For-rendering-manipulable-3D-objects-on-a-browser-server-side-render-or-client-side-render-which-is-better)

threejs에서 제공하는 예시 사이트 중 [이 사이트](https://threejs.org/examples/webgl_postprocessing_ssr.html) 를 보면 가능한 모양인데 아래에서 볼 doc에 예시가 더 있는 모양이다.

과연 어떤 랜더링이 더 좋은 사용자 경험을 줄 수 있을까?

# babylonJS

- 공식에서 제공하는 [게임](https://spacepirates.babylonjs.com/)과 [깃허브](https://github.com/BabylonJS/SpacePirates)
