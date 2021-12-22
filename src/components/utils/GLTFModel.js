import React from "react";
import { useGLTF } from "@react-three/drei";

const Generic = ({ url, modelKey, position, scale }) => {
    const { nodes } = useGLTF(url);
    return (
        <group position={position || [0, 0, 0]} scale={scale || [1, 1, 1]}>
            {nodes[modelKey].children.map(m => {
                return (
                    <mesh key={m.uuid} geometry={m.geometry} material={m.material} />
                );
            })}
        </group>
    );
};

export default Generic;