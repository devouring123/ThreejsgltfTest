import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;

scene.background = new THREE.Color('black');
let light = new THREE.AmbientLight(0xffffff, 100); //조명
scene.add(light);

let mesh;
let ms = 2;

function loadGLTF() {
    return new Promise(function (resolve) {
        loader.load("gltf/CubeAll.glb", function (gltf) {
            gltf.scene.scale.set(ms, ms, ms);

            mesh = gltf.scene.children[0].clone();
            resolve();
            console.log("in Loader", mesh);
            scene.add(gltf.scene);

            // scene.add(model);

            function animate() {
                requestAnimationFrame(animate);
                ms -= 0.001;
                gltf.scene.rotation.x += 0.002;
                gltf.scene.rotation.y += 0.01;
                scene.rotation.x += 0.002;
                scene.rotation.y += 0.01;
                renderer.render(scene, camera);
            }

            animate();

        }, undefined, function (error) {
            console.error(error);
        });
    });
}

loadGLTF().then(function () {
    console.log("out Loader", mesh);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    scene.add(mesh);
});

