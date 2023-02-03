import {extend, useFrame, useThree} from '@react-three/fiber'
import {useRef} from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject.jsx'

extend({OrbitControls: OrbitControls}) // creates the html tag for orbitcontrols

export default function Experience()
{
    const {camera, gl} = useThree() // retrieve all threejs components like the scene, the camera, ...

    const groupRef = useRef()
    const cubeRef = useRef()
    const sphereRef = useRef()

    // this hook is called every frame
    useFrame(
        (state, delta) =>
        {
            groupRef.current.rotation.y += delta
            cubeRef.current.rotation.y += delta * 2.0
            sphereRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 2))

            /*
            // Moves the camera around a circle, uncomment orbitcontrols before this code
            const angle = state.clock.elapsedTime
            state.camera.position.x = Math.sin(angle) * 8.0
            state.camera.position.z = Math.cos(angle) * 8.0
            state.camera.lookAt(0, 0, 0)
            */
        }
    )

    /* args = constructor arguments */
    return <>
        <orbitControls args={[camera, gl.domElement]}/>

        <directionalLight position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.2}/>

        <group ref={groupRef}>
            <mesh ref={sphereRef} position={[-2, 0, 0]}>
                <sphereGeometry args={[1, 32, 32]}/>
                <meshStandardMaterial color="orange" wireframe/>
            </mesh>

            <mesh ref={cubeRef} position={[2.8, 0, 0]} scale={1.8} rotation-y={Math.PI * 0.25}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple"/>
            </mesh>
        </group>

        <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.50}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow"/>
        </mesh>

        <CustomObject numberOfTriangles={5}/>
    </>
}