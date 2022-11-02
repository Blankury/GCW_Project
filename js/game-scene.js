import { Squirrel } from "./squirrel.js";

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x484e5c);

const game = document.getElementById("game-scene");

const squirrel = new Squirrel();
const squirrelP2 = new Squirrel();

// Variables
var width = 1920, height = 1080;
const keys = {};
var wheelY = 0;
var deltaTime;	
var changeCam = false;
var isWorldReady = []


// Reloj
var clock = new THREE.Clock();


// Camara
const size = 30;
const near = -100;
const far = 100;
const camera = new THREE.OrthographicCamera(-size, size, size, -size, near, far);
camera.zoom = 2;
camera.position.set(0, 0, 0);
camera.rotation.x = THREE.MathUtils.degToRad(-45);	//-45
camera.rotation.y = THREE.MathUtils.degToRad(10);	//20
camera.rotation.z = THREE.MathUtils.degToRad(10);	//25
//

// Renderer
const renderer = new THREE.WebGLRenderer({precision: "mediump" });
renderer.setClearColor(new THREE.Color(0, 0, 0));
renderer.setSize( game.clientWidth, game.clientHeight);

const canvas = renderer.domElement;

window.addEventListener('resize', function(){
	width = game.clientWidth;
	height = game.clientHeight;
	//renderer.setPixelRatio(width / length);
	renderer.setSize(width, height);
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
});

console.log("Esto es el renderer");
console.log(renderer);
game.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { 
	color: new THREE.Color(0xFF8787),
	specular: new THREE.Color(1, 1, 1),
	shininess: 500	
});

const material2 = new THREE.MeshPhongMaterial( { 
	color: new THREE.Color(0xBCE29E),
	specular: new THREE.Color(1, 1, 1),
	shininess: 500	
});


const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material2);

cube.position.x = -2; cube.position.y = 0.5;
cube2.position.x = 2; cube2.position.y = 0.5;

scene.add(cube);
scene.add(cube2);

// loadOBJWithMTL("obj/Player2/", "ardilla_2.obj", "ardilla_2.mtl", (object) => {
//      scene.add(object);
// 	 isWorldReady[0] = true;
// });

//cube.add(camera);


var ambientLight = new THREE.AmbientLight(new THREE.Color(0xE5EBB2), 0.8);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

// Grid guia
var grid = new THREE.GridHelper(50, 25, 0x000000, 0xffffff);
//grid.position.x = 0.5;
//grid.position.z = 0.5;

scene.add(grid);

//console.log(game);
console.log(scene);
console.log(camera);



// Eventos de teclas
function onKeyDown(event) {
	keys[String.fromCharCode(event.keyCode)] = true;

}

function onKeyUp(event) {
	delete keys[String.fromCharCode(event.keyCode)];
	//console.log(event);
	if (event.key === "ArrowUp" || event.key === "ArrowDown"
		|| event.key === "ArrowLeft" || event.key === "ArrowRight")
		squirrelP2.moving = true;
	if (event.key === "w" || event.key === "s"
		|| event.key === "a" || event.key === "d")
		squirrel.moving = true;
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
	var sides_p2 = 0;
	var updown = 0
	var updown_p2 = 0
	var pitch = 0;
	var chpitch = 0;

	if (keys["W"]) {
		if (squirrel.moving) {
			updown = -1;
			squirrel.update();
		}
	} else if (keys["S"]) {
		if (squirrel.moving) {
			updown = 1;
			squirrel.update();
		}
	}
	if (keys["A"]) {
		if (squirrel.moving) {
			sides = -1;
			squirrel.update();
		}
	} else if (keys["D"]) {
		if (squirrel.moving) {
			sides = 1;
			squirrel.update();
		}
	}

	if (keys['&']) {
		if (squirrelP2.moving) {
			updown_p2 = -1;
			squirrelP2.update()
		}
	} else if (keys['(']) {
		if (squirrelP2.moving) {
			updown_p2 = 1;
			squirrelP2.update();
		}
	}
	if (keys["%"]) {
		if (squirrelP2.moving) {
			sides_p2 = -1;
			squirrelP2.update();
		}
	} else if (keys["'"]) {
		if (squirrelP2.moving) {
			sides_p2 = 1;
			squirrelP2.update();
		}
	}

	if (keys["Z"]){
		camera.zoom = 2;
	}

	if (keys[" "]) {
		if (!changeCam) {
			camera.rotation.x = THREE.MathUtils.degToRad(-90);
			camera.rotation.y = THREE.MathUtils.degToRad(0);
			camera.rotation.z = THREE.MathUtils.degToRad(0);
			changeCam = true;
		}else {
			camera.rotation.x = THREE.MathUtils.degToRad(-45);
			camera.rotation.y = THREE.MathUtils.degToRad(10);
			camera.rotation.z = THREE.MathUtils.degToRad(10);
			changeCam = false;
		}
		
	}

	if (pitch != chpitch)
		console.log(camera);
	
	cube.position.x += sides;
	cube.position.z += updown;
	cube2.position.x += sides_p2;
	cube2.position.z += updown_p2;

	//camera.position.x += 0.01;
	camera.rotation.y -= (THREE.MathUtils.degToRad(yaw)) * deltaTime;
	camera.rotation.x -= (THREE.MathUtils.degToRad(pitch)) * deltaTime;
	camera.zoom -=  (wheelY*0.05) * deltaTime;

	if (camera.zoom >= 0.8 && camera.zoom <= 4.5){
		camera.updateProjectionMatrix();
	}else if(camera.zoom <= 0.8){
		camera.zoom = 0.8;
	}else{
		camera.zoom = 4.5;
	}
	
	wheelY = 0;
	chpitch = pitch;
	
	//camera.setRotationFromEuler(new THREE.Vector3(45,0,0));
	//camera.translateZ(forward * deltaTime);
	
	let puntoM = puntoMedio(cube.position, cube2.position)
	//console.log(puntoM);
	camera.position.x = puntoM.x;
	camera.position.z = puntoM.y;
	
	//if (isWorldReady[0])
	renderer.render( scene, camera );

}
animate();



function puntoMedio(pos1, pos2){
	let newX, newZ;
	newX = (pos1.x + pos2.x) / 2;
	newZ = (pos1.z + pos2.z) / 2;
	return new THREE.Vector2(newX, newZ);
}

// function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
//     var mtlLoader = new MTLLoader();
//     mtlLoader.setPath(path);
//     mtlLoader.load(mtlFile, (materials) => {
        
//         var objLoader = new OBJLoader();
//         objLoader.setMaterials(materials);
//         objLoader.setPath(path);
//         objLoader.load(objFile, (object) => {
//             onLoadCallback(object);
//         });

//     });
// }