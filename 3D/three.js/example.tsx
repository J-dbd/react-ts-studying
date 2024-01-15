import "./threeJS.css";
import * as THREE from "three";

import { useEffect, useRef } from "react";

const ThreeDJS = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /** use 'useEffect for rendering when Component is mounted or unmounted, by calling rederer.rednder */
  useEffect(() => {
    console.log("3d rendering is started!");
    /** Set sence and Camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    /** Set Renderer  */
    try {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      /** Set Cube */
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      /** Add object to the scene */
      scene.add(cube);

      /** Set Animation Loop */
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      /**
       * 렌더링이 시도되는 부분은 renderer.render(scene, camera); 코드가 실행되는 부분입니다. 이 부분에서 Three.js는 scene에 있는 객체들을 camera의 관점에서 렌더링합니다. 이 코드는 animate 함수 내부에 있으므로, animate 함수가 호출될 때마다 렌더링이 실행
       *
       */
      animate();

      /** add renderer to container */
      //containerRef.current?.appendChild(renderer.domElement);

      /** 두 번째 자식 노드가 있는지 확인하려면 childNodes를 사용하여 접근할 수 있습니다. childNodes는 노드의 모든 자식을 NodeList로 반환합니다. 이를 이용하면 다음과 같이 두 번째 자식 노드가 있는지 확인할 수 있 */
      if (containerRef.current?.childNodes[1]) return;
      else {
        containerRef.current?.appendChild(renderer.domElement);
      }

      /** clean scene resources when the component is unmounted */
      return () => {
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    } catch (e) {
      console.log("This Browser does not support WebGL");
      return;
    }
  }, []);
  return (
    <>
      <div id="threeD-container" ref={containerRef}>
        <h1>Three JS 연습 화면 입니다.</h1>
      </div>
    </>
  );
};

export default ThreeDJS;
