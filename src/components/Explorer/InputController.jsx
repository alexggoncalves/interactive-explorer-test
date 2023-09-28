import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

function InputController({ children }) {
    const [isDragging, setDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [nextCameraPosition, setNextCameraPosition] = useState({
        x: 0,
        y: 0,
        z: 10,
    });

    const handleMouseDown = (e) => {
        setDragging(true);
        const { clientX, clientY } = e;
        setLastMousePos({ x: clientX, y: clientY });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleMouseDrag = (e) => {
        const { clientX, clientY } = e;
        if (isDragging) {
            const deltaX = clientX - lastMousePos.x;
            const deltaY = clientY - lastMousePos.y;

            // !! TO-DO calculate rates from aspect ratio
            const rateX = 0.8;
            const rateY = 0.5;

            setNextCameraPosition({
                x: nextCameraPosition.x - deltaX * rateX,
                y: nextCameraPosition.y + deltaY * rateY,
                z: nextCameraPosition.z,
            });
        }

        setLastMousePos({ x: clientX, y: clientY });
    };


    useFrame(({ camera }, delta) => {
        camera.position.lerp(
            new Vector3(
                nextCameraPosition.x,
                nextCameraPosition.y,
                nextCameraPosition.z
            ),
            0.06
        );
    });

    useEffect(()=>{
        document.addEventListener("mouseleave", handleMouseUp)

        // return document.removeEventListener("mouseleave", handleMouseUp)
    },[])

    return (
        <>
            {children}
            {/* Background */}
            <mesh
                onPointerDown={handleMouseDown}
                onPointerUp={handleMouseUp}
                onPointerMove={handleMouseDrag}
                scale={[10000, 10000, 1]}
            >
                <planeGeometry args={[1, 1]} position={[0, 0, -1]} />
                <meshStandardMaterial color={"floralwhite"} />
            </mesh>
        </>
    );
}

export default InputController;
