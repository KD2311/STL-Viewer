import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import Controls from "./Controls";
import './styles.css'


function STLViewer() {
    const [geometry, setGeometry] = useState(null);
    const meshRef = useRef();
    const FileRef = useRef()

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
        FileRef.current.value = null
    };

    return (
        <>


            <div className="screen">
                <div className="input-wrapper">
                    <div class="input-label input-group mb-3">
                        <input ref={FileRef} type="file" onChange={handleLoad} class="form-control" placeholder="Load" id="inputGroupFile02" />
                        <button className="button" onClick={handleUnload}>Unload</button>
                    </div>
                </div>

                <div className="container">
                    <Canvas className="canvas" camera={{ position: [10, 0, 20] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={0.5} />
                        {geometry && (
                            <mesh ref={meshRef} geometry={geometry}>
                                <meshStandardMaterial />
                            </mesh>
                        )}
                        <Controls />
                    </Canvas>
                </div>
            </div>
        </>
    );
}

export default STLViewer;
