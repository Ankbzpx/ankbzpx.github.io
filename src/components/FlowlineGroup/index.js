import React, { useState } from 'react';
import Select from 'react-select';
import FlowlineViewer from "@site/src/components/FlowlineViewer";
import { Center } from '@react-three/drei';

const options = [
    { value: 'bunny', label: 'Bunny' },
    { value: 'cube_twist', label: 'CubeTwist' },
    { value: 'cylinder', label: 'Cylinder' },
    { value: 'fandisk', label: 'Fandisk' },
    { value: 'join', label: 'Join' },
    { value: 'rocker_arm', label: 'RockerArm' },
];

export default function FlowlineGroup() {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <div >
            <div style={{ width: '35vh' }}>
                <Select
                    defaultValue={options[0]}
                    onChange={setSelectedOption}
                    options={options}
                />
            </div>

            <div class="row">
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${selectedOption.value}_ext.obj`}
                    />
                    <p style={{textAlign: 'center'}}><cite><a href="https://adshhzy.github.io/projectfolder/ESDF/extrinsic.pdf">Extrinsically Smooth Direction Fields</a></cite> by Huang et al.</p>
                </div>
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${selectedOption.value}_prac.obj`}
                    />
                    <p style={{textAlign: 'center'}}><cite><a href="https://dl.acm.org/doi/pdf/10.1145/2980179.2982408">Practical 3D frame field generation</a></cite> by Ray et al.</p>
                </div>
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${selectedOption.value}_oct.obj`}
                    />
                    <p style={{textAlign: 'center'}}><cite><a href="https://people.csail.mit.edu/jsolomon/assets/crossfields.pdf">Octahedral Frames for Feature-Aligned Cross Fields</a></cite><sup>*</sup> by Zhang et al.</p>
                </div>
                <div class="col col--3">
                    <FlowlineViewer
                        flowlinePath={`/mesh/flowline/${selectedOption.value}_mlp.obj`}
                    />
                    <p style={{textAlign: 'center'}}>Ours</p>
                </div>
            </div>
        </div>
    );
}