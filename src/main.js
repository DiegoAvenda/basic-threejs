import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

const threejs = new THREE.WebGLRenderer()
threejs.setSize(400, 400)
document.body.appendChild(threejs.domElement)

const camera = new THREE.PerspectiveCamera()
camera.position.z = 5

const controls = new OrbitControls(camera, threejs.domElement)
controls.enableDamping = true
controls.target.set(0, 0, 0)
controls.update()

const scene = new THREE.Scene()

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  })
)
scene.add(mesh)

function run() {
  threejs.render(scene, camera)

  requestAnimationFrame(run)
}
run()
