import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './styles.css';
import { Stats } from '@react-three/drei';
import Box from './components/Box';

import Peer from "peerjs";

const vidEl = document.querySelector("#theirvid");
const renderVid = (stream) => {
    vidEl.srcObject = stream;
};

const Scene = () => {

    const light = useRef();

    useFrame((_, dt) => {
        light.current.position.x -= 1 * dt;
    });

    useEffect(() => {
        const possibleURLId = window.location.search.split("=")[1];
        const peer = new Peer(possibleURLId || null);
        peer.on("error", console.error);
        peer.on("open", (id) => {
            console.log(id);
            if (!possibleURLId) {
                const conn = peer.connect('BFFS123');
                conn.on('open', () => {
                    peer.on("call", async call => {
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                        call.answer(stream);
                        call.on("stream", renderVid);
                    });
                });
                conn.on("data", console.log);
            } else {
                peer.on('connection', (conn) => {
                    conn.on('data', console.log);
                    conn.on('open', async () => {
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                        const call = peer.call(conn.peer, stream);
                        call.on("stream", renderVid);
                    });
                });
            }
        });
    }, []);

    return (
        <>
            <Stats />
            <pointLight ref={light} position={[5, 0, 0]} intensity={100} color={"white"} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </>
    );
};

ReactDOM.render(
    <Canvas colorManagement>
        <Scene />
    </Canvas>
    ,
    document.getElementById('root')
);
