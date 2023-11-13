import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Color, MeshBasicMaterial, MeshPhysicalMaterial, DoubleSide, WireframeGeometry, LineBasicMaterial, LineSegments, Vector3, BufferGeometry } from 'three';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';


function Model({ modelPath, color, opacity }) {
    const model = useLoader(OBJLoader, modelPath, () => { });
    const copiedModel = useMemo(() => {
        model.traverse(obj => {
            if (obj.isMesh) {
                obj.material = new MeshBasicMaterial({ color: new Color(color), transparent: true, opacity: opacity, depthTest: false, side: DoubleSide })
            }
        })
        return model.clone()
    }, [model])
    return <primitive object={copiedModel} />;
}

function ModelWF({ modelPath, color, opacity, wireframeColor }) {
    const model = useLoader(OBJLoader, modelPath, () => { });
    const modelRef = useRef();

    const copiedModel = useMemo(() => {
        model.traverse(obj => {
            if (obj.isMesh) {
                obj.material = new MeshBasicMaterial({ color: new Color(color), transparent: true, opacity: opacity, depthTest: false, side: DoubleSide })

                const wireframeGeo = new WireframeGeometry(obj.geometry)
                const wireframeMat = new LineBasicMaterial({ color: new Color(wireframeColor), depthTest: true })
                const wireframeMesh = new LineSegments(wireframeGeo, wireframeMat)
                model.add(wireframeMesh)
            }
        })
        return model.clone()
    }, [model])

    return <primitive ref={modelRef} object={copiedModel} />;
}

function ModelPBR({ modelPath, color, opacity }) {
    const model = useLoader(OBJLoader, modelPath, () => { });
    const copiedModel = useMemo(() => {
        model.traverse(obj => {
            if (obj.isMesh) {
                obj.material = new MeshPhysicalMaterial({ color: new Color(color), roughness: 0.8, clearcoat: 0.2, transparent: true, opacity: opacity })
                obj.castShadow = true
                obj.receiveShadow = true
            }
        })
        return model.clone()
    }, [model, opacity, color])
    return <primitive object={copiedModel} />;
}

function SingularityLine() {
    const data = require(`/mesh/param/cylinder_lip.json`)
    const positions = new Float32Array(data.V)
    const indices = new Uint32Array(data.uE)

    return <lineSegments >
        <bufferGeometry >
            <bufferAttribute
                attach="attributes-position"
                array={positions}
                count={positions.length / 3}
                itemSize={3}
            />
            <bufferAttribute
                attach="index"
                array={indices}
                count={indices.length}
                itemSize={1}
            />
        </bufferGeometry>
        <lineBasicMaterial color={'#920000'} depthTest={false} />
    </lineSegments>;
}

function Frame({ name, enableX, enableY, enableZ }) {

    const data = require(`/mesh/param/${name}.json`)
    const num_arr = data.V.length / 3

    const dirsX = []
    const dirsY = []
    const dirsZ = []
    const segLength = 0.05

    for (let i = 0; i < num_arr; i++) {
        const origin = new Vector3(data.V[3 * i], data.V[3 * i + 1], data.V[3 * i + 2])
        const dirX = new Vector3(data.x[3 * i], data.x[3 * i + 1], data.x[3 * i + 2])
        const endX = origin.clone().add(dirX.clone().multiplyScalar(segLength))

        dirsX.push(origin)
        dirsX.push(endX)

        const dirY = new Vector3(data.y[3 * i], data.y[3 * i + 1], data.y[3 * i + 2])
        const endY = origin.clone().add(dirY.clone().multiplyScalar(segLength))

        dirsY.push(origin)
        dirsY.push(endY)

        const dirZ = new Vector3(data.z[3 * i], data.z[3 * i + 1], data.z[3 * i + 2])
        const endZ = origin.clone().add(dirZ.clone().multiplyScalar(segLength))

        dirsZ.push(origin)
        dirsZ.push(endZ)
    }

    const geoX = new BufferGeometry().setFromPoints(dirsX);
    const geoY = new BufferGeometry().setFromPoints(dirsY);
    const geoZ = new BufferGeometry().setFromPoints(dirsZ);


    return <>
        {enableX && <lineSegments geometry={geoX} >
            <lineBasicMaterial color={'#E96462'} />
        </lineSegments>}
        {enableY && <lineSegments geometry={geoY} >
            <lineBasicMaterial color={'#B8E962'} />
        </lineSegments>}
        {enableZ && <lineSegments geometry={geoZ} >
            <lineBasicMaterial color={'#62C8E9'} />
        </lineSegments>}
    </>
}

export default function ParamViewer() {
    const [comb, setComb] = React.useState(true);
    const [enableX, setEnableX] = React.useState(true);
    const [enableY, setEnableY] = React.useState(true);
    const [enableZ, setEnableZ] = React.useState(true);
    const [cutFix, setCutFix] = React.useState(true);
    const [showGrad, setShowGrad] = React.useState(false);

    return (
        <div>
            <div class="row">
                <div class="col col--4">
                    <div style={{ height: "50vh" }}>
                        <Canvas camera={{ position: [0, 1.5, 3], fov: 55 }}>
                            <ambientLight intensity={Math.PI / 2} />
                            <OrbitControls dampingFactor={0.1} />

                            {/* <Model modelPath={`/mesh/param/cylinder_lip_tet_bound.obj`} opacity={0.2} /> */}
                            <Model modelPath={`/mesh/param/cylinder_lip_mc.obj`} color='#696969' opacity={0.2} />
                            {comb ? <><Frame name='frames_comb' enableX={enableX} enableY={enableY} enableZ={enableZ} />
                                <SingularityLine /></> :
                                <Frame name='frames' enableX={enableX} enableY={enableY} enableZ={enableZ} />}

                        </Canvas>
                    </div>
                    <FormControlLabel control={<Switch defaultChecked value={comb} onChange={() => { setComb(!comb) }} />} label="Comb" />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked value={enableX} onChange={() => { setEnableX(!enableX) }} sx={{
                            color: '#E96462',
                            '&.Mui-checked': {
                                color: '#E96462',
                            },
                        }} />} label="Enable X" />
                        <FormControlLabel control={<Checkbox defaultChecked value={enableY} onChange={() => { setEnableY(!enableY) }} sx={{
                            color: '#B8E962',
                            '&.Mui-checked': {
                                color: '#B8E962',
                            },
                        }} />} label="Enable Y" />
                        <FormControlLabel control={<Checkbox defaultChecked value={enableZ} onChange={() => { setEnableZ(!enableZ) }} sx={{
                            color: '#62C8E9',
                            '&.Mui-checked': {
                                color: '#62C8E9',
                            },
                        }} />} label="Enable Z" />
                    </FormGroup>

                </div>
                <div class="col col--4">

                    <div style={{ height: "50vh" }}>
                        <Canvas camera={{ position: [0, 1.5, 3], fov: 55 }}>
                            <ambientLight intensity={Math.PI / 2} />
                            <OrbitControls dampingFactor={0.1} />
                            <Model modelPath={`/mesh/param/cylinder_lip_tet_bound.obj`} opacity={0.2} />
                            {
                                cutFix ?
                                    <>
                                        <ModelWF modelPath={`/mesh/param/seams_fix.obj`} color='#2DC9FF' wireframeColor='#00526F' opacity={0.4} />
                                        {/* FIXME: figure out a way to sort transparency */}
                                        <SingularityLine />

                                    </> : <>
                                        <ModelWF modelPath={`/mesh/param/seams.obj`} color='#2DC9FF' wireframeColor='#00526F' opacity={0.4} />
                                    </>
                            }
                        </Canvas>
                    </div>
                    <FormControlLabel control={<Switch defaultChecked value={cutFix} onChange={() => { setCutFix(!cutFix) }} />} label="Cut fix" />
                </div>
                <div class="col col--4">
                    <div style={{ height: "50vh" }}>
                        <Canvas camera={{ fov: 55 }}>
                            <Environment preset='dawn' />
                            <OrbitControls dampingFactor={0.1} target-y={1.25} />
                            <ModelPBR modelPath={`/mesh/param/params.obj`} color={showGrad ? '#696969': '#FFD43F'} opacity={showGrad ? 0.1 : 1.0} />
                            {showGrad && <Frame name='param_grad' enableX={enableX} enableY={enableY} enableZ={enableZ} />}
                        </Canvas>
                    </div>
                    <FormControlLabel control={<Checkbox value={showGrad} onChange={() => { setShowGrad(!showGrad) }} />} label="Show gradient" />
                </div>
            </div>
        </div>
    );
}