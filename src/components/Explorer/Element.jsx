import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useState } from "react";

import Content from "./Content";
import InputController from "./InputController";

function Element({ position, image, details }) {
    console.log(position)
    return (
        <>
            <mesh scale={[200, 200, 0]} position={[position.x, position.y, 1]}>
                <meshStandardMaterial color={"black"} />
                <planeGeometry args={[1, 1]} />
            </mesh>
        </>
    );
}

export default Element;