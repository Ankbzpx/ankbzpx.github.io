import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useState } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Color, DoubleSide, MeshBasicMaterial, MeshPhysicalMaterial } from 'three';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import SaveFigure from "@site/src/components/SaveFigure";


function Model({ modelPath, color }) {
  const model = useLoader(OBJLoader, modelPath, () => { });
  const copiedModel = useMemo(() => {
    model.traverse(obj => {
      if (obj.isMesh) {
        obj.material = new MeshPhysicalMaterial({ color: new Color(color), roughness: 0.8, clearcoat: 0.2 })
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
    return model.clone()
  }, [model])
  return <primitive object={copiedModel} />;
}

function ModelLine({ modelPath, color }) {
  const model = useLoader(OBJLoader, modelPath, () => { });
  const copiedModel = useMemo(() => {
    model.traverse(obj => {
      if (obj.isMesh) {
        obj.material = new MeshBasicMaterial({ color: new Color(color) })
      }
    })
    return model.clone()
  }, [model])
  return <primitive object={copiedModel} />;
}

export default function RegViewer() {
  const [numSamples, setNumSamples] = React.useState(2500);
  const [enableReg, setEnableReg] = React.useState(true);
  const [enableRef, setEnableRef] = React.useState(false);
  const [enableInput, setEnableInput] = React.useState(true);
  const [showSave, setShowSave] = React.useState(false);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel >Number input samples</InputLabel>
        <Select
          value={numSamples}
          onChange={(event) => { setNumSamples(event.target.value) }}
          autoWidth
          label="Model"
        >
          <MenuItem value={'500'}>500</MenuItem>
          <MenuItem value={'1000'}>1000</MenuItem>
          <MenuItem value={'2500'}>2500</MenuItem>
          <MenuItem value={'5000'}>5000</MenuItem>
          <MenuItem value={'10000'}>10000</MenuItem>
        </Select>
      </FormControl>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked value={enableReg} onChange={() => { setEnableReg(!enableReg) }} sx={{
          color: '#7EDFE9',
          '&.Mui-checked': {
            color: '#7EDFE9',
          },
        }} />} label="Surface with regularization" />
        <FormControlLabel control={<Checkbox value={enableRef} onChange={() => { setEnableRef(!enableRef) }} sx={{
          color: '#FFD43F',
          '&.Mui-checked': {
            color: '#FFD43F',
          },
        }} />} label="Reference surface without regularization (10000 samples)" />
        <FormControlLabel control={<Checkbox defaultChecked value={enableInput} onChange={() => { setEnableInput(!enableInput) }} sx={{
          color: '#920000',
          '&.Mui-checked': {
            color: '#920000',
          },
        }} />} label="Input oriented pointcloud (10000 one matches reference)" />
        <FormControlLabel control={<Checkbox value={showSave} onChange={() => { setShowSave(!showSave) }} />} label="Show save" />
      </FormGroup>
      <div style={{ height: "50vh" }}>
        <Canvas camera={{ position: [0, 0.75, 1.5], fov: 55 }}>
          <OrbitControls dampingFactor={0.12} rotateSpeed={0.5} />
          <Environment files='/img/kiara_1_dawn_1k.hdr' />
          {enableReg && <Model modelPath={`/mesh/reg/${numSamples}/fandisk_lip2_reg_mc.obj`} color='#7EDFE9' />}
          {enableInput && <ModelLine modelPath={`/mesh/reg/${numSamples}/fandisk_lip2_reg_sup.obj`} color='#920000' />}
          {enableRef && <Model modelPath={`/mesh/reg/fandisk_lip2_ref.obj`} color='#FFD43F' />}
          {showSave && <SaveFigure name={`regularize_${numSamples}`} />}
        </Canvas>
      </div>
    </div>)

}