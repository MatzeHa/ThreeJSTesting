
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Init Scene, Camera and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x550000);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Global Variables

let clockModel;

/* 
// Cube
const cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cube_geometry, cube_material );
//scene.add( cube );


// Cube animation

function rotate_cube() { 
    requestAnimationFrame( rotate_cube );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
} 
rotate_cube();
 */
// Line
const line_material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 1, 0, 0 ) );
points.push( new THREE.Vector3( 1, 1, 0 ) );

const line_geometry = new THREE.BufferGeometry().setFromPoints( points );


const line = new THREE.Line( line_geometry, line_material );
scene.add(line);


// Font Loader

const fontLoader = new FontLoader();

fontLoader.load('public/fonts/helvetiker_bold.typeface.json', 
function(font) {
    var textMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var textGeometry = new TextGeometry("Pimmel", {
        font: font,
        size: 1,
        height: 0.1
    });
    var textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.x = 1;
    textMesh.position.y = 1;
    textMesh.position.z = 0;
    scene.add(textMesh);
});




// Load 3D-Model

const modelLoader = new GLTFLoader();

modelLoader.load( 'public/models/clock.gltf', function ( gltf ) {
    clockModel = gltf.scene;
	scene.add( clockModel );
}, undefined, function ( error ) {
	console.error( error );
} );


// animation
function animate() {
    if (clockModel) {
        //clockModel.rotation.x += 0.01;
        clockModel.rotation.y += 0.01;
    }
    requestAnimationFrame( animate );
    renderer.render( scene, camera );    

}


animate();

// Light
var light = new THREE.PointLight(0xffffff, 1);
        light.position.set(1, 1, 1); // Position des Lichts
        scene.add(light);

