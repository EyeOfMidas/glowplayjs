import * as THREE from 'three'

const scene = new THREE.Scene()

const fieldOfView = 78

const canvas = document.querySelector('canvas.webgl')
const aspectRatio = canvas.offsetWidth / canvas.offsetHeight
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio)
camera.position.set(0, 0, 3)
scene.add(camera)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF0000,
    // wireframe: true,
})

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

window.addEventListener('resize', event => {
    const aspectRatio = window.innerWidth / window.innerHeight
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight, true)
    render()
}, false)

function render() {
    renderer.render(scene, camera)
    // window.requestAnimationFrame(render)
}

render()
