import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const vidEl = document.querySelector("#theirvid");

export default function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

    return (
        <mesh
            castShadow={true}
            receiveShadow={true}
            {...props}
            ref={mesh}
            scale={[1, 1, 1]}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshBasicMaterial>
                <videoTexture args={vidEl} attach="map" />
            </meshBasicMaterial>
        </mesh>
    );
}
