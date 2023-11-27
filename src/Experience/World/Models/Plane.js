import * as THREE from "three"

import Experience from "../../Experience"



export default class Plane
{
    constructor()
    {

        this.experience = new Experience()

        // Parameters
        this.side = 5
        this.geometry = new THREE.PlaneGeometry(this.side, this.side, 16, 16)

        // Set cube
        this.instance = new THREE.Mesh(
            this.geometry,
            this.experience.materials.custom
        )
        this.instance.receiveShadow = true
        this.instance.castShadow = true

        // Coordinates
        // this.instance.position.y += this.side / 2
        this.instance.position.z = -4

        // this.debug()

    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.instance.position, 'x', -10, 10, 0.01).name('position.x')
        }
    }
}
