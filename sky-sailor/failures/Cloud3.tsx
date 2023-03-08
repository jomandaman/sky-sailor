import './Cloud.css';

import * as THREE from 'three';
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { ImprovedNoise as Noise } from 'three/examples/jsm/math/ImprovedNoise.js';

import React, { useRef, useEffect } from 'react';

interface PointCloudObject extends THREE.Object3D {
  material: THREE.MeshPhongMaterial;
}

const Cloud2 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

    // Create a Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const fogColor = '#fff';
    const fogDensity = 0.02;
    const near = 1;
    const far = 1000;
    const fog = new THREE.FogExp2(fogColor, fogDensity);
    scene.fog = fog;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, near, far);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color('skyblue'));
    // scene.background = new THREE.Color('skyblue');

    const createPointCloud = () => {
      const numSpheres = 1000;
      const sphereRadius = 0.2;
      const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
    
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 20,
        fog: true // enable fog on the material
      });
    
      const spheres = new THREE.Group();
    
      const noise = new Noise();
    
      for (let i = 0; i < numSpheres; i++) {
        const x = noise.noise(Math.random() * 5, Math.random() * 5, Math.random() * 5) * 10;
        const y = noise.noise(Math.random() * 5, Math.random() * 5, Math.random() * 5) * 10;
        const z = noise.noise(Math.random() * 5, Math.random() * 5, Math.random() * 5) * 10;
    
        const sphere = new THREE.Mesh(sphereGeometry, material); // THIS IS IMPORTANT!!!
        sphere.position.set(x, y, z);
    
        spheres.add(sphere);
      }
    
      const pointCloud: PointCloudObject = new THREE.Object3D() as PointCloudObject;
      pointCloud.material = material;
      pointCloud.add(spheres);
    
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(5, 20, 10);
      scene.add(light);
    
      scene.add(pointCloud);
      const cameraDistance = camera.position.distanceTo(pointCloud.position);
      animate(pointCloud, cameraDistance);
    
      return pointCloud;
    };

    const animate = (pointCloud: PointCloudObject, cameraDistance: number) => {
      pointCloud.rotation.y += 0.001;
      const sphereMaxDistance = 10; // the maximum distance from the camera at which a sphere should be fully lit
      const sphereMinDistance = 2; // the minimum distance from the camera at which a sphere should be fully fogged
      for (let i = 0; i < pointCloud.children[0].children.length; i++) {
        const sphere = pointCloud.children[0].children[i] as THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>;
        const distanceFromCamera = cameraDistance - sphere.position.distanceTo(camera.position);
        const emissiveIntensity = THREE.MathUtils.clamp((distanceFromCamera - sphereMinDistance) / (sphereMaxDistance - sphereMinDistance), 0, 1);
        const emissiveColor = new THREE.Color(0xffffff).multiplyScalar(emissiveIntensity);
        sphere.material.emissive = emissiveColor;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(() => animate(pointCloud, cameraDistance));
    };
    
    
    

    useEffect(() => {
      console.log('componentDidMount');
      // Add the point cloud to the scene
      const pointCloud = createPointCloud();
      scene.add(pointCloud);
    
      // Set the position of the camera
      camera.position.set(0, 0, 20);
      camera.lookAt(0, 0, 0);
    
      // Set the size of the renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
    
      // Add the renderer to the HTML element
      if (canvasRef.current) {
        console.log('renderer added to DOM');
        canvasRef.current.appendChild(renderer.domElement);
      }
    
      // Start the animation loop
      animate(pointCloud, camera.position.z);
    
      return () => {
        console.log('componentWillUnmount');
        // Clean up the scene and remove the renderer from the DOM
        scene.remove(pointCloud);
        renderer.domElement.remove();
      };
    }, []);
    

  return <div ref={canvasRef} id='cloud-container' className='cloud-points'></div>;
};

export default Cloud2;
