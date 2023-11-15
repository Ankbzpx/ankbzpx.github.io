import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Color, DoubleSide, MeshStandardMaterial } from 'three';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


function Model({ modelPath, color }) {
  const model = useLoader(OBJLoader, modelPath, () => { });
  const copiedModel = useMemo(() => {
    model.traverse(obj => {
      if (obj.isMesh) {
        obj.material = new MeshStandardMaterial({ color: new Color(color), side: DoubleSide })
      }
    })
    return model.clone()
  }, [model])
  return <primitive object={copiedModel} />;
}

export default function ToyViewer() {
  const [creaseAngle, setCreaseAngle] = React.useState(60);
  const [enableInput, setEnableInput] = React.useState(true);
  const [enableOct, setEnableOct] = React.useState(true);
  const [enableReg, setEnableReg] = React.useState(true);
  const [enableNoReg, setEnableNoReg] = React.useState(true);

  return (
    <div >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel >Crease Angle</InputLabel>
        <Select
          value={creaseAngle}
          onChange={(event) => { setCreaseAngle(event.target.value) }}
          autoWidth
          label="Crease Angle"
        >
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={90}>90</MenuItem>
          <MenuItem value={120}>120</MenuItem>
          <MenuItem value={150}>150</MenuItem>
        </Select>
      </FormControl>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked value={enableInput} onChange={() => {
          setEnableInput(!enableInput)
        }} sx={{
          color: '#FF6262',
          '&.Mui-checked': {
            color: '#FF6262',
          },
        }} />} label="Input oriented point cloud" />
        <FormControlLabel control={<Checkbox defaultChecked value={enableOct} onChange={() => { setEnableOct(!enableOct) }} sx={{
          color: '#FFC732',
          '&.Mui-checked': {
            color: '#FFC732',
          },
        }} />} label="Octahedral field" />
        <FormControlLabel control={<Checkbox defaultChecked value={enableReg} onChange={() => { setEnableReg(!enableReg) }} sx={{
          color: '#BFE1FF',
          '&.Mui-checked': {
            color: '#BFE1FF',
          },
        }} />} label="Surface with regularization" />
        <FormControlLabel control={<Checkbox defaultChecked value={enableNoReg} onChange={() => { setEnableNoReg(!enableNoReg) }} sx={{
          color: '#B293E4',
          '&.Mui-checked': {
            color: '#B293E4',
          },
        }} />} label="Surface no regularization" />
      </FormGroup>
      <div style={{ height: "50vh" }}>
        <Canvas camera={{ position: [0, 0.5, 2], fov: 55 }}>
          <OrbitControls dampingFactor={0.12} rotateSpeed={0.5}/>
          <ambientLight intensity={Math.PI / 2} />
          <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
          {enableInput && <Model modelPath={`/mesh/toy/oct_supervise/crease_4_${creaseAngle}_sup.obj`} color='#FF6262' />}
          {enableOct && <Model modelPath={`/mesh/toy/oct_interp/crease_4_${creaseAngle}_interp.obj`} color='#FFC732' />}
          {enableReg && <Model modelPath={`/mesh/toy/reg/crease_4_${creaseAngle}_mc.obj`} color='#BFE1FF' />}
          {enableNoReg && <Model modelPath={`/mesh/toy/no_reg/crease_4_${creaseAngle}_mc.obj`} color='#B293E4' />}
        </Canvas>
        <br/>
      </div>
      <br/><br/>
    </div>
  );
}