import * as THREE from "../node_modules/three/build/three.module.js";
import { Squirrel } from "./squirrel.js";


const scene = new THREE.Scene();
const game = document.getElementById("game-scene");
var width = 1920, height = 1080;


const squirrel = new Squirrel();


scene.background = new THREE.Color( 0x484e5c);

const size = 30;
const near = -100;
const far = 100;
const camera = new THREE.OrthographicCamera(-size, size, size, -size, near, far);
camera.zoom = 2;
camera.position.set(0, 0, 0);
camera.rotation.x = THREE.MathUtils.degToRad(120);	//120 
camera.rotation.y = THREE.MathUtils.degToRad(20);	//30	//20
camera.rotation.z = THREE.MathUtils.degToRad(35);	//45	//35


window.addEventListener('resize', function(){
	width = game.clientWidth;
	height = game.clientHeight;
	renderer.setPixelRatio(width / length);
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

export const keys = {};
var wheelY = 0;
var clock;
clock = new THREE.Clock();
var deltaTime;	
var changeCam = false;

const renderer = new THREE.WebGLRenderer({precision: "mediump" });
renderer.setClearColor(new THREE.Color(0, 0, 0));
renderer.setSize( game.clientWidth, game.clientHeight);

console.log("Esto es el renderer");
console.log(renderer);
game.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { 
	color: new THREE.Color(0.7, 0.5, 0.5),
	specular: new THREE.Color(1, 1, 1),
	shininess: 500	
});
//color: 0x873e23 
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

cube.add(camera);
//camera.position.z = 5;

var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 0.91, 0.43), 1.0);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);

// Grid guia
var grid = new THREE.GridHelper(50, 20, 0x000000, 0xffffff);
grid.position.y = 1;
scene.add(grid);

//console.log(game);
console.log(scene);
console.log(camera);

// Teclas
function onKeyDown(event) {
	keys[String.fromCharCode(event.keyCode)] = true;
	//changeCam = true;
}
function onKeyUp(event) {
	delete keys[String.fromCharCode(event.keyCode)];
	squirrel.moving = false;
	//changeCam = true;
}

onwheel = (event) =>{
	wheelY = event.deltaY;
	console.log(camera.zoom);
};


document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);		

function animate() {
	requestAnimationFrame( animate );

	deltaTime = clock.getDelta();

	var yaw = 0;
	var sides = 0;
	var updown = 0
	var pitch = 0;
	var chpitch = 0;

	if (keys["W"]) {
		if(!squirrel.moving){
		updown = 1;
		squirrel.moving = true;
		}
	} else if (keys["S"]) {
		if(!squirrel.moving){
		updown = -1;
		squirrel.moving = true;
		}
	}
	if (keys["A"] ) {
		if (!squirrel.moving){
			sides = -1;
			squirrel.moving = true;
		}
	} else if (keys["D"]) {
		if(!squirrel.moving){
			sides = 1;
			squirrel.moving = true;
		}
	}
	
	if (keys["Z"]){
		camera.zoom = 2;
	}

	if (keys[" "]) {
		if (!changeCam) {
			camera.rotation.x = THREE.MathUtils.degToRad(90);
			camera.rotation.y = THREE.MathUtils.degToRad(0);
			camera.rotation.z = THREE.MathUtils.degToRad(0);
			changeCam = true;
		} else {
			camera.rotation.x = THREE.MathUtils.degToRad(120);
			camera.rotation.y = THREE.MathUtils.degToRad(20);
			camera.rotation.z = THREE.MathUtils.degToRad(35);
			changeCam = false;
		}
		
	}

	console.log(keys);

	if (pitch != chpitch)
		console.log(camera);
	
	cube.position.x += sides;
	cube.position.z += updown;
	camera.rotation.y -= (THREE.MathUtils.degToRad(yaw)) * deltaTime;
	camera.rotation.x -= (THREE.MathUtils.degToRad(pitch)) * deltaTime;
	camera.zoom -=  (wheelY*0.05) * deltaTime;

	if (camera.zoom >= 0.8 && camera.zoom <= 4.5){
		camera.updateProjectionMatrix();
		//camera.zoom = 0.1;
	}else if(camera.zoom <= 0.8){
		camera.zoom = 0.8;
	}else{
		camera.zoom = 4.5;
	}
	
	
	wheelY = 0;
	chpitch = pitch;
	
	//camera.setRotationFromEuler(new THREE.Vector3(45,0,0));
	//camera.translateZ(forward * deltaTime);
	
	renderer.render( scene, camera );
}
animate();