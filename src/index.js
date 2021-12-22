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

import _range from "range";
const range = _range.range;

const myEl = document.querySelector("#myvid");
const vidEl = document.querySelector("#theirvid");

const renderVid = (stream) => {
    vidEl.srcObject = stream;
};


const Scene = () => {

    const {camera, gl} = useThree();

    useEffect(() => {
        gl.physicallyCorrectLights = true;
        camera.position.z = camera.position.z + 3;
        camera.rotation.x = 0;
        camera.position.y -= 3;
    }, []);

    useEffect(async () => {
        const possibleURLId = window.location.search.split("=")[1];
        const peer = new Peer(possibleURLId || null);

        const myStream = await navigator.mediaDevices.getUserMedia({ video: true });
        myEl.srcObject = myStream;

        peer.on("error", console.error);
        peer.on("open", () => {
            if (!possibleURLId) {
                console.log("trying to connect")
                const conn = peer.connect('BFFS123');
                conn.on('open', () => {
                    peer.on("call", async call => {
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
            <Environment preset="sunset" />
            <Stats />
            <pointLight position={[10, 0, -20]} color="orange" intensity={100} />
            <Box position={[50, -5, -40]} yScale={30} vidEl={myEl} />
            <Box position={[-25 , -10, -40]} yScale={20} vidEl={vidEl} />
            <Model url={"wallSingle_door.glb"} modelKey={"wallSingle_door"} position={[-24, -35, -35]} scale={[14, 16, 2]} />
            <Model url={"door_gate.glb"} modelKey={"door_gate"} position={[-40, -17, -35]} scale={[17, 18, 2]} />
            <CastleWall position={[-80, -35, -35]} scale={[14, 16, 2]} />
            <Model url={"torchWall.glb"} modelKey={"torchWall"} position={[10, 0, -32]} scale={[7, 7, 7]} />
            <Model url={"wall_window.glb"} modelKey={"wall_window"} position={[45, -35, -35]} scale={[14, 16, 2]} />

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
