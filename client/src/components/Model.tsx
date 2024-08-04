import { Canvas } from "@react-three/fiber";
import { Robot } from "./Scene";
import { Environment, OrbitControls } from "@react-three/drei";

const Model = () => {
  return (
    <Canvas className="rounded-tr-3xl rounded-br-3xl">
      <Robot
        position={[0, -2.5, 0]}
        scale={[3, 3, 3]}
        rotation={[0, -0.5, 0]}
      />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Model;
