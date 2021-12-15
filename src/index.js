import ReactDOM from 'react-dom';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import './styles.css';
import { Stats } from '@react-three/drei';
import Box from './components/Box';

ReactDOM.render(
    <Canvas colorManagement>
        <Stats />
        <pointLight position={[100, 10, 1000]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
    </Canvas>,
    document.getElementById('root')
);
