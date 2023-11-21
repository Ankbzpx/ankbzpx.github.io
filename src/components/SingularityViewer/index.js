import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Color, MeshBasicMaterial, BufferAttribute } from 'three';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SaveFigure from "@site/src/components/SaveFigure";

function Model({ modelPath, color, opacity }) {
  const model = useLoader(OBJLoader, modelPath, () => { });
  const copiedModel = useMemo(() => {
    model.traverse(obj => {
      if (obj.isMesh) {
        obj.material = new MeshBasicMaterial({ color: new Color(color), transparent: true, opacity: opacity, depthTest: false })
      }
    })
    return model.clone()
  }, [model])
  return <primitive object={copiedModel} />;
}

function SingularityLine({ name }) {
  const geoRef = useRef()

  // Maybe faster if preallocate `bufferGeometry` then update, but don't bother for now...
  useEffect(() => {
    const data = require(`/mesh/singularity/${name}.json`)
    const positions = new Float32Array(data.V)
    geoRef.current.setIndex(data.uE)
    geoRef.current.setAttribute('position', new BufferAttribute(positions, 3));

  }, [name])

  return <lineSegments >
    <bufferGeometry ref={geoRef} >
    </bufferGeometry>
    <lineBasicMaterial color={'#920000'} />
  </lineSegments>;
}

export default function SingularityViewer() {
  const [model, setModel] = React.useState('cylinder');
  const [showSave, setShowSave] = React.useState(false);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel >Model</InputLabel>
        <Select
          value={model}
          onChange={(event) => { setModel(event.target.value) }}
          autoWidth
          label="Model"
        >
          <MenuItem value={'bunny'}>Bunny</MenuItem>
          <MenuItem value={'cylinder'}>Cylinder</MenuItem>
          <MenuItem value={'fandisk'}>Fandisk</MenuItem>
          <MenuItem value={'join'}>Join</MenuItem>
          <MenuItem value={'rocker_arm'}>RockerArm</MenuItem>
        </Select>
        <FormControlLabel control={<Checkbox value={showSave} onChange={() => { setShowSave(!showSave) }} />} label="Show save" />
      </FormControl>
      <div style={{ height: "35vh" }}>
        <Canvas camera={{ position: [0, 1.5, 3], fov: 55 }}>
          <ambientLight intensity={Math.PI / 2} />
          <OrbitControls dampingFactor={0.1} />
          <SingularityLine name={`${model}`} />
          <Model modelPath={`/mesh/singularity/${model}_tet_bound.obj`} opacity={0.2} />
          <Model modelPath={`/mesh/singularity/${model}.obj`} color={'#FFD43F'} opacity={0.4} />
          {showSave && <SaveFigure name={`singularity_${model}`} />}
        </Canvas>
      </div>
    </div>
  );
}