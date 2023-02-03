import * as THREE from 'three' // or import {DoubleSide} from 'three'
import {useRef, useMemo, useEffect} from 'react'

export default function CustomObject({numberOfTriangles = 10})
{
    const geometryRef = useRef() // [BEWARE] if reload triggers the ref is undefined, you must use useEffect hook to be sure it is defined.

    const verticesCount = numberOfTriangles * 3 // 10 triangles has 3 vertices

    // Acts like a cache
    const positions = useMemo(
        () =>
        {
            const positions = new Float32Array(verticesCount * 3) // Each vertices has 3 coord x, y, z
        
            for(let i = 0; i < verticesCount * 3; i++)
            {
                positions[i] = (Math.random() - 0.5) * 3 // [-1.5..1.5]
            }

            return positions
        },
        []
    )

    // Called only once after the first render
    useEffect(
        () =>
        {
            geometryRef.current.computeVertexNormals()
        },
        []
    )

    /*
        DoubleSide = allow to see the doubles faces of the triangles
    */

    return <mesh>
        <bufferGeometry ref={geometryRef}>
            <bufferAttribute
                attach="attributes-position"
                count={verticesCount}
                itemSize={3}
                array={positions}/>
        </bufferGeometry>
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
}