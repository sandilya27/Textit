import { useRef } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {Group,Mesh} from "three";

interface RobotProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}


export function Robot(props: RobotProps) {
  const { nodes, materials } = useGLTF("/mini-robot.glb");

  const robotRef = useRef<Group>(null);

  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.position.y =
        -2.5 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const defaultMaterialMesh = nodes.defaultMaterial as Mesh;
  const defaultMaterial1Mesh = nodes.defaultMaterial_1 as Mesh;

  return (
    <group {...props} dispose={null} ref={robotRef}>
      <mesh
        geometry={defaultMaterialMesh.geometry}
        material={materials.material}
        position={[0, 0.925, -0.222]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.23}
      />
      <mesh
        geometry={defaultMaterial1Mesh.geometry}
        material={materials.Robot_Mat}
        position={[0.318, 0.637, 0]}
        rotation={[-Math.PI / 2, -0.093, 0]}
        scale={0.23}
      />
    </group>
  );
}

useGLTF.preload("/mini-robot.glb");
