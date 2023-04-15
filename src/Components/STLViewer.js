import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import Controls from "./Controls";
import * as THREE from "three";
import "./styles.css";

function STLViewer() {
    const [geometry, setGeometry] = useState(null);
    const [translation, setTranslation] = useState({ x: 0, y: 0, z: 0 });
    const meshRef = useRef();
    const fileRef = useRef();
    const xRef = useRef();
    const yRef = useRef();
    const zRef = useRef();

    const handleLoad = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target.result;
            const loader = new STLLoader();
            const geometry = loader.parse(result);
            setGeometry(geometry);
        };
        reader.readAsBinaryString(file);
    };

    const handleUnload = () => {
        setGeometry(null);
        setTranslation({ x: 0, y: 0, z: 0 });
        fileRef.current.value = null;
    };

    const handleTranslate = () => {
        const x = parseFloat(xRef.current.value) || 0;
        const y = parseFloat(yRef.current.value) || 0;
        const z = parseFloat(zRef.current.value) || 0;
        setTranslation({ x, y, z });
    };

    const material = new THREE.MeshPhongMaterial({
        color: 0xff5533,
        specular: 0x111111,
        shininess: 200,
    });

    return (
        <>
            <div className="screen">
                <div className="input-wrapper">
                    <div className="input-label input-group mb-3">
                        <input
                            ref={fileRef}
                            type="file"
                            onChange={handleLoad}
                            className="form-control"
                            placeholder="Load"
                            id="inputGroupFile02"
                        />
                        <button className="button" onClick={handleUnload}>
                            Unload
                        </button>
                    </div>
                    <div className="input-label input-group mb-3">
                        <input
                            ref={xRef}
                            type="number"
                            step="0.1"
                            className="form-control"
                            placeholder="X"
                        />
                        <input
                            ref={yRef}
                            type="number"
                            step="0.1"
                            className="form-control"
                            placeholder="Y"
                        />
                        <input
                            ref={zRef}
                            type="number"
                            step="0.1"
                            className="form-control"
                            placeholder="Z"
                        />
                        <button className="button" onClick={handleTranslate}>
                            Translate
                        </button>
                    </div>
                </div>

                <div className="container">
                    <Canvas className="canvas" camera={{ position: [10, 0, 20] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={0.5} />
                        {geometry && (
                            <mesh
                                ref={meshRef}
                                geometry={geometry}
                                material={material}
                                position={[
                                    translation.x,
                                    translation.y,
                                    translation.z,
                                ]}
                            />
                        )}
                        <Controls />
                    </Canvas>
                </div>
            </div>
        </>
    );
}

export default STLViewer;
