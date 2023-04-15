import React, { useMemo } from "react";
import * as THREE from "three";
import { extend } from '@react-three/fiber';
import { useFrame } from "@react-three/fiber";

const Button = ({ position, rotation, onClick }) => {
  const mesh = useMemo(() => {
    const geometry = new THREE.PlaneBufferGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      opacity: 0.5,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.onClick = onClick;
    return mesh;
  }, []);

  useFrame(() => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  });

  return <primitive object={mesh} />;
};

export default Button;
