import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

class App {
  #threejs_ = null
  #camera_ = null
  #scene_ = null
  #controls_ = null
  #mesh_ = null
  #clock_ = new THREE.Clock()

  constructor() {
    window.addEventListener("resize", () => {
      this.#onWindowResize_()
    })
  }

  initiliaze() {
    this.#threejs_ = new THREE.WebGLRenderer()
    this.#threejs_.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.#threejs_.domElement)

    const aspect = window.innerWidth / window.innerHeight
    this.#camera_ = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000)
    this.#camera_.position.z = 5

    this.#controls_ = new OrbitControls(
      this.#camera_,
      this.#threejs_.domElement
    )
    this.#controls_.enableDamping = true
    this.#controls_.target.set(0, 0, 0)
    this.#controls_.update()

    this.#scene_ = new THREE.Scene()

    this.#mesh_ = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      })
    )
    this.#scene_.add(this.#mesh_)

    this.#onWindowResize_()
    this.#raf()
  }

  #onWindowResize_() {
    const canvas = this.#threejs_.domElement
    const dpr = window.devicePixelRatio
    const w = window.innerWidth
    const h = window.innerHeight
    const aspect = w / h
    console.log(`Resizing to ${w} x ${h}`)

    canvas.style.width = w + "px"
    canvas.style.height = h + "px"

    this.#threejs_.setSize(w * dpr, h * dpr, false)
    //this.#threejs_.setPixelRatio(dpr)

    this.#camera_.aspect = aspect
    this.#camera_.updateProjectionMatrix()
  }

  #raf() {
    requestAnimationFrame(() => {
      const deltaTime = this.#clock_.getDelta()
      this.#step_(deltaTime)
      this.#render_()
      this.#raf()
    })
  }

  #step_(timeElapsed) {
    //state updates
    //this.#mesh_.rotation.y += timeElapsed * 0.1
  }

  #render_() {
    this.#threejs_.render(this.#scene_, this.#camera_)
  }
}

const app = new App()
app.initiliaze()
