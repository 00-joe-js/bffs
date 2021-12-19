import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const [turningRight, set] = useState(true);
    const yScale = 4;

    useFrame(() => {
        let newRotation;
        if (turningRight) {
            newRotation = mesh.current.rotation.y + .01;
            if (newRotation > 1.2) {
                set(false);
            }
        } else {
            newRotation = mesh.current.rotation.y - .01;
            if (newRotation < -0.5) {
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
            rotation={[0, 1, 0]}
            scale={[yScale + (yScale / 9) * 7, yScale, 4]}
        >
            <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshBasicMaterial attach="material">
                <videoTexture args={[props.vidEl]} attach="map" />
            </meshBasicMaterial>
        </mesh>
    );
}
