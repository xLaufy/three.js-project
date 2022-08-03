import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

let renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

let Geometry = new THREE.BoxBufferGeometry()
 
// renderer
const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
}
// let renderer = new THREE.WebGLRenderer();
// renderer.setSize(sizes.width, sizes.height);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);
// document.body.appendChild(renderer.domElement);