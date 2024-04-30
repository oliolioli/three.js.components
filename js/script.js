import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;


renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


camera.position.set(-10, 30, 30);
orbit.update();


const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00AAFF});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});
  
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(plane);

plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30,100);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000FF,
  wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);
sphere.position.set(-5, 5, 5);
sphere.castShadow = true;

const gui = new dat.GUI();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.left = -20;


const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);


const options = {
  sphereColor: '#ffea00',
  planeColor: '#ffffff',
  wireframe: true,
  speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e);
});

gui.addColor(options, 'planeColor').onChange(function(e){
  plane.material.color.set(e);
})

gui.add(options, 'wireframe').onChange(function(e){
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

let step = 0;



function animate() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  step += options.speed;

  sphere.position.y = 20 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
}



renderer.setAnimationLoop(animate);

