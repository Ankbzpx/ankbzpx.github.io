import React, { useState, Suspense } from 'react';
import { useLoader, Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Image from '@theme/IdealImage';
import styles from './styles.module.css';

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
        <div style={{ height: "50vh" }}>
            <Canvas camera={{ position: [0, 1.5, 3], fov: 55 }}>
                <Suspense fallback={null}>
                    <Model />
                    <OrbitControls dampingFactor={0.1} />
                    <Environment preset="sunset" />
                </Suspense>
            </Canvas>
        </div>
    )
}