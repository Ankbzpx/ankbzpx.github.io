import React, { useState, Suspense } from 'react';
import { useLoader, Canvas, Html } from "@react-three/fiber";
import { Environment, OrbitControls, useProgress } from "@react-three/drei";
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
        <Canvas camera={{ position: [0.25, 0.5, 0.25], fov: 55 }}>
                <Suspense fallback={null}>
                    <Model />
                    <OrbitControls dampingFactor={0.1} />
                    <Environment preset="sunset" />
                </Suspense>
            </Canvas>
    )
}