import React from "react";
import { useGLTF } from "@react-three/drei";

const CastleWall = ({ position }) => {
    const {nodes} = useGLTF("wall.glb");
    return (
        <group position={position} scale={[15, 15, 15]}>
            {nodes.wall.children.map(m => {
                return (
                    <mesh key={m.uuid} geometry={m.geometry} material={m.material} />
                );
            })}
        </group>
    );
};

export default CastleWall;