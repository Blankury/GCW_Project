import { Squirrel } from "../js/squirrel.js";
import loadOBJWithMTL, { Objeto, collisionObjects } from "../js/objModelos.js";
import Plano from "./plano.js";

// Nivel Seleccionado
var escenario = sessionStorage.getItem('scene');
var modo = sessionStorage.getItem('mode');
var dificultad = sessionStorage.getItem('difficulty');

console.log(escenario+ '\n' + modo + '\n'+ dificultad);

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x484e5c);

const game = document.getElementById("game-scene");
const pause = document.getElementById('btnPause');
const play = document.getElementById('btnPlay');
var isPause = false;
pause.addEventListener('click', () => {
	isPause = true;
});
play.addEventListener('click', () => {
	isPause = false;
})

const squirrel = new Squirrel();
const squirrelP2 = new Squirrel();

// Variables
var width = 1920, height = 1080;
const keys = {};
var wheelY = 0;
var deltaTime;	
var changeCam = false;
var isWorldReady = [];
var worldSize = 64; 


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

//var allcollisionObjects = [];

//Movimientos animados
var jump = false, jump2 = false, yi = 0.5, vi = 4, ti, ti2;
var newmov = "";
var newmov2 = "";

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
game.appendChild( renderer.domElement );

console.log(squirrel);

loadOBJWithMTL("obj/Player_1/", "Ardilla.obj", "Ardilla.mtl", (object) => {
	object.scale.x = 0.5;
	object.scale.y = 0.5;
	object.scale.z = 0.5;

	object.position.y = 0.5;

	squirrel.mesh = object;
	scene.add(object);
	isWorldReady.push(true);

	if (modo === 'Cooperativo')
		squirrel.mesh.position.x = -2;
});

if(modo === 'Cooperativo'){
	loadOBJWithMTL("obj/Player2/", "Ardilla.obj", "Ardilla.mtl", (object) => {
		object.scale.x = 0.5;
		object.scale.y = 0.5;
		object.scale.z = 0.5;

		object.position.x = 10;
		object.position.y = 0.5;


		squirrelP2.mesh = object;
		scene.add(object);
	
		isWorldReady.push(true);
	});
}

// Nivel 1
if (escenario === 'City'){
	var ambientLight = new THREE.AmbientLight(new THREE.Color(0xE5EBB2), 0.8);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 0.6);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);

	var light = new THREE.PointLight(0xFF7C30, 0.8, 100);
	light.position.set(50, 50, 0);
	scene.add(light);

	var plano = new Plano();
	plano.loadMaterials('obj/pixelgrass.png', null);
	plano.loadTerrain(scene, isWorldReady);

	var traffic = new Plano();
	traffic.loadMaterials('obj/traffic.png', 'obj/trafficA.png');
	traffic.loadTrafficPaths(scene, 20, isWorldReady);
	var traffic2 = new Plano();
	traffic2.plane = traffic.plane.clone();
	traffic2.loadTrafficPaths(scene, 40, isWorldReady);
	var traffic3 = new Plano();
	traffic3.plane = traffic.plane.clone();
	traffic3.loadTrafficPaths(scene, 60, isWorldReady);

	//var rockFloor = new Objeto(new THREE.Vector3(0, 0, -50), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	//rockFloor.load('obj/Nivel_1/', 'Suelo_rock.obj', 'Suelo_rock.mtl', scene, isWorldReady);
	// Modelos
	var pts = new Objeto(new THREE.Vector3(10, 0, 10), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	pts.load('obj/Puntos/', 'Puntos.obj', 'Puntos.mtl', scene, isWorldReady, 3);

	var arbol = new Objeto(new THREE.Vector3(0, 0, -5), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	arbol.load('obj/Arbol/', 'arbol1-0.obj', 'arbol1-0.mtl', scene, isWorldReady, 1);
	
	var arbusto = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	arbusto.load('obj/Arbusto/', 'arbusto.obj', 'arbusto.mtl', scene, isWorldReady, 2);

	var auto = new Objeto(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0,3.1,0), new THREE.Vector3(0,0,0));
	auto.load('obj/Autos/', 'autos-4.obj', 'autos-4.mtl', scene, isWorldReady, 'path');

	var taxi = new Objeto(new THREE.Vector3(0, 0, -40), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	taxi.load('obj/Autos/', 'autos-6.obj', 'autos-6.mtl', scene, isWorldReady, 'path2');

}


// Nivel 2
if (escenario === 'Snow City'){
	var ambientLight = new THREE.AmbientLight(new THREE.Color(0x8AC0FF), 0.7);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(new THREE.Color(1,1,1), 0.3);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);

	var light = new THREE.PointLight(0xFF7C30, 0.8, 100);
	light.position.set(50, 50, 0);
	scene.add(light);

	// Terreno
	var plano = new Plano();
	plano.loadMaterials('obj/snow.jpg', null);
	plano.loadTerrain(scene, isWorldReady);

	var traffic = new Plano();
	traffic.loadMaterials('obj/traffic.png', 'obj/trafficA.png');
	traffic.loadTrafficPaths(scene, 20, isWorldReady);
	var traffic2 = new Plano();
	traffic2.plane = traffic.plane.clone();
	traffic2.loadTrafficPaths(scene, 30, isWorldReady);
	var traffic3 = new Plano();
	traffic3.plane = traffic.plane.clone();
	traffic3.loadTrafficPaths(scene, 50, isWorldReady);


	// Modelos
	var pino = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	pino.load('obj/Pino/', 'pino-1.obj', 'pino-1.mtl', scene, isWorldReady, 1);
	//pino.loadRandomO(-60, 60, 0, 60, 80, scene);
	var roca = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	roca.load('obj/Rocas/', 'rocas-1.obj', 'rocas-1.mtl', scene, isWorldReady, 2);

	var quitanieves = new Objeto(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0,0), new THREE.Vector3(0,0,0));
	quitanieves.load('obj/Quitanieves/', 'quitanieevs-0.obj', 'quitanieevs-0.mtl', scene, isWorldReady, 'path3')

	var auto = new Objeto(new THREE.Vector3(0, 0, -30), new THREE.Vector3(0,3.1,0), new THREE.Vector3(0,0,0));
	auto.load('obj/Autos/', 'autos-0.obj', 'autos-0.mtl', scene, isWorldReady, 'path');

	var quitanieves2 = new Objeto(new THREE.Vector3(0, 0, -50), new THREE.Vector3(0, 0,0), new THREE.Vector3(0,0,0));
	quitanieves2.load('obj/Quitanieves/', 'quitanieevs-1.obj', 'quitanieevs-1.mtl', scene, isWorldReady, 'path3')

}

// Nivel 3
if (escenario === 'Beach City Night'){
	var ambientLight = new THREE.AmbientLight(new THREE.Color(0xE5EBB2), 0.8);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);

	var light = new THREE.PointLight(0xFF7C30, 0.8, 100);
	light.position.set(50, 50, 0);
	scene.add(light);

	var plano = new Plano();
	plano.loadMaterials('obj/arena.png', null);
	plano.loadTerrain(scene, isWorldReady);

	var traffic = new Plano();
	traffic.loadMaterials('obj/traffic.png', 'obj/trafficA.png');
	traffic.loadTrafficPaths(scene, 20, isWorldReady);
	var traffic2 = new Plano();
	traffic2.plane = traffic.plane.clone();
	traffic2.loadTrafficPaths(scene, 30, isWorldReady);
	var traffic3 = new Plano();
	traffic3.plane = traffic.plane.clone();
	traffic3.loadTrafficPaths(scene, 70, isWorldReady);
	var traffic3 = new Plano();
	traffic3.plane = traffic.plane.clone();
	traffic3.loadTrafficPaths(scene, 80, isWorldReady);

	// Modelos

	var palm = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	palm.load('obj/Palmera/', 'palmera.obj', 'palmera.mtl', scene, isWorldReady, 2);

	var roca = new Objeto(new THREE.Vector3(5, 0, 0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	roca.load('obj/Rocas/', 'rocas-0.obj', 'rocas-0.mtl', scene, isWorldReady, 2);

	var roca2 = new Objeto(new THREE.Vector3(5, 0, 0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	roca2.load('obj/Rocas/', 'rocas-1.obj', 'rocas-1.mtl', scene, isWorldReady, 2);

	var palmera = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	palmera.load('obj/Palmera/', 'palmera.obj', 'palmera.mtl', scene, isWorldReady, 3);

	var auto = new Objeto(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	auto.load('obj/Autos/', 'autos-2.obj', 'autos-2.mtl', scene, isWorldReady, 'path2')
	//auto.loadinPath(scene, 20);

	var coca = new Objeto(new THREE.Vector3(0, 0, -30), new THREE.Vector3(0,3.1,0), new THREE.Vector3(0,0,0));
	coca.load('obj/Autos/', 'autos-5.obj', 'autos-5.mtl', scene, isWorldReady, 'path3')
}


// Grid guia
var grid = new THREE.GridHelper(50, 25, 0x000000, 0xffffff);
//grid.position.x = 0.5;
//grid.position.z = 0.5;

//scene.add(grid);

//console.log(game);



// Eventos de teclas
function onKeyDown(event) {
	keys[String.fromCharCode(event.keyCode)] = true;

}

function onKeyUp(event) {
	delete keys[String.fromCharCode(event.keyCode)];
	if (event.key === "ArrowUp" || event.key === "ArrowDown"
		|| event.key === "ArrowLeft" || event.key === "ArrowRight")
		squirrelP2.moving = true;
	if (event.key === "w" || event.key === "s"
		|| event.key === "a" || event.key === "d")
		squirrel.moving = true;
}

onwheel = (event) =>{
	wheelY = event.deltaY;
};


document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);		

function animate() {
	requestAnimationFrame( animate );
	deltaTime = clock.getDelta();

	if(!isPause){
	var yaw = 0;
	var sides = 0;
	var sides_p2 = 0;
	var updown = 0
	var updown_p2 = 0
	var pitch = 0;
	var chpitch = 0;

	if (keys["W"]) {
		if (squirrel.moving) {
			updown = -2;
			newmov = "w";
			jump = true;
			ti = Date.now(); //tiempo en que arranca el salto
			squirrel.update();
		}
	} else if (keys["S"]) {
		if (squirrel.moving) {
			updown = 2;
			newmov = "s";
			jump = true;
			ti = Date.now(); //tiempo en que arranca el salto
			squirrel.update();
		}
	}
	if (keys["A"]) {
		if (squirrel.moving) {
			sides = -2;
			newmov = "a";
			jump = true;
			ti = Date.now(); //tiempo en que arranca el salto
			squirrel.update();
		}
	} else if (keys["D"]) {
		if (squirrel.moving) {
			sides = 2;
			newmov = "d";
			jump = true;
			ti = Date.now(); //tiempo en que arranca el salto
			squirrel.update();
		}
	}

	if (newmov == "a"){
		squirrel.mesh.rotation.y = 0  ;
		squirrel.mesh.rotation.y -= 1.5708  ;
	}
	else if (newmov == "w"){
		squirrel.mesh.rotation.y = 0  ;
		squirrel.mesh.rotation.y -= 3.14159  ;
	}
	else if (newmov == "s"){
		squirrel.mesh.rotation.y = 0  ;
	}
	else if (newmov == "d"){
		squirrel.mesh.rotation.y = 0  ;
		squirrel.mesh.rotation.y += 1.5708  ;
	}

	if (modo === 'Cooperativo') {
		if (keys['&']) {
			if (squirrelP2.moving) {
				updown_p2 = - 2;
				newmov2 = "&";
				jump2 = true;
				ti2 = Date.now(); //tiempo en que arranca el salto
				squirrelP2.update()
			}
		} else if (keys['(']) {
			if (squirrelP2.moving) {
				updown_p2 = 2;
				newmov2 = "(";
				jump2 = true;
				ti2 = Date.now(); //tiempo en que arranca el salto
				squirrelP2.update();
			}
		}
		if (keys["%"]) {
			if (squirrelP2.moving) {
				sides_p2 = -2;
				newmov2 = "%";
				jump2 = true;
				ti2 = Date.now(); //tiempo en que arranca el salto
				squirrelP2.update();
			}
		} else if (keys["'"]) {
			if (squirrelP2.moving) {
				sides_p2 = 2;
				newmov2 = "'";
				jump2 = true;
				ti2 = Date.now(); //tiempo en que arranca el salto
				squirrelP2.update();
			}
		}

		if (newmov2 == "&") {
			squirrelP2.mesh.rotation.y = 0;
			squirrelP2.mesh.rotation.y -= 3.14159;

		}
		else if (newmov2 == "(") {
			squirrelP2.mesh.rotation.y = 0;
		}
		else if (newmov2 == "%") {
			squirrelP2.mesh.rotation.y = 0;
			squirrelP2.mesh.rotation.y -= 1.5708;
		}
		else if (newmov2 == "'") {
			squirrelP2.mesh.rotation.y = 0;
			squirrelP2.mesh.rotation.y += 1.5708;
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

	if(keys["C"]){
		console.log(squirrel.mesh.position);
	}
	
	if(isWorldLoaded() && squirrel !== undefined && squirrelP2 !== undefined){

		camera.rotation.y -= (THREE.MathUtils.degToRad(yaw)) * deltaTime;
		camera.rotation.x -= (THREE.MathUtils.degToRad(pitch)) * deltaTime;
		camera.zoom -= (wheelY * 0.05) * deltaTime;

		if (camera.zoom >= 0.8 && camera.zoom <= 4.5) {
			camera.updateProjectionMatrix();
		} else if (camera.zoom <= 0.8) {
			camera.zoom = 0.8;
		} else {
			camera.zoom = 4.5;
		}

		wheelY = 0;
		chpitch = pitch;

		if (modo === 'Cooperativo') {
			let puntoM = puntoMedio(squirrel.mesh.position, squirrelP2.mesh.position);
			camera.position.x = puntoM.x;
			camera.position.z = puntoM.y;
		} else {
			camera.position.x = squirrel.mesh.position.x;
			camera.position.z = squirrel.mesh.position.z;
		}

		
		renderer.render(scene, camera);

		if (jump) {
			let t = (Date.now() - ti) / 1000;
			var yDis = yi + (vi * t) - (2 * 2 * Math.pow(t, 2));
			if (yDis < yi) {
				jump = false;
			}
			squirrel.mesh.position.y = yDis;
		}
		squirrel.mesh.position.x += sides;
		squirrel.mesh.position.z += updown;

		if (modo === 'Cooperativo') {
			if (jump2) {
				let t = (Date.now() - ti2) / 1000;
				var yDis2 = yi + (vi * t) - (2 * 2 * Math.pow(t, 2));
				if (yDis2 < yi) {
					jump2 = false;
				}
				squirrelP2.mesh.position.y = yDis2;
			}
			squirrelP2.mesh.position.x += sides_p2;
			squirrelP2.mesh.position.z += updown_p2;
		}

		if(escenario === 'City') {
			auto.vel = -11 * deltaTime;
			taxi.vel = 22 * deltaTime;

			taxi.update(worldSize);
			auto.update(worldSize);
		}

		if (escenario === 'Snow City'){
			auto.vel = -(15 * deltaTime);
			quitanieves.vel = 10 * deltaTime;
			quitanieves2.vel = 11 * deltaTime;

			auto.update(worldSize);
			quitanieves.update(worldSize);
			quitanieves2.update(worldSize);
		}

		if (escenario === 'Beach City Night') {
			auto.vel = 15 * deltaTime;
			coca.vel = -(10 * deltaTime);

			auto.update(worldSize);
			coca.update(worldSize);
		}
		
		

		// Collision
		for (var i = 0; i < collisionObjects.length; i++) {

			var collision = detectCollision(squirrel.mesh, collisionObjects[i]);

			if (collision) {
				squirrel.mesh.position.x -= sides;
				squirrel.mesh.position.z -= updown;
				console.log("colisionando");
				break;
			}
		}
		if (modo === 'Cooperativo') {
			for (let i = 0; i < collisionObjects.length; i++) {
					
				let collision = detectCollision(squirrelP2.mesh, collisionObjects[i]);

				if (collision) {
					squirrelP2.mesh.position.x -= sides_p2;
					squirrelP2.mesh.position.z -= updown_p2;
					console.log("player 2 colisionando");
					break;
				}

			}
		}
	}
	}
}
animate();



function detectCollision(object1, object2){

	for (var i = 0; i < object1.children.length; i++) {

		for (var j = 0; j < object2.children.length; j++) {

			object1.children[i].geometry.computeBoundingBox(); 
			object2.children[i].geometry.computeBoundingBox();
			object1.updateMatrixWorld();
			object2.updateMatrixWorld();

			var box1 = object1.children[i].geometry.boundingBox.clone();
			box1.applyMatrix4(object1.matrixWorld);

			var box2 = object2.children[i].geometry.boundingBox.clone();
			box2.applyMatrix4(object2.matrixWorld);
			if (box1.intersectsBox(box2)) {
				return true;
			}
		}
	}
	return false;
}

function puntoMedio(pos1, pos2){
	let newX, newZ;
	newX = (pos1.x + pos2.x) / 2;
	newZ = (pos1.z + pos2.z) / 2;
	return new THREE.Vector2(newX, newZ);
}

function isWorldLoaded(){
	let aja;
	for(let i = 0; i < isWorldReady.length; i++){
		if(isWorldReady[i])
			aja = true;
		else
			aja = false;
	}
	return aja;
}