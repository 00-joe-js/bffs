import ReactDOM from 'react-dom';
import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import './styles.css';
import { Stats } from '@react-three/drei';
import Peer from "peerjs";

import Box from './components/Box';
import Model from "./components/utils/GLTFModel";
import CastleWall from "./components/environment/CastleWall";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const myEl = document.querySelector("#myvid");
const vidEl = document.querySelector("#theirvid");

const renderVid = (stream) => {
    vidEl.srcObject = stream;
};


const Scene = () => {

    useEffect(async () => {
        const possibleURLId = window.location.search.split("=")[1];
        const peer = new Peer(possibleURLId || null);

        const myStream = await navigator.mediaDevices.getUserMedia({ video: true });
        myEl.srcObject = myStream;

        peer.on("error", console.error);
        peer.on("open", () => {
            if (!possibleURLId) {
                const conn = peer.connect('BFFS123');
                conn.on('open', () => {
                    peer.on("call", async call => {
                        myEl.srcObject = stream;
                        call.answer(myStream);
                        call.on("stream", renderVid);
                    });
                });
                conn.on("data", console.log);
            } else {
                peer.on('connection', (conn) => {
                    conn.on('data', console.log);
                    conn.on('open', async () => {
                        const call = peer.call(conn.peer, myStream);
                        call.on("stream", renderVid);
                    });
                });
            }
        });
    }, []);

    return (
        <>
            <Environment preset="forest" />
            <Stats />
            <color attach="background" args={['#e0b7ff']} />
            <pointLight color="orange" intensity={0.4} position={[-20, 5, 0]} />
            <Model url={"bookcase.glb"} modelKey={"bookcaseFilled"} position={[-25, -18, -20]} scale={[10, 10, 10]} />
            <Box position={[-25, 5, -20]} vidEl={myEl} />
            {/* <Box position={[2, 0, 0]} vidEl={vidEl} /> */}
            <CastleWall position={[-30, -30, -40]} />
            <CastleWall position={[30, -30, -40]} />
        </>
    );
};

ReactDOM.render(
    <Canvas colorManagement>
        <Suspense fallback={null}>
            <Scene />
        </Suspense>
    </Canvas>
    ,
    document.getElementById('root')
);
