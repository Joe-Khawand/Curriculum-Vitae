//! CSS Style file
import './styles/main.css';

//! --------------------------------- 3D script for main page ---------------------------------

import * as THREE from 'three';
import * as BOIDS from "./js/boids";

//Create the 3D scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0,0,200)");

//Create the camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(30,30,30)//Position the camera
const center = new THREE.Vector3(0,0,0);
camera.lookAt(center);

//Choose the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Axes
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

//Adding horizontal scene
const plane = new THREE.PlaneGeometry( 60, 60 );
const plane_material = new THREE.MeshBasicMaterial();
plane_material.wireframe = true;
const plane_mesh = new THREE.Mesh(plane,plane_material);
plane_mesh.rotation.x= Math.PI/2.0;
scene.add( plane_mesh );

//Adding a box
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//A mesh takes a geometry and a meterial
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); //Add the mesh to the scene


//Create Clock
var clock = new THREE.Clock();
var speed = 1; //units a second
var delta = 0;


//!Boids
const cone_geometry = new THREE.ConeGeometry( 1, 2, 8 );
const cone_material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var cone = new THREE.Mesh( cone_geometry, cone_material );
var b = new BOIDS.Boid();
cone.position.copy(b.pos);
scene.add( cone );

var axis = new THREE.Vector3(0, 1, 0);//Up for the boids

window.addEventListener( 'resize', onWindowResize );//resize screen

//*Animation function
function animate() {
	requestAnimationFrame( animate );
    //add animation in this block
    
    //update clock
    delta = clock.getDelta();
    
    //update boid pos
    b.update_pos(delta);
    cone.position.copy(b.pos);
    cone.quaternion.setFromUnitVectors(axis, b.vit.clone().normalize());
    
    //rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    
    //render
	renderer.render( scene, camera );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


animate();

//! --------------------------------- End of 3D script  ---------------------------------