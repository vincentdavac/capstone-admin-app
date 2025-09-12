import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GLTFResult = {
  scene: THREE.Group;
};

function Model() {
  const { scene } = useGLTF("/no_weights.glb") as GLTFResult;
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

useEffect(() => {
  if (ref.current) {
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    ref.current.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);

    if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      const perspectiveCamera = camera as THREE.PerspectiveCamera;
      const fov = perspectiveCamera.fov * (Math.PI / 180);

      const cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
      perspectiveCamera.position.set(0, 0, cameraZ * 0.55); 
      perspectiveCamera.lookAt(0, 0, 0);
    }

    if (maxDim < 1) {
      const scaleFactor = 5 / maxDim;
      ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }
}, [camera]);


  return <primitive ref={ref} object={scene} />;
}

export default function ModelViewer() {
  return (
    <Canvas
      camera={{ fov: 45, near: 0.1, far: 1000 }}
      style={{
        background: "transparent",
        width: "110%",
        height: "107%",
        borderRadius: "8px",
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[0, -5, -5]} intensity={0.6} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={2}
        maxDistance={50}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </Canvas>
  );
}
