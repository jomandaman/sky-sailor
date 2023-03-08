import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CloudScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // create scene
    const scene = new THREE.Scene();

    // create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (sceneRef.current) {
    sceneRef.current.appendChild(renderer.domElement);
    }

    // create geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // create material
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // render loop
    const animate = function () {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    function reSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

    // resize listener
    window.addEventListener("resize", reSize);

    return () => {
      // clean up
      window.removeEventListener("resize", reSize);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
}
