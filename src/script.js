import './style.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

import { CircleBufferGeometry } from 'three';

const textureLoader = new THREE.TextureLoader();
const gui = new GUI();

const normalTexture = textureLoader.load('/textures/NormalMap.png');

let camera;

const scene = new THREE.Scene();
let d = 60;
let aspect = window.innerWidth / window.innerHeight;

scene.background = new THREE.Color(0x000000);
camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 2000);
camera.position.x = 1;
camera.position.y = 14;
camera.position.z = 0.9;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0x0000ff, 2);

light.position.set(-1.7, 4, -4.4);
light.intensity = 1.5;
scene.add(light);
const angle = Math.PI / 4.0;

const blueLight = new THREE.PointLight(0xeec61f, 1, 25, angle);
blueLight.castShadow = true;
blueLight.position.set(-1.3, 2.2, 3.6);
blueLight.intensity = 1.5;

scene.add(blueLight);

const blueLightFolder = gui.addFolder('Yellow Light');
blueLightFolder.add(blueLight.position, 'x', -20, 20);
blueLightFolder.add(blueLight.position, 'y', -20, 20);
blueLightFolder.add(blueLight.position, 'z', -20, 20);
blueLightFolder.open();

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
var obj;
loader.load(
  '/Room.gltf',
  function (gltf) {
    obj = gltf.scene;
    scene.add(obj);
    // obj.position.x = 3;
    // obj.position.y = -1;
    //obj.position.z = 4;
    const objFolder = gui.addFolder('Object fOLDER');
    objFolder.add(obj.rotation, 'x', -20, 20);
    objFolder.add(obj.rotation, 'y', -20, 20);
    objFolder.add(obj.rotation, 'z', -20, 20);

    objFolder.open();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', -20, 20);
cameraFolder.add(camera.position, 'y', -20, 20);
cameraFolder.add(camera.position, 'z', -20, 20);

cameraFolder.open();

const LightFolder = gui.addFolder('Light');
LightFolder.add(light.position, 'z', -20, 20);
LightFolder.add(light.position, 'y', -20, 20);
LightFolder.add(light.position, 'x', -20, 20);
LightFolder.open();

let flag = false;
function animate() {
  requestAnimationFrame(animate);

  // if (!flag) {
  //   camera.position.y += 0.05;
  // } else if (flag) {
  //   camera.position.y += -0.05;
  // }
  // if (camera.position.y >= 16) {
  //   flag = true;
  // } else if (camera.position.y <= 6) {
  //   {
  //     flag = false;
  //   }
  // }

  // camera.position.x += 0.01;
  // camera.position.y += 0.01;
  // camera.position.z += 0.01;

  // if (camera.position.x >= 0) {
  //   camera.position.x += -0.02;
  // }
  // if (camera.position.y <= 5) {
  //   camera.position.y += +0.02;
  // }
  // if (camera.position.z >= 10.8) {
  //   camera.position.z += -0.02;
  // }

  // controls.update();
  renderer.render(scene, camera);
}

animate();
