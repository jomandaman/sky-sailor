import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Cloud = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 0);
    scene.add(light);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const cloud = new THREE.Mesh(geometry, material);
    scene.add(cloud);

    camera.position.z = 10;
    cloud.position.y = 3;

    function animate() {
      requestAnimationFrame(animate);
      cloud.rotation.x += 0.01;
      cloud.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div ref={mountRef} />;
};

export default Cloud;
