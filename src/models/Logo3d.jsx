import React, { useRef, useEffect } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export const Logo3d = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current
    const { clientWidth: width, clientHeight: height } = currentRef

    //Scene, camera, renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100)
    scene.add(camera)
    camera.position.set(-20, 1, 40)
    camera.zoom = 10
    camera.lookAt(new THREE.Vector3())

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    currentRef.appendChild(renderer.domElement)

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.enableDamping = true

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight)
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", resize)

    //Animate the scene
    const animate = () => {
      orbitControls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    //light ambiental
    const ambientalLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientalLight)

    const pointLight = new THREE.PointLight(0xffffff, 1.42)
    pointLight.position.set(1, 100, 500)
    scene.add(pointLight)

    const groupLogo = new THREE.Group()
    //loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.load("/models/planemarcalogo3d8.gltf", gltf => {
      groupLogo.add(gltf.scene)
      groupLogo.position.y = -5
      scene.add(groupLogo)
    })

    return () => {
      window.removeEventListener("resize", resize)
      currentRef.removeChild(renderer.domElement)
    }
  }, [])

  // const { nodes } = useGLTF("/models/marcalogo3d2.gltf")

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  )
}
