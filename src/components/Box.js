import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const [turningRight, set] = useState(true);
    const yScale = props.yScale || 4;

    useFrame(() => {
        let newRotation;
        if (turningRight) {
            newRotation = mesh.current.rotation.y + .0025 / 8;
            if (newRotation > 0.1) {
                set(false);
            }
        } else {
            newRotation = mesh.current.rotation.y - .0025 / 8;
            if (newRotation < -0.1) {
                set(true)
            }
        }
        mesh.current.rotation.y = newRotation;
    });

    return (
        <mesh
            castShadow={true}
            receiveShadow={true}
            {...props}
            ref={mesh}
            rotation={[0, 0, 0]}
            scale={[yScale + (yScale / 9) * 7, yScale, 4]}
        >
            <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshBasicMaterial attach="material">
                <videoTexture args={[props.vidEl]} attach="map" />
            </meshBasicMaterial>
        </mesh>
    );
}
