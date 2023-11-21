import { Canvas, useLoader } from '@react-three/fiber'
import React, { useMemo } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// https://stackoverflow.com/questions/67154742/react-three-react-three-fiber-useloader-to-load-new-file-on-props-change
function Flowline({ modelPath }) {
  const obj = useLoader(OBJLoader, modelPath, () => { });
  const copiedObj = useMemo(()=>obj.clone(), [obj])
  return <primitive object={copiedObj} />;
}


export default function FlowlineViewer({ flowlinePath }) {
  return (
    <div style={{ height: "35vh" }}>
      <Canvas camera={{ position: [0, 1.5, 3], fov: 55 }}>
        <ambientLight intensity={Math.PI} />
        <OrbitControls dampingFactor={0.1}/>
        <Flowline modelPath={flowlinePath} />
      </Canvas>
    </div>
  );
}