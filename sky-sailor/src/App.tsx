import { useRef, useState } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, Image, PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import THREE from 'three';

import { px, py, pz, nx, ny, nz } from './assets/assets';

function Box(props : any) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current ? ref.current.rotation.x += delta : null))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
}

export default function App() {
    // const path = require('/assets/paintedsky');

    return (
        <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
            <Canvas>
            <color attach="background" args={['gray']} />    
                <Environment
                    background={true} // can be true, false or "only" (which only sets the background) (default: false)
                    // blur={0} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
                    files={[px, nx, py, ny, pz, nz]}
                    // path={"/assets/paintedsky"}
                    // preset={"park"}
                    // scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
                    // encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
                />
                {/* <Image scale={3} url={nz} /> */}
                {/* <mesh>
                    <planeBufferGeometry attach="geometry" args={[3, 3]} />
                    <meshBasicMaterial attach="material" map={texture} />
                </mesh> */}
                <CameraControls makeDefault >
                        <PerspectiveCamera makeDefault 
                            fov={70} 
                            aspect={window.innerWidth / window.innerHeight}  
                            near={1} 
                            far={20}
                            position={[-4.37, 0, -4.75]}
                        />
                </CameraControls>
                <hemisphereLight args={[0xffffff, 0xbbbbff, 1]} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                {/* <pointLight position={[-10, -10, -10]} /> */}
                    {/* <Cloud
                        opacity={0.5}
                        speed={0.4} // Rotation speed
                        width={10} // Width of the full cloud
                        depth={1.5} // Z-dir depth
                        segments={20} // Number of particles
                    /> */}
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <OrbitControls />
            </Canvas>
            
        </div>
    )
}