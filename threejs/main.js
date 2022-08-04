
import * as THREE from 'three'

import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { mapLinear } from 'three/src/math/MathUtils'
import { arraySlice } from 'three/src/animation/AnimationUtils'
import { BoxGeometry } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'

const scene = new THREE.Scene()

// Camera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Renderer

let renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
	antialias: true,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

// Torus Knot

const geometry = new THREE.TorusKnotGeometry(10, 3, 300, 20, 2, 5)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 })
const torusKnot = new THREE.Mesh(geometry, material)
scene.add(torusKnot)

// Light

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Light Helper

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)

// scene.add(lightHelper, gridHelper)

// Orbit Controls ( using scene.add() caused problem- exchange it for controls.update() )

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(0, 10, 50)
controls.update()

// Stars

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24)
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
	const star = new THREE.Mesh(geometry, material)

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100))

	star.position.set(x, y, z)
	scene.add(star)
}

Array(200).fill().forEach(addStar)

// Background textures

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Avatar

const miloszTexture = new THREE.TextureLoader().load('milosz.jpg')

const milosz = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: miloszTexture }))
scene.add(milosz)

milosz.position.set(0, 25, 0)

// Mars

const marsTexture = new THREE.TextureLoader().load('mars.jpg')
const mars = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: marsTexture,
		// normalMap: normalTexture,
	})
)
mars.position.z = 30
mars.position.setX(-10)
scene.add(mars)
// Mirror effect

const geometryMirror = new THREE.PlaneBufferGeometry(230, 230)
const verticalMirror = new Reflector(geometryMirror, {
	textureWidth: 1024,
	textureHeight: 1024,
	color: 0x889999,
})

verticalMirror.position.z = -20
verticalMirror.rotation.x = Math.PI * -0.5
verticalMirror.position.y = -130
verticalMirror.renderOrder = Infinity // FIX
scene.add(verticalMirror)

// Camera move on scrolling

function moveCamera() {

   const t = document.body.getBoundingClientRect().top
   mars.rotation.x += 0.05
   mars.rotation.y += 0.075
   mars.rotation.z += 0.05

   milosz.rotation.y += 0.01
   milosz.rotation.z += 0.01

   camera.rotation.x += -0.01
   camera.rotation.y += -0.0002
   camera.rotation.z += -0.0002
}
document.body.onscroll = moveCamera

// Torus Knot aMesh(animation
function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	torusKnot.rotation.x += 0.01
	torusKnot.rotation.y += 0.005
	torusKnot.rotation.z += 0.01
	spaceTexture.rotation.x += 10000000
}
animate()
