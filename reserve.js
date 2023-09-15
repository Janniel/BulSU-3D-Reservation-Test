import * as THREE from 'three'
import "./style2.css"
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

//Scene
const scene = new THREE.Scene()

// // Create a sphere
// const geometry = new THREE.SphereGeometry(3, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//   color: '#00ff83',
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

//load model
const loader = new GLTFLoader()
loader.load("models/interior.glb", function(gltf) {
  console.log(gltf)
  const root = gltf.scene
  root.scale.set(1,1,1)
  root.position.y = -0.2

  scene.add(root)

// TIMELINE
const tl = gsap.timeline({defaults: {duration: 1} })
tl.fromTo(root.scale, {z:0, x:0, y:0}, {z: 0.20, x: 0.20, y: 0.20})
tl.fromTo('nav', {y: '-100%'}, {y: '0%'})
tl.fromTo('.title', {opacity: 0}, {opacity: 1})
})


//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  
//Light
const light = new THREE.AmbientLight(0x404040, 10, 100)
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 1.5
camera.position.y = 0.2

scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl2')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(2)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false

//Resize
window.addEventListener("resize", () => {
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
  })

  // window.addEventListener('mouseup', function() {
  //   gsap.to(camera.position, {
  //     x:-3,
  //     y:0,
  //     z:0,
  //     duration: 2
  //   });
  // });
  
  const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
  }
  loop()
  