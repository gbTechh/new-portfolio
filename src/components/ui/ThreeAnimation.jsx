import React from "react"
import { Canvas } from "@react-three/fiber"
import { Logo3d } from "../../models"

const cant = [...Array(20)]
export const CanvasAnimation = () => {
  return (
    // <Canvas shadow gl={{ antialias: false }}>
    //   <color attach="background" args={["#101010"]}></color>
    //   <ambientLight intensity={0.5} />
    //   <pointLight position={[10, 10, 10]} />
    // </Canvas>
    <>
      <Logo3d />
    </>
  )
}
