import React, { useRef } from "react";
import { useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Html } from "@react-three/drei";

extend({ OrbitControls });

function Controls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const xInputRef = useRef();
  const yInputRef = useRef();

  const handleTranslate = () => {
    const x = parseFloat(xInputRef.current.value);
    const y = parseFloat(yInputRef.current.value);

    if (!isNaN(x) && !isNaN(y)) {
      controlsRef.current.target.x += x;
      controlsRef.current.target.y += y;
    }
  };

  return (
    <>
      <orbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enableZoom={true}
        zoomSpeed={0.5}
        enablePan={false}
        enableRotate={true}
      />
      <Html>
        <div className="controls">
          {/* <div>
            <label htmlFor="translateX">Translate X:</label>
            <input ref={xInputRef} id="translateX" type="number" step={1} defaultValue={0} />
          </div>
          <div>
            <label htmlFor="translateY">Translate Y:</label>
            <input ref={yInputRef} id="translateY" type="number" step={1} defaultValue={0} />
          </div>
          <button onClick={handleTranslate}>Translate</button> */}
        </div>
      </Html>
    </>
  );
}

export default Controls;
