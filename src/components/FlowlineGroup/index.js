import React, { useState } from 'react';
import Select from '@mui/material/Select';
import FlowlineViewer from "@site/src/components/FlowlineViewer";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function FlowlineGroup() {
    const [model, setModel] = React.useState('bunny');

    return (
        <div >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >Model</InputLabel>
                <Select
                    value={model}
                    onChange={(event) => { setModel(event.target.value) }}
                    autoWidth
                    label="Model"
                >
                    <MenuItem value={'bunny'}>Bunny</MenuItem>
                    <MenuItem value={'cube_twist'}>CubeTwist</MenuItem>
                    <MenuItem value={'cylinder'}>Cylinder</MenuItem>
                    <MenuItem value={'fandisk'}>Fandisk</MenuItem>
                    <MenuItem value={'join'}>Join</MenuItem>
                    <MenuItem value={'rocker_arm'}>RockerArm</MenuItem>
                </Select>
            </FormControl>

            <div class="row">
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${model}_ext.obj`}
                    />
                    <p style={{ textAlign: 'center' }}><cite><a href="https://adshhzy.github.io/projectfolder/ESDF/extrinsic.pdf">Extrinsically Smooth Direction Fields</a></cite> by Huang et al.</p>
                </div>
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${model}_prac.obj`}
                    />
                    <p style={{ textAlign: 'center' }}><cite><a href="https://dl.acm.org/doi/pdf/10.1145/2980179.2982408">Practical 3D frame field generation</a></cite> by Ray et al.</p>
                </div>
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${model}_oct.obj`}
                    />
                    <p style={{ textAlign: 'center' }}><cite><a href="https://people.csail.mit.edu/jsolomon/assets/crossfields.pdf">Octahedral Frames for Feature-Aligned Cross Fields</a></cite><sup>*</sup> by Zhang et al.</p>
                </div>
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${model}_mlp.obj`}
                    />
                    <p style={{ textAlign: 'center' }}>Ours</p>
                </div>
            </div>
        </div>
    );
}