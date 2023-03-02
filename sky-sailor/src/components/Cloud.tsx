import './Cloud.css';

import * as THREE from 'three';
import { Color, PerspectiveCamera, Points, PointsMaterial, Scene, WebGLRenderer } from 'three';
import { ImprovedNoise as Noise } from 'three/examples/jsm/math/ImprovedNoise.js';

import React, { useRef, useEffect } from 'react';



const Cloud = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

    // Create a Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const fogDensity = 0.02;
    const fogColor = '#FFFFFF';
    const near = 1;
    const far = 1000;
    const fog = new THREE.Fog(fogColor, near, far);
    scene.fog = fog;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color('skyblue'));
    // scene.background = new THREE.Color('skyblue');

    const createPointCloud = () => {
        // Define the positions, colors, and sizes of the points
        const positions = [];
        const colors = [];
        const sizes = [];
    
        // Define the number of points in the cloud
        const numPoints = 1000;
    
        // Create a Perlin noise generator
        const noise = new Noise();
    
        for (let i = 0; i < numPoints; i++) {
            // Define the x, y, and z positions of the point using Perlin noise
            const x = noise.noise(Math.random() * 5, Math.random() * 5, Math.random() * 5) * 10;
            const y = noise.noise(Math.random() * 5, Math.random() * 5, Math.random() * 5) * 10;
            const z = noise.noise(Math.random() * 5, Math.random() * 5, Math.random() * 5) * 10;
        
            positions.push(x, y, z);
        
            // Define the color of the point
            const color = new THREE.Color();
            color.setHSL(Math.random(), 1.0, 0.5);
            colors.push(color.r, color.g, color.b);
        
            // Define the size of the point
            sizes.push(Math.random() * 5 + 1);
        }
    
        // Create a buffer geometry to hold the point cloud data
        // const geometry = new THREE.BufferGeometry();
        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0
            });
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        // Create a material for the point cloud
        // const material = new THREE.ShaderMaterial({
        //     uniforms: {
        //       pointSize: { value: 3.0 }, // Custom uniform for point size
        //       opacity: { value: 0.5 },
        //       color: { value: new THREE.Vector3().fromArray([1, 1, 1]) },
        //       fogColor: { value: new THREE.Color('white') },
        //       fogNear: { value: fog.near },
        //       fogFar: { value: fog.far }
        //     },
        //     vertexShader: `
        //       uniform float pointSize;
        //       attribute float size;
        //       varying vec4 vColor;
        //       varying float fogDepth;
        //       void main() {
        //         vColor = vec4( color, opacity );
        //         vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        //         gl_PointSize = pointSize * size * ( 1.0 / -mvPosition.z );
        //         gl_Position = projectionMatrix * mvPosition;
        //         fogDepth = -mvPosition.z;
        //       }
        //     `,
        //     fragmentShader: `
        //       uniform float opacity;
        //       uniform vec3 color;
        //       uniform vec3 fogColor;
        //       uniform float fogNear;
        //       uniform float fogFar;
        //       varying vec4 vColor;
        //       varying float fogDepth;
        //       void main() {
        //         float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
        //         gl_FragColor = vec4( vColor.rgb, vColor.a );
        //         gl_FragColor.a *= opacity;
        //         gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
        //       }
        //     `,
        //   });
        // const material = new THREE.PointsMaterial({
        //     size: 1,
        //     color: 'white',
        //     opacity: 0.5,
        //     transparent: true,
        //   });
        // const material = new THREE.PointCloudMaterial({
        //     size: 3,
        //     color: new THREE.Color('white'),
        //     opacity: 0.5,
        //     fog: true,
        //   });
          
          
        // const material = new THREE.PointsMaterial({ color: 0xffffff, size: 5 });
        const pointCloud = new THREE.Mesh(geometry, material);
        scene.add(pointCloud);

        // Create a point cloud mesh using the geometry and material
        // const pointCloud = new THREE.Points(geometry, material);
    
        return pointCloud;
    };
  

  const animate = (pointCloud: THREE.Mesh) => {
    // Rotate the cloud
    pointCloud.rotation.y += 0.001;

    // Render the scene
    renderer.render(scene, camera);

    // Request the next frame of the animation
    requestAnimationFrame(() => animate(pointCloud));
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
    animate(pointCloud);

    return () => {
      console.log('componentWillUnmount');
      // Clean up the scene and remove the renderer from the DOM
      scene.remove(pointCloud);
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={canvasRef} id='cloud-container' className='cloud-points'></div>;
};

export default Cloud;
