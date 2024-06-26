import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

import stars from '../src/space.jpg';

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
  wireframe: false 
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
directionalLight.shadow.camera.bottom = -12;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.left = -20;


const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);


/*
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);

spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2; 
*/
/*
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);
*/

scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars);

const options = {
  sphereColor: '#ffea00',
  planeColor: '#ffffff',
  wireframe: false,
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

const mousePosition = new THREE.Vector2();

window.addEventListener('mouvemove', function(e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 -1;
  mousePosition.y = (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  step += options.speed;

  sphere.position.y = 20 * Math.abs(Math.sin(step));

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  console.log(intersects);

  for(let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === sphereId)
      intersects[i].object.material.color.set(0xFF0000);
  }


  renderer.render(scene, camera);
}



renderer.setAnimationLoop(animate);

