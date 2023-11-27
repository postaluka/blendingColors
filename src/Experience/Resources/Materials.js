import * as THREE from 'three'

import Experience from '../Experience.js'
import Time from '../Utils/Time.js'

import Textures from './Texture'
import vertexShader from './Shaders/vertex.glsl'
import fragmetShader from './Shaders/fragment.glsl'

export default class Materials
{
    constructor()
    {
        this.experience = new Experience()
        this.time = new Time()
        this.textures = new Textures()

        this.basic = new THREE.MeshStandardMaterial({
            metalness: 0.45,
            roughness: 0.65,
            side: THREE.DoubleSide,
        })

        this.bricks = new THREE.MeshStandardMaterial({
            map: this.textures.bricksColor,
            metalness: 0.6,
            roughnessMap: this.textures.bricksRoughness,
            displacementMap: this.textures.bricksDisplacement,
            displacementScale: 0,
            side: THREE.DoubleSide,
            // aoMap: this.textures.bricksAmbientOcclusion,
            // aoMapIntensity: 1
        })
        this.bricks.normalMap = this.textures.bricksNormalGL
        this.bricks.normalScale.set(0.7, 0.7)

        this.setCustomMaterial()

    }

    setCustomMaterial()
    {
        this.custom = new THREE.RawShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmetShader,
            uniforms: {
                uTime: { value: 0 },
            },
        })
    }

    updateCustomMaterial()
    {
        this.custom.uniforms.uTime.value = this.time.elapsed * 0.0025;
    }
}