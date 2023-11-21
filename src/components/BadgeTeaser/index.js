import React, { Suspense } from 'react';
import { useLoader, Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/mesh/badge/badge.glb");
  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
};


export default function BadgeTeaser() {
  return (
    <Canvas camera={{ position: [0.25, 0.5, 0.25], fov: 55 }}>
      <Suspense fallback={null}>
        <Model />
        <OrbitControls dampingFactor={0.1} />
        <Environment files='/img/kiara_1_dawn_1k.hdr' />
      </Suspense>
    </Canvas>
  )
}