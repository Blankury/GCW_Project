import { Squirrel } from "../js/squirrel.js";
import loadOBJWithMTL, { Objeto, collisionObjects, puntos, monedas, llantas, escudos, autos } from "../js/objModelos.js";
import Plano from "./plano.js";

// Nivel Seleccionado
var escenario = sessionStorage.getItem('scene');
var modo = sessionStorage.getItem('mode');
var dificultad = sessionStorage.getItem('difficulty');

console.log(escenario + '\n' + modo + '\n' + dificultad);

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
//Items
var itemCollected = [];
var itemCollected2 = [];
var itemMonedas =[];
var itemMonedas2 =[];
var itemEscudo =[];
var itemEscudo2 =[];
var itemLlanta =[];
var itemLlanta2 =[];
var modificarvelocidad=false;


const contador = document.getElementById('contador');
const contador2 = document.getElementById('contador2');
const llantatime = document.getElementById('contadorneg');
// Relojes
var clock = new THREE.Clock();
var minute = .5;
var minute2 = .5;
var time = minute * 30;
var time2 = minute * 30;
var duracionMinutos=0;
var duracionSegundos=0;
var duracionMinutos2=0;
var duracionSegundos2=0;
var minuteNeg = .5;
var timeNeg = minuteNeg * 30;
var duracion=0;


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


//Movimientos animados
var jump = false, jump2 = false, yi = 0.5, vi = 4, ti, ti2;
var newmov = "";
var newmov2 = "";

// Renderer
const renderer = new THREE.WebGLRenderer({ precision: "mediump"});
renderer.setClearColor(new THREE.Color(0, 0, 0));
renderer.setSize(game.clientWidth, game.clientHeight);

//Rendererquality

const configquality = document.getElementById("caliteRange");


function changerender(){

	var valor = configquality.value;
	if (valor = 0){
	renderer.antialias = false;
	}
	else{
		
	renderer.antialias = true;
	}
	
	
	}
//POWERUPS


//Victoria
var Lotiene1 = false;
var Lotiene2 = false;
var colisionaconlabellota1;
var colisionaconlabellota2;

const canvas = renderer.domElement;

window.addEventListener('resize', function () {
	width = game.clientWidth;
	height = game.clientHeight;
	//renderer.setPixelRatio(width / length);
	renderer.setSize(width, height);
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
});
game.appendChild(renderer.domElement);

console.log(squirrel);


//Nieve
let particles;
let positions = [], velocities = [];

const numSnowflakes = 11000;

const maxRange = 1000, minRange = maxRange/2;
const minHeight = 150;

const geometry = new THREE.BufferGeometry();
const textureLoader = new THREE.TextureLoader();

addSnowFlakes();



function addSnowFlakes(){


	for (let i = 0; i < numSnowflakes; i++){
	positions.push(
		Math.floor(Math.random() * maxRange - minRange),
		Math.floor(Math.random() * minRange + minHeight),
		Math.floor(Math.random() * maxRange - minRange));
		
	velocities.push(
		Math.floor(Math.random() * 6- 3) * 0.1,
		Math.floor(Math.random() * 5+ 0.12) * 0.18,
		Math.floor(Math.random() * 6-3) * 0.1);
	
	}
	
	
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	
	geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
	
	
	
	
	
	
	
	const flakeMaterial = new THREE.PointsMaterial({
	size:4,
	map: textureLoader.load('img/Particula.png'),
	blending: THREE.AdditiveBlending,
	depthTest: false,
	transparent: true,
	opacity: 0.7,
	});
	
particles = new THREE.Points(geometry, flakeMaterial);
scene.add(particles);
}


loadOBJWithMTL("obj/Puntos/", "Puntos.obj", "Puntos.mtl", (object) => {

		
	var pts2 = object.clone();
	pts2.position.x = 6;
	pts2.position.z = -10;

	object.position.x = -6;
	object.position.z = -28;

	var pts3 = object.clone();
	pts3.position.x = 1;
	pts3.position.z = -40;

	var pts4 = object.clone();
	pts4.position.x = 13;
	pts4.position.z = -50;

	puntos.push(object);
	puntos.push(pts2);
	puntos.push(pts3);
	puntos.push(pts4);

	scene.add(puntos[0]);
	scene.add(puntos[1]);
	scene.add(puntos[2]);
	scene.add(puntos[3]);

});
//Cargar item monedas
loadOBJWithMTL("obj/Monedas/", "moneda.obj", "moneda.mtl", (object) => {

	var moneda2 = object.clone();
	moneda2.position.x = 10;
	moneda2.position.z = -40;

	object.position.x = 0;
	object.position.z = -24;

	monedas.push(object);
	monedas.push(moneda2);

	scene.add(monedas[0]);
	scene.add(monedas[1]);


})
//cargar escudos
loadOBJWithMTL("obj/Escudo/", "escudo.obj", "escudo.mtl", (object) => {

	var esc = object.clone();
	esc.position.z = -40;
	esc.position.x = 0;

	object.position.z = -70;
	object.position.x = -15;

	escudos.push(object);
	escudos.push(esc);

	scene.add(escudos[0]);
	scene.add(escudos[1]);

});
//cargar llantas
loadOBJWithMTL("obj/Llanta/", "llanta-1.obj", "llanta-1.mtl", (object) => {

	var llanta = object.clone();
	llanta.position.z = -8;
	llanta.position.x = -12;

	object.position.z = -65;
	object.position.x = 13;

	llantas.push(object);
	llantas.push(llanta);

	scene.add(llantas[0]);
	scene.add(llantas[1]);

});
loadOBJWithMTL("obj/Bellota/", "bellota.obj", "bellota.mtl", (object) => {
	object.position.z = -70;
	scene.add(object);
	colisionaconlabellota1 = object;
});

if (modo === 'Cooperativo') {
	loadOBJWithMTL("obj/Bellota/", "bellota.obj", "bellota.mtl", (object) => {
		object.position.z = -70;
		object.position.x = 4;

		scene.add(object);
		colisionaconlabellota2 = object;
	});

	
}
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

if (modo === 'Cooperativo') {
	loadOBJWithMTL("obj/Player2/", "Ardilla.obj", "Ardilla.mtl", (object) => {
		object.scale.x = 0.5;
		object.scale.y = 0.5;
		object.scale.z = 0.5;

		object.position.x = 2;
		object.position.y = 0.5;


		squirrelP2.mesh = object;
		scene.add(object);

		isWorldReady.push(true);
	});
}

// Nivel 1
if (escenario === 'City') {

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

	// Modelos
	var arbol = new Objeto(new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	arbol.load('obj/Arbol/', 'arbol1-0.obj', 'arbol1-0.mtl', scene, isWorldReady, 'spawnCity');
	arbol.load('obj/Arbol/', 'arbol1-1.obj', 'arbol1-1.mtl', scene, isWorldReady, 'spawnCity');

	var arbusto = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	arbusto.load('obj/Arbusto/', 'arbusto.obj', 'arbusto.mtl', scene, isWorldReady, 'spawnCity');

	var tronco = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	tronco.load('obj/Tronco/', 'tronco.obj', 'tronco.mtl', scene, isWorldReady, 'spawnDec');

	var roca = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	roca.load('obj/Rocas/', 'rocas-1.obj', 'rocas-1.mtl', scene, isWorldReady, 'spawnDec');

	var auto = new Objeto(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 3.1, 0), new THREE.Vector3(0, 0, 0));
	auto.load('obj/Autos/', 'autos-4.obj', 'autos-4.mtl', scene, isWorldReady, 'path');

	var taxi = new Objeto(new THREE.Vector3(0, 0, -40), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	taxi.load('obj/Autos/', 'autos-6.obj', 'autos-6.mtl', scene, isWorldReady, 'path2');

	var auto2 = new Objeto(new THREE.Vector3(0, 0, -60), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
	auto2.load('obj/Autos/', 'autos-0.obj', 'autos-0.mtl', scene, isWorldReady, 'path');

}


// Nivel 2
if (escenario === 'Snow City') {
	
	updateParticles();
	var ambientLight = new THREE.AmbientLight(new THREE.Color(0x3a2d24), 1);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 0.6);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);

	var light = new THREE.PointLight(0xfed04a, 0.3, 40);
	light.position.set(-10, 5, -16);
	var light2 = light.clone();
	light2.position.set(10, 5, -26);
	var light3 = light.clone();
	light3.position.set(-10, 5, -46);
	scene.add(light);
	scene.add(light2);
	scene.add(light3);

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
	var pino = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	pino.load('obj/Pino/', 'pino-1.obj', 'pino-1.mtl', scene, isWorldReady, 'spawnSnowCity');
	//pino.loadRandomO(-60, 60, 0, 60, 80, scene);
	var roca = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.6, 0.6, 0.6));
	roca.load('obj/Rocas/', 'roca_0.obj', 'roca_0.mtl', scene, isWorldReady, 'spawnSnowCity');

	var tronco = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	tronco.load('obj/Tronco/', 'tronco.obj', 'tronco.mtl', scene, isWorldReady, 'spawnDecSC');

	var monoNieve = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	monoNieve.load('obj/Mono_de_nieve/', 'Snowman.obj', 'Snowman.mtl', scene, isWorldReady, 'spawnDec');

	var lampara = new Objeto(new THREE.Vector3(0, 0, -17), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	lampara.load('obj/Lampara/', 'lampara.obj', 'lampara.mtl', scene, isWorldReady, 'lights');

	var quitanieves = new Objeto(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	quitanieves.load('obj/Quitanieves/', 'quitanieevs-0.obj', 'quitanieevs-0.mtl', scene, isWorldReady, 'path3')

	var auto = new Objeto(new THREE.Vector3(0, 0, -30), new THREE.Vector3(0, 3.1, 0), new THREE.Vector3(0, 0, 0));
	auto.load('obj/Autos/', 'autos-0.obj', 'autos-0.mtl', scene, isWorldReady, 'path');

	var quitanieves2 = new Objeto(new THREE.Vector3(0, 0, -50), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	quitanieves2.load('obj/Quitanieves/', 'quitanieevs-1.obj', 'quitanieevs-1.mtl', scene, isWorldReady, 'path2')

}

// Nivel 3
if (escenario === 'Beach City Night') {
	var ambientLight = new THREE.AmbientLight(new THREE.Color(0x2A3990), 1);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(new THREE.Color(0xF06292), 0.3);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);

	var light = new THREE.PointLight(0xFF7C30, 0.8, 100);
	light.position.set(50, 5, 0);
	var light2 = light.clone();
	light2.position.set(10, 5, -26);
	var light3 = light.clone();
	light3.position.set(-10, 5, -46);
	var light4 = light.clone();
	light4.position.set(-10, 5, -20);
	var light5 = light.clone();
	light5.position.set(-30, 5, -25);
	scene.add(light);
	scene.add(light2);
	scene.add(light3);
	scene.add(light4);
	scene.add(light5);

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
	var palm = new Objeto(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	palm.load('obj/Palmera/', 'palmera.obj', 'palmera.mtl', scene, isWorldReady, 'spawnBeachCity');

	var roca = new Objeto(new THREE.Vector3(5, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	roca.load('obj/Rocas/', 'rocas-0.obj', 'rocas-0.mtl', scene, isWorldReady, 'spawnBeachCity');

	var roca2 = new Objeto(new THREE.Vector3(5, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	roca2.load('obj/Rocas/', 'rocas-1.obj', 'rocas-1.mtl', scene, isWorldReady, 'spawnBeachCity');

	var roca3 = new Objeto(new THREE.Vector3(5, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	roca3.load('obj/Rocas/', 'rocas-2.obj', 'rocas-2.mtl', scene, isWorldReady, 'spawnBeachCity');

	var lampara = new Objeto(new THREE.Vector3(0, 0, -17), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	lampara.load('obj/Lampara/', 'lampara.obj', 'lampara.mtl', scene, isWorldReady, 'lights3');

	var auto = new Objeto(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	auto.load('obj/Autos/', 'autos-2.obj', 'autos-2.mtl', scene, isWorldReady, 'path2');

	var coca = new Objeto(new THREE.Vector3(0, 0, -30), new THREE.Vector3(0, 3.1, 0), new THREE.Vector3(0, 0, 0));
	coca.load('obj/Autos/', 'autos-5.obj', 'autos-5.mtl', scene, isWorldReady, 'path3');

	var coca2 = new Objeto(new THREE.Vector3(0, 0, -71), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
	coca2.load('obj/Autos/', 'autos-5.obj', 'autos-5.mtl', scene, isWorldReady, 'path2');

	var auto2 = new Objeto(new THREE.Vector3(0, 0, -80), new THREE.Vector3(0, 3.1, 0), new THREE.Vector3(0, 0, 0));
	auto2.load('obj/Autos/', 'autos-4.obj', 'autos-4.mtl', scene, isWorldReady, 'path2');
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

onwheel = (event) => {
	wheelY = event.deltaY;
};


document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
//document.addEventListener("visibilitychange", onchange);
//Posicion auxiliar
var aux = 0;
var aux2 = 0;
function animate() {

	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();

	updateParticles();
	if (!isPause) {
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
				var actual = squirrel.mesh.position.z;
				
				if(!squirrel.GetBellota()){
					if (actual < aux) {
						squirrel.updatePuntuacion(5);
					}
				}
				else{
					if (actual < aux) {
						squirrel.updatePuntuacion(-5);
					}
				}
				document.getElementById("Player1Points").innerHTML = squirrel.GetPuntuacion();
			}
		} else if (keys["S"]) {
			if (squirrel.moving) {
				updown = 2;
				newmov = "s";
				jump = true;
				ti = Date.now(); //tiempo en que arranca el salto
				squirrel.update();
				var actual = squirrel.mesh.position.z;
				if(!squirrel.GetBellota()){
					if (actual < aux) {
						squirrel.updatePuntuacion(-5);
					}
				}
				else{
					if (actual < aux) {
						squirrel.updatePuntuacion(5);
					}
				}
				document.getElementById("Player1Points").innerHTML = squirrel.GetPuntuacion();
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

		if (newmov == "a") {
			squirrel.mesh.rotation.y = 0;
			squirrel.mesh.rotation.y -= 1.5708;
		}
		else if (newmov == "w") {
			squirrel.mesh.rotation.y = 0;
			squirrel.mesh.rotation.y -= 3.14159;
		}
		else if (newmov == "s") {
			squirrel.mesh.rotation.y = 0;
		}
		else if (newmov == "d") {
			squirrel.mesh.rotation.y = 0;
			squirrel.mesh.rotation.y += 1.5708;
		}

		if (modo === 'Cooperativo') {
			if (keys['&']) {
				if (squirrelP2.moving) {
					updown_p2 = - 2;
					newmov2 = "&";
					jump2 = true;
					ti2 = Date.now(); //tiempo en que arranca el salto
					squirrelP2.update()
					var actual2 = squirrelP2.mesh.position.z;
				
					if(!squirrelP2.GetBellota()){
						if (actual2 < aux2) {
							squirrelP2.updatePuntuacion(5);
						}
					}
					else{
						if (actual2 < aux2) {
							squirrelP2.updatePuntuacion(-5);
						}
					}
					document.getElementById("Player2Points").innerHTML = squirrelP2.GetPuntuacion();
				}
			} else if (keys['(']) {
				if (squirrelP2.moving) {
					updown_p2 = 2;
					newmov2 = "(";
					jump2 = true;
					ti2 = Date.now(); //tiempo en que arranca el salto
					squirrelP2.update();
					var actual2 = squirrelP2.mesh.position.z;
					if(!squirrelP2.GetBellota()){
						if (actual2 < aux2) {
							squirrelP2.updatePuntuacion(-5);
						}
					}
					else{
						if (actual2 < aux2) {
							squirrelP2.updatePuntuacion(5);
						}
					}
					document.getElementById("Player2Points").innerHTML = squirrelP2.GetPuntuacion();
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

		if (keys["Z"]) {
			camera.zoom = 2;
		}

		if (keys[" "]) {
			if (!changeCam) {
				camera.rotation.x = THREE.MathUtils.degToRad(-90);
				camera.rotation.y = THREE.MathUtils.degToRad(0);
				camera.rotation.z = THREE.MathUtils.degToRad(0);
				// camera.rotation.x = THREE.MathUtils.degToRad(0);
				// camera.rotation.y = THREE.MathUtils.degToRad(90);
				// camera.rotation.z = THREE.MathUtils.degToRad(0);
				changeCam = true;
			} else {
				camera.rotation.x = THREE.MathUtils.degToRad(-45);
				camera.rotation.y = THREE.MathUtils.degToRad(10);
				camera.rotation.z = THREE.MathUtils.degToRad(10);
				changeCam = false;
			}

		}

		if (keys["C"]) {
			console.log(squirrel.mesh.position);
		}

		if (isWorldLoaded() && squirrel !== undefined && squirrelP2 !== undefined) {

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

			if (escenario === 'City') {
				if (dificultad === 'Facil'){
					if(duracion==1){
						if(modificarvelocidad){
							auto.vel = -15 * deltaTime;
							taxi.vel = 22 * deltaTime;
							auto2.vel = 25 * deltaTime;
						}
					}
					else{
						auto.vel = -5 * deltaTime;
						taxi.vel = 16 * deltaTime;
						auto2.vel = 14 * deltaTime;
					}
				}
				else {
					if(duracion==1){
						if(modificarvelocidad){
							auto.vel = -22 * deltaTime;
							taxi.vel = 40 * deltaTime;
							auto2.vel = 30 * deltaTime;
						}
					}
					else{
						auto.vel = -11 * deltaTime;
						taxi.vel = 32 * deltaTime;
						auto2.vel = 25 * deltaTime;
					}
					
				}

				taxi.update(worldSize);
				auto.update(worldSize);
				auto2.update(worldSize);
			}

			if (escenario === 'Snow City') {
				if (dificultad === 'Facil'){
					if(duracion==1){
						if(modificarvelocidad){
							auto.vel = -22 * deltaTime;
							quitanieves.vel = 19 * deltaTime;
							quitanieves2.vel = 20 * deltaTime;
						}
					}
					else{
						auto.vel = -15 * deltaTime;
						quitanieves.vel = 10 * deltaTime;
						quitanieves2.vel = 11 * deltaTime;
					}
				} 
				else{
					if(duracion==1){
						if(modificarvelocidad){
							auto.vel = -30 * deltaTime;
							quitanieves.vel = 55 * deltaTime;
							quitanieves2.vel = 55 * deltaTime;
						}
					}
					else{
						auto.vel = -21 * deltaTime;
						quitanieves.vel = 45 * deltaTime;
						quitanieves2.vel = 45 * deltaTime;
					}
				}

				auto.update(worldSize);
				quitanieves.update(worldSize);
				quitanieves2.update(worldSize);
			}

			if (escenario === 'Beach City Night') {
				if (dificultad === 'Facil'){
					if(duracion==1){
						if(modificarvelocidad){
							auto.vel = 22 * deltaTime;
							coca.vel = -20 * deltaTime;
							coca2.vel = 27 * deltaTime;
							auto2.vel = -30 * deltaTime;		
						}
					}
					else{
						auto.vel = 15 * deltaTime;
						coca.vel = -10 * deltaTime;
						coca2.vel = 17 * deltaTime;
						auto2.vel = -19 * deltaTime;
					}
				} 
				else {
					if(duracion==1){
						if(modificarvelocidad){
							auto.vel = 40 * deltaTime;
							coca.vel = -50 * deltaTime;
							coca2.vel = 38 * deltaTime;
							auto2.vel = -70 * deltaTime;
						}
					}
					else{
					auto.vel = 30 * deltaTime;
					coca.vel = -40 * deltaTime;
					coca2.vel = 28 * deltaTime;
					auto2.vel = -51 * deltaTime;
					}
				}

				auto.update(worldSize);
				coca.update(worldSize);
				coca2.update(worldSize);
				auto2.update(worldSize);
			}

			//Daño
			for (var i = 0; i < autos.length; i++) {

				if(duracionMinutos==0&&duracionSegundos==0){
					var collision1 = detectCollision(squirrel.mesh, autos[i]);

					if (collision1) {
						squirrel.mesh.position.z -= updown - 4;
						if (dificultad === "Dificil") {
								
							squirrel.updateVida(5);
							squirrel.updatePuntuacion(-20);
							document.getElementById("Player1Points").innerHTML = squirrel.GetPuntuacion();
						}
						else {
								
							squirrel.updateVida(1);
							squirrel.updatePuntuacion(-10);
							document.getElementById("Player1Points").innerHTML = squirrel.GetPuntuacion();
						}
						//Si pierde
						if (modo === "Individual") {
							if (squirrel.GetVida() == 0) {
								you_lose();
							}
						}
						if (modo === "Cooperativo") {
							if (squirrel.GetVida() == 0) {
								scene.remove(squirrel.mesh);
								console.log("c muere");
							}
						}
						break;
					}
				}
					
				if (modo === 'Cooperativo') {

					if(duracionMinutos2==0&&duracionSegundos2==0){
							var collision2 = detectCollision(squirrelP2.mesh, autos[i]);

						if (collision2) {
								squirrelP2.mesh.position.z -= updown_p2 - 4;
							if (dificultad === "Dificil") {
								squirrelP2.updateVida(5);
								squirrelP2.updatePuntuacion(-20);
								document.getElementById("Player2Points").innerHTML = squirrelP2.GetPuntuacion();
							}
							else {
								squirrelP2.updateVida(1);
								squirrelP2.updatePuntuacion(-10);
								document.getElementById("Player2Points").innerHTML = squirrelP2.GetPuntuacion();
							}
							if (squirrelP2.GetVida() == 0) {
								scene.remove(squirrelP2.mesh);
								console.log("c muere");
							}
							break;
						}

					}
						
				}
					

				if (squirrelP2.GetVida() <= 0 && squirrel.GetVida() <= 0) {
					let escenariofinal;
					if (escenario === 'Beach City Night'){
						escenariofinal="BeachCityNight";
					} else if (escenario === 'Snow City'){
						escenariofinal="SnowCity";
					} else if (escenario === "City"){
						escenariofinal="City";
					}
					window.location.href = ("./finpartidaMULTIJUGADOR.html?puntosP1=" + squirrel.GetPuntuacion() + "&puntosP2=" + squirrelP2.GetPuntuacion() + "&nivel=" + escenariofinal);
				}
			}

			//PowerUps e Items
			for (var i = 0; i < puntos.length; i++) {

				var collision1 = detectCollision(squirrel.mesh, puntos[i]);
				

				if (collision1) {
					itemCollected[i] = true;
					scene.remove(puntos[i]);
					puntos[i].clear();
					break;
				}
				else{
					if(itemCollected[i]==true){
						squirrel.updatePuntuacion(5);
						document.getElementById("Player1Points").innerHTML=squirrel.GetPuntuacion();
						itemCollected[i]=false;
					}
				}
				
				document.getElementById("Player1Points").innerHTML=squirrel.GetPuntuacion();
				if (modo === 'Cooperativo') {
					var collision2 = detectCollision(squirrelP2.mesh, puntos[i]);

					if (collision2) {
						itemCollected2[i] = true;
						scene.remove(puntos[i]);
						
						break;
					}
					else{
						if(itemCollected2[i]==true){
							squirrelP2.updatePuntuacion(5);
							document.getElementById("Player2Points").innerHTML=squirrelP2.GetPuntuacion();
							itemCollected2[i]=false;
						}
						
					}
				}
				document.getElementById("Player2Points").innerHTML=squirrelP2.GetPuntuacion();
			}
			for (var i = 0; i < escudos.length; i++) {

				var collision1 = detectCollision(squirrel.mesh, escudos[i]);
			
				if (collision1) {
					itemEscudo[i] = true;
					console.log ("item escudo colisiona");
					scene.remove(escudos[i]);
					escudos[i].clear();
					break;
				}
				else{
					if(itemEscudo[i]==true){
						console.log ("inicia contador");
						setInterval(updateCountdown,1000);
						duracionMinutos=1; duracionSegundos=1;
						itemEscudo[i]=false;
						minute = .5;
						time = minute * 30;
					}
					
				}
				if (modo === 'Cooperativo') {
					var collision2 = detectCollision(squirrelP2.mesh, escudos[i]);

					if (collision2) {
						itemEscudo2[i] = true;
						scene.remove(escudos[i]);
						escudos[i].clear();
						break;
					}
					else{
						if(itemEscudo2[i]==true){
							setInterval(updateCountdown2,1000);

							duracionMinutos2=1; duracionSegundos=1;

							itemEscudo2[i]=false;
							minute2 = .5;
							time2 = minute2 * 30;
						}
						
					}
				}
			}
			for (var i = 0; i < llantas.length; i++) {

				var collision1 = detectCollision(squirrel.mesh, llantas[i]);


				if (collision1) {
					itemLlanta[i]=true;
					scene.remove(llantas[i]);
					llantas[i].clear();
					break;
				}
				else{
					if(itemLlanta[i]==true){
						modificarvelocidad=true;
						console.log ("inicia contador neg");
						setInterval(updateTiempoNeg,1000);
						duracion=1;
						minuteNeg = .5;
						timeNeg = minuteNeg * 30;
						itemLlanta[i]=false;
					}
				}
				if (modo === 'Cooperativo') {
					var collision2 = detectCollision(squirrelP2.mesh, llantas[i]);

					if (collision2) {
						itemLlanta2[i]=true;
						scene.remove(llantas[i]);
						llantas[i].clear();
						break;
					}
					else{
						if(itemLlanta2[i]==true){
							modificarvelocidad=true;
							console.log ("inicia contador neg");
							setInterval(updateTiempoNeg,1000);
							duracion=1;
							minuteNeg = .5;
							timeNeg = minuteNeg * 30;
							itemLlanta2[i]=false;
						}
					}
				}
			}
			for (var i = 0; i < monedas.length; i++) {

				var collision1 = detectCollision(squirrel.mesh, monedas[i]);


				if (collision1) {
					itemMonedas[i]=true;
					scene.remove(monedas[i]);
					monedas[i].clear();
					break;
				}
				else{
					if(itemMonedas[i]==true){
						squirrel.updateMonedas();
						console.log("Moneada aumentada: " + squirrel.GetMoneda());
						document.getElementById("Player1Monedas").innerHTML=squirrel.GetMoneda();
						itemMonedas[i]=false;
					}
					
				}
				if (modo === 'Cooperativo') {
					var collision2 = detectCollision(squirrelP2.mesh, monedas[i]);
		
					if (collision2) {
						itemMonedas2[i]=true;
						scene.remove(monedas[i]);
						break;
					}
					else{
						if(itemMonedas2[i]==true){
							squirrelP2.updateMonedas();
							console.log("Moneada aumentada: " + squirrelP2.GetMoneda());
							document.getElementById("Player2Monedas").innerHTML=squirrelP2.GetMoneda();
							itemMonedas2[i]=false;
						}
						
					}
				}
			}
			//Colision global
			if (squirrel.mesh.position.z >= 30 ){
				squirrel.mesh.position.z -= updown;
			}
			if (squirrel.mesh.position.z <= -80 ){
				squirrel.mesh.position.z -= updown;
			}
			if (squirrel.mesh.position.x <= -44){
				squirrel.mesh.position.x -= sides;

			}
			if (squirrel.mesh.position.x >= 46){
				squirrel.mesh.position.x -= sides;
			}

			if (modo === 'Cooperativo') {
			
				if (squirrelP2.mesh.position.z >= 30 ){
					squirrelP2.mesh.position.z -= updown_p2;
				}
				if (squirrelP2.mesh.position.z <= -80 ){
					squirrelP2.mesh.position.z -= updown_p2;
				}
				if (squirrelP2.mesh.position.x <= -44){
					squirrelP2.mesh.position.x -= sides_p2;
	
				}
				if (squirrelP2.mesh.position.x >= 46){
					squirrelP2.mesh.position.x -= sides_p2;
				}
			
			}
			
			//Colisiones
			for (var i = 0; i < collisionObjects.length; i++) {

				var collision = detectCollision(squirrel.mesh, collisionObjects[i]);


				if (collision) {
					aux = squirrel.mesh.position.z;
					squirrel.mesh.position.x -= sides;
					squirrel.mesh.position.z -= updown;
					break;
				}

			}
			if (modo === 'Cooperativo') {
				for (let i = 0; i < collisionObjects.length; i++) {

					let collision = detectCollision(squirrelP2.mesh, collisionObjects[i]);

					if (collision) {
						aux2 = squirrelP2.mesh.position.z;
						squirrelP2.mesh.position.x -= sides_p2;
						squirrelP2.mesh.position.z -= updown_p2;
						break;
					}

				}
			}

			//BELLOTA
			var collision = detectCollision(squirrel.mesh, colisionaconlabellota1);
			
			
			if (collision) {
				scene.remove(colisionaconlabellota1);
				squirrel.updateBellota();
				document.getElementById("bellota").src = "./img/bellota.png";
			}

			if (modo === 'Cooperativo') {
				
				let collision = detectCollision(squirrelP2.mesh, colisionaconlabellota2);

				if (collision) {
					scene.remove(colisionaconlabellota2);
					squirrelP2.updateBellota();
					document.getElementById("bellota2").src = "./img/bellota.png";
				}
			}

			//VICTORIA
			if(squirrel.GetBellota()){
				if(squirrel.mesh.position.z==0){
					window.location.href = ("./finpartida.html?puntosP1=" + squirrel.GetPuntuacion() + "&estado=GANASTE");
				}
			}
			if(modo==='Cooperativo'){
				if(squirrel.GetBellota()){
					if(squirrel.mesh.position.z==0){
						window.location.href = ("./finpartidaMULTIJUGADOR.html?puntosP1=" + squirrel.GetPuntuacion() + "&puntosP2=" + squirrelP2.GetPuntuacion() + "&Ganador=JUGADOR1");
					}
				}
				if(squirrelP2.GetBellota()){
					if(squirrelP2.mesh.position.z==0){
						window.location.href = ("./finpartidaMULTIJUGADOR.html?puntosP1=" + squirrel.GetPuntuacion() + "&puntosP2=" + squirrelP2.GetPuntuacion() + "&Ganador=JUGADOR2");
					}
				}
				
			}
		}
	}
}
animate();

function updateParticles(){
	

for (let i = 0; i< numSnowflakes * 3; i += 3){



	particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
	
	
	particles.geometry.attributes.position.array[i+1] -= particles.geometry.attributes.velocity.array[i+1];
	
	
	particles.geometry.attributes.position.array[i+2] -= particles.geometry.attributes.velocity.array[i+2];
	
	
	
		if (particles.geometry.attributes.position.array[i+1] < 0){
		
		particles.geometry.attributes.position.array[i] = Math.floor(Math.random()*maxRange - minRange);
		
		particles.geometry.attributes.position.array[i+1] = Math.floor(Math.random()*minRange + minHeight);
		
		particles.geometry.attributes.position.array[i+2] = Math.floor(Math.random()*maxRange - minRange);
		}
	}
	
	particles.geometry.attributes.position.needsUpdate = true;
	
}

function detectCollision(object1, object2) {

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

function puntoMedio(pos1, pos2) {
	let newX, newZ;
	newX = (pos1.x + pos2.x) / 2;
	newZ = (pos1.z + pos2.z) / 2;
	return new THREE.Vector2(newX, newZ);
}

function isWorldLoaded() {
	let aja;
	for (let i = 0; i < isWorldReady.length; i++) {
		if (isWorldReady[i])
			aja = true;
		else
			aja = false;
	}
	return aja;
}

function you_lose() {
	let escenariofinal;
	if (escenario === "Beach City Night"){
		escenariofinal="BeachCityNight";
	} else if (escenario === "Snow City"){
		escenariofinal="SnowCity";
	} else if (escenario === "City"){
		escenariofinal="City";
	}
	window.location.href = ("./finpartida.html?puntosP1=" + squirrel.GetPuntuacion() + "&estado=PERDISTE&nivel=" + escenariofinal );

}

function updateCountdown(){
	const minutes = Math.floor(time/60);
	var seconds = time % 60;

	seconds=seconds<10? '0' + seconds : seconds;
	contador.innerHTML= `${minutes}:${seconds}`;
	
	if(minutes==0 && seconds==0){
		duracionMinutos=0;
		duracionSegundos=0;
	}
	else{
		time--;
	}	
}
function updateCountdown2(){
	const minutes = Math.floor(time2/60);
	let seconds = time2 % 60;

	seconds=seconds<10? '0' + seconds : seconds;
	contador2.innerHTML= `${minutes}:${seconds}`;
	
	if(minutes==0 && seconds==0){
		duracionMinutos2=0;
		duracionSegundos2=0;
	}
	else{
		time2--;
	}
}
function updateTiempoNeg(){
	const minutes = Math.floor(timeNeg/60);
	var seconds = timeNeg % 60;

	seconds=seconds<10? '0' + seconds : seconds;
	llantatime.innerHTML= `${minutes}:${seconds}`;
	
	if(minutes==0 && seconds==0){
		duracion=0;
		modificarvelocidad=false;
	}
	else{
		timeNeg--;
	}	
}