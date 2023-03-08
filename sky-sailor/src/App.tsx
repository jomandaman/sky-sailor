import ReactDOM from 'react-dom';
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import THREE from 'three';

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

    return (
        <div id="canvas-container">
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <OrbitControls />
            </Canvas>

            
                {/* <Canvas camera={{
                    position: [-4.37, 0, -4.75],
                    fov: 70,
                    aspect: window.innerWidth / window.innerHeight,
                    near: 0.01,
                    far: 100,
                }}
            >
                <CameraControls />
                <hemisphereLight args={[0xffffff, 0xbbbbff, 1]} />
                {/* <PerspectiveCamera 
                    args={[ 70, window.innerWidth / window.innerHeight, 0.01, 100 ]} 
                    position={[-4.37, 0, -4.75]} 
                /> 

                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh> </Canvas> */}
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))