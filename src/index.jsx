import ReactDOM from 'react-dom/client'
import {Canvas} from '@react-three/fiber'
import './index.css'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const cameraSettings =
{
    fov: 45, // used for perspective camera
    // zoom: 100, // used for orthographic camera
    near: 0.1,
    far: 200,
    position: [4, 5, 6]
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <Canvas
            dpr={[1, 2]} /* pixel ratio between 1 and 2 */
            /*flat*/
            /*gl={
                {
                    antialias: false,
                    toneMapping: THREE.CineonToneMapping,
                    outputEncoding: THREE.LinearEncoding
                }
            }*/
            /*orthographic*/
            camera={cameraSettings}
        >
            <Experience></Experience>
        </Canvas>
    )
