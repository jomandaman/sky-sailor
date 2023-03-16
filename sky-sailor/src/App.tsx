import { useRef, useState } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, PerspectiveCamera, OrbitControls, Environment, Cloud, Sky } from '@react-three/drei';
import THREE from 'three';

import { px, py, pz, nx, ny, nz } from './assets/assets';
import { Plane } from 'components/Plane';

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

export default function App(props: any) {

    return (
        <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
            <Canvas>
            <color attach="background" args={['gray']} />    
                {/* <Environment
                    background={true} 
                    files={[px, nx, py, ny, pz, nz]}
                /> */}
                <CameraControls makeDefault >
                    <PerspectiveCamera makeDefault 
                        position={[0,0,10]}
                        {...props}
                    />
                </CameraControls>
                <hemisphereLight args={[0xffffff, 0xbbbbff, 1]} />
                <Sky
                    distance={4500}
                    sunPosition={[0, 1, 8]}
                    inclination={10}
                    azimuth={.25}
                    mieCoefficient={0}
                    turbidity={0}
                    {...props}
                />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                {/* <pointLight position={[-10, -10, -10]} /> */}
                {/* <Cloud size={2} rotation={[0, Math.PI / 2, 0]} position={[20, 0, 0]} scale={[2, 2, 2]} /> */}
                {/* <Box position={[-1.2, 0, 0]} /> */}
                <Plane />
                {/* <Box position={[1.2, 0, 0]} /> */}
                <OrbitControls />
            </Canvas>
            
        </div>
    )
}