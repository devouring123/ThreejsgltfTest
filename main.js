import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 50;

scene.background = new THREE.Color('black');
let light = new THREE.AmbientLight(0xffffff,100); //조명
scene.add(light);

loader.load( "gltf/CubeAll.glb", function ( gltf ) {
    // gltf.scene.scale
    scene.add( gltf.scene );

    function animate() {
        requestAnimationFrame( animate );

        gltf.scene.rotation.x += 0.002;
        gltf.scene.rotation.y += 0.01;

        renderer.render( scene, camera );
    }
    animate();
}, undefined, function ( error ) {

    console.error( error );

} );
