import React, { useRef } from "react";
import { useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

function Controls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={true}
      zoomSpeed={0.5}
      enablePan={false}
      enableRotate={true}
    />
  );
}

export default Controls;
