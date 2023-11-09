import { Canvas, useFrame, useLoader, useThree, useGraph } from '@react-three/fiber'
import React, { useMemo, useRef, useState } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Color, MeshStandardMaterial, Vector3 } from 'three';


function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Model({ modelPath }) {
  const obj = useLoader(OBJLoader, modelPath, () => { });
  useMemo(() => obj.traverse(item => {
    if (item.isMesh) {
      item.material = new MeshStandardMaterial({ color: new Color('#C0C0C0') })
    }
  }))
  return <primitive object={obj} />;
}

function Flowline({ modelPath }) {
  const obj = useLoader(OBJLoader, modelPath, () => { });
  return <primitive object={obj} />;
}


export default function FlowlineViewer({ flowlinePath }) {
  return (
    <div style={{ height: "35vh" }}>
      <Canvas camera={{ position: [0, 1.5, 3], fov: 55 }}>
        <ambientLight intensity={Math.PI / 2} />
        <OrbitControls />
        <Environment preset='dawn' />
        <Flowline modelPath={flowlinePath} />
      </Canvas>
    </div>
  );
}