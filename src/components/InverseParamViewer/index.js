import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Color, MeshPhysicalMaterial, LineBasicMaterial, WireframeGeometry, LineSegments, BufferAttribute } from 'three';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import SaveFigure from "@site/src/components/SaveFigure";

function Model({ modelPath, color }) {
  const model = useLoader(OBJLoader, modelPath, () => { });
  const modelRef = useRef();

  const copiedModel = useMemo(() => {
    model.traverse(obj => {
      if (obj.isMesh) {
        obj.material = new MeshPhysicalMaterial({ color: new Color(color), roughness: 0.8, clearcoat: 0.2, depthTest: true })
      }
    })
    return model.clone()
  }, [model])

  return <primitive ref={modelRef} object={copiedModel} />;
}

function ModelWF({ modelPath, color, wireframeColor, wireframe }) {
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
        const wireframeMat = new LineBasicMaterial({ color: new Color(wireframeColor), depthTest: true, linewidth: 1.5 })
        const wireframeMesh = new LineSegments(wireframeGeo, wireframeMat)

        wireframeMesh.visible = false

        model.add(wireframeMesh)
      }
    })
    return model.clone()
  }, [model])

  return <primitive ref={modelRef} object={copiedModel} />;
}

function QuadWireframe({ name, color }) {
  const geoRef = useRef()

  // Maybe faster if preallocate `bufferGeometry` then update, but don't bother for now...
  useEffect(() => {
    const data = require(`/mesh/inv_param/${name}.json`)
    const positions = new Float32Array(data.V)
    geoRef.current.setIndex(data.uE)
    geoRef.current.setAttribute('position', new BufferAttribute(positions, 3));

  }, [name])

  return <lineSegments >
    <bufferGeometry ref={geoRef} >
    </bufferGeometry>
    <lineBasicMaterial color={color} linewidth={1.5} />
  </lineSegments>;
}

export default function InverseParamViewer({ name, target, position }) {
  const [useDC, setUseDC] = React.useState(true);
  const [enableWireframe, setEnableWireframe] = React.useState(true);
  const [showSave, setShowSave] = React.useState(false);

  return (
    <div>
      <FormControlLabel control={<Checkbox defaultChecked value={useDC} onChange={() => { setUseDC(!useDC) }} />} label="Dual Contouring" />
      <FormControlLabel control={<Checkbox defaultChecked value={enableWireframe} onChange={() => { setEnableWireframe(!enableWireframe) }} />} label="Enable wireframe" />
      {/* <FormControlLabel control={<Checkbox value={showSave} onChange={() => { setShowSave(!showSave) }} />} label="Show save" /> */}
      <div class="row">
        <div class="col col--6">
          <div style={{ height: showSave ? "80vh" : "50vh" }}>
            <Canvas camera={{ position: position, fov: 55 }}>
              <Environment files='/img/kiara_1_dawn_1k.hdr' />
              <OrbitControls dampingFactor={0.1} target={target} />
              {
                useDC ? <>
                  <Model modelPath={`/mesh/inv_param/${name}_inv_param_dc.obj`} color='#FF9A2D' />
                  {enableWireframe && <QuadWireframe name={`${name}_inv_param_dc`} color='#884700' />}
                </> : <>
                  <ModelWF modelPath={`/mesh/inv_param/${name}_inv_param_mc.obj`} color='#FF9A2D' wireframeColor='#884700' wireframe={enableWireframe} />
                </>
              }
              {showSave && <SaveFigure name={`${name}_param`} />}
            </Canvas>
            <p style={{ textAlign: 'center' }}>Extraction in parameterization space</p>
          </div>
        </div>
        <div class="col col--6">
          <div style={{ height: showSave ? "80vh" : "50vh" }}>
            <Canvas camera={{ position: position, fov: 55 }}>
              <Environment files='/img/kiara_1_dawn_1k.hdr' />
              <OrbitControls dampingFactor={0.1} target={target} />
              {
                useDC ? <>
                  <Model modelPath={`/mesh/inv_param/${name}_dc.obj`} color='#2DC9FF' />
                  {enableWireframe && <QuadWireframe name={`${name}_dc`} color='#00526F' />}
                </> : <>
                  <ModelWF modelPath={`/mesh/inv_param/${name}_mc.obj`} color='#2DC9FF' wireframeColor='#00526F' wireframe={enableWireframe} />
                </>
              }
              {showSave && <SaveFigure name={`${name}_original`} />}
            </Canvas>
            <p style={{ textAlign: 'center' }} >Extraction in original space</p>
          </div>
        </div>
      </div>
      <br /><br />
    </div>

  );
}