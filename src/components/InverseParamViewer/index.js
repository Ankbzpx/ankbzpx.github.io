import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Color, MeshPhysicalMaterial, BufferAttribute, LineBasicMaterial, WireframeGeometry, LineSegments } from 'three';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Model({ modelPath, color, wireframeColor, wireframe }) {
    const model = useLoader(OBJLoader, modelPath, () => { });
    const modelRef = useRef();

    useEffect(() => {
        modelRef.current.traverse(obj => {
            if (obj.isLineSegments) {
                obj.visible = wireframe
            }
        })
    }, [wireframe])

    const copiedModel = useMemo(() => {
        model.traverse(obj => {
            if (obj.isMesh) {
                obj.material = new MeshPhysicalMaterial({ color: new Color(color), roughness: 0.8, clearcoat: 0.2, depthTest: true })

                const wireframeGeo = new WireframeGeometry(obj.geometry)
                const wireframeMat = new LineBasicMaterial({ color: new Color(wireframeColor), depthTest: true })
                const wireframeMesh = new LineSegments(wireframeGeo, wireframeMat)

                wireframeMesh.visible = false

                model.add(wireframeMesh)
            }
        })
        return model.clone()
    }, [model])

    return <primitive ref={modelRef} object={copiedModel} />;
}

export default function InverseParamViewer({ name, target }) {
    const [enableWireframe, setEnableWireframe] = React.useState(false);

    return (
        <div>
            <FormControlLabel control={<Checkbox value={enableWireframe} onChange={() => { setEnableWireframe(!enableWireframe) }} />} label="Enable wireframe" />
            <div class="row">
                <div class="col col--6">
                    <div style={{ height: "50vh" }}>
                        <Canvas camera={{ position: [-2, 1.5, -1], fov: 55 }}>
                            <Environment preset='dawn' />
                            <OrbitControls dampingFactor={0.1} target={target} />
                            <Model modelPath={`/mesh/inv_param/${name}_inv_param_mc.obj`} color='#FF9A2D' wireframeColor='#884700' wireframe={enableWireframe} />
                        </Canvas>
                        <p style={{ textAlign: 'center' }}>MC in parameterization space</p>
                    </div>
                </div>
                <div class="col col--6">
                    <div style={{ height: "50vh" }}>
                        <Canvas camera={{ position: [-2, 1.5, -1], fov: 55 }}>
                            <Environment preset='dawn' />
                            <OrbitControls dampingFactor={0.1} target={target} />
                            <Model modelPath={`/mesh/inv_param/${name}_mc.obj`} color='#2DC9FF' wireframeColor='#00526F' wireframe={enableWireframe} />
                        </Canvas>
                        <p style={{ textAlign: 'center' }} >MC in original space</p>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>

    );
}