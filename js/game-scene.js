import { Squirrel } from "../js/squirrel.js";
import loadOBJWithMTL from "../js/objModelos.js";

// Nivel Seleccionado
var escenario = sessionStorage.getItem('scene');
var modo = sessionStorage.getItem('mode');
var dificultad = sessionStorage.getItem('difficulty');

console.log(escenario+ '\n' + modo + '\n'+ dificultad);

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
var isWorldReady = [];

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
//Colisiones
var collisionObjects = [];

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

console.log(renderer);
game.appendChild( renderer.domElement );

console.log(squirrel);

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


//const cube = new THREE.Mesh(geometry, material);
//const cube2 = new THREE.Mesh(geometry, material2);

//cube.position.x = -2; cube.position.y = 0.5;
//cube2.position.x = 2; cube2.position.y = 0.5;

//scene.add(cube);

loadOBJWithMTL("obj/Player_1/", "Ardilla.obj", "Ardilla.mtl", (object) => {
	object.scale.x = 0.5;
	object.scale.y = 0.5;
	object.scale.z = 0.5;

	object.position.y = 0.5;

	squirrel.mesh = object;
	scene.add(object);
	isWorldReady[0] = true;

	if (modo === 'Cooperativo')
		squirrel.mesh.position.x = -2;
});

if(modo === 'Cooperativo'){
	loadOBJWithMTL("obj/Player2/", "ardilla_2.obj", "ardilla_2.mtl", (object) => {
		object.scale.x = 0.5;
		object.scale.y = 0.5;
		object.scale.z = 0.5;

		object.position.x = 10;
		object.position.y = 0.5;


		squirrelP2.mesh = object;
		scene.add(object);
	
		isWorldReady[1] = true;
	});
}

loadOBJWithMTL("obj/Mono_de_nieve/", "Snowman.obj", "Snowman.mtl", (object) => {
	object.position.x += 3.5;
	scene.add(object);

	collisionObjects.push(object);

	isWorldReady[2] = true;
});

loadOBJWithMTL("obj/Escudo/", "escudo.obj", "escudo.mtl", (object) => {
	object.scale.x = 0.5;
	object.scale.y = 0.5;
	object.scale.z = 0.5;
	object.position.x += 3.5;
	object.position.z += 2;
	scene.add(object);
	isWorldReady[3] = true;
});

loadOBJWithMTL("obj/Monedas/", "moneda.obj", "moneda.mtl", (object) => {
	object.scale.x = 0.5;
	object.scale.y = 0.5;
	object.scale.z = 0.5;
	object.position.x += 5.5;
	object.position.z += 2;
	scene.add(object);
	isWorldReady[8] = true;
});

loadOBJWithMTL("obj/Puntos/", "Puntos.obj", "Puntos.mtl", (object) => {
	object.position.x += 7.5;
	object.position.z += 2;
	scene.add(object);
	isWorldReady[4] = true;
});

loadOBJWithMTL("obj/Quitanieves/", "quitanieevs-0.obj", "quitanieevs-0.mtl", (object) => {
	object.position.x += 3.5;
	object.position.z -= 4;
	scene.add(object);
	isWorldReady[5] = true;
});

loadOBJWithMTL("obj/Rocas/", "rocas-0.obj", "rocas-0.mtl", (object) => {
	object.position.x += 7.5;
	scene.add(object);
	isWorldReady[6] = true;
});

loadOBJWithMTL("obj/Tronco/", "Troncoobj.obj", "Troncoobj.mtl", (object) => {
	object.position.x += 9.5;
	scene.add(object);
	isWorldReady[7] = true;
});

loadOBJWithMTL("obj/Nivel_1/", "Suelo_rock.obj", "Suelo_rock.mtl", (object) => {
	object.scale.x = 1;
	object.scale.y = 1;
	object.scale.z = 1;

	scene.add(object);
	isWorldReady[9] = true;
});

loadOBJWithMTL("obj/Nivel_1/", "Suelo_grass.obj", "Suelo_grass.mtl", (object) => {
	object.scale.x = 1;
	object.scale.y = 1;
	object.scale.z = 1;

	scene.add(object);
	isWorldReady[10] = true;
});

loadOBJWithMTL("obj/Nivel_1/Arboles", "pum.obj", "pum.mtl", (object) => {
	object.scale.x = 1;
	object.scale.y = 1;
	object.scale.z = 1;

	scene.add(object);


	ObjetosConColision.push(object);

	
	isWorldReady[11] = true;
});

loadOBJWithMTL("obj/Nivel_1/", "lamparas.obj", "lamparas.mtl", (object) => {
	object.scale.x = 1;
	object.scale.y = 1;
	object.scale.z = 1;

	scene.add(object);
	isWorldReady[13] = true;
});

loadOBJWithMTL("obj/Nivel_1/", "rocas.obj", "rocas.mtl", (object) => {
	object.scale.x = 1;
	object.scale.y = 1;
	object.scale.z = 1;

	scene.add(object);
	isWorldReady[14] = true;
});

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

	if (pitch != chpitch){}
		//console.log(camera);
	if (newmov == "a"){
		squirrel.mesh.rotation.y = 0  ;
		squirrel.mesh.rotation.y -= 1.5708  ;
	}
	else if (newmov == "w"){
		squirrel.mesh.rotation.y = 0  ;
		squirrel.mesh.rotation.y -= 3.14159;
	}
	else if (newmov == "s"){
		squirrel.mesh.rotation.y = 0 ;
	}
	else if (newmov == "d"){
		squirrel.mesh.rotation.y = 0  ;
		squirrel.mesh.rotation.y += 1.5708  ;
	}
	if (newmov2 == "&"){
		squirrelP2.mesh.rotation.y = 0  ;
		squirrelP2.mesh.rotation.y -= 3.14159  ;
	}
	else if (newmov2 == "("){
		squirrelP2.mesh.rotation.y = 0  ;
	}
	else if (newmov2 == "%"){
		squirrelP2.mesh.rotation.y = 0  ;
		squirrelP2.mesh.rotation.y -= 1.5708  ;
	}
	else if (newmov2 == "'"){
		squirrelP2.mesh.rotation.y = 0  ;
		squirrelP2.mesh.rotation.y += 1.5708  ;
	}
	if (jump){
		let t = (Date.now() - ti)/1000;
		var yDis = yi + (vi * t) - (2 * 2 * Math.pow(t, 2));
		if (yDis < yi ){
			jump = false;
		}
		squirrel.mesh.position.y = yDis;
	}

	squirrel.mesh.position.x += sides;
	squirrel.mesh.position.z += updown;

	try {
		if (jump2){
			let t = (Date.now() - ti2)/1000;
			var yDis2 = yi + (vi * t) - (2 * 2 * Math.pow(t, 2));
			if (yDis2 < yi ){
				jump2 = false;
			}
			squirrelP2.mesh.position.y = yDis2;
		}
		squirrelP2.mesh.position.x += sides_p2;
		squirrelP2.mesh.position.z += updown_p2;
	} catch (error) {
		console.log("modo de un jugador");
	}
	


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
	
	if(modo === 'Cooperativo'){
		let puntoM = puntoMedio(squirrel.mesh.position, squirrelP2.mesh.position)
		camera.position.x = puntoM.x;
		camera.position.z = puntoM.y;
	} else {
		camera.position.x = squirrel.mesh.position.x;
		camera.position.z = squirrel.mesh.position.z;
	}
	
	if (isWorldReady[0] ){
		renderer.render( scene, camera );

		// Collision
		for (var i = 0; i < collisionObjects.length; i++) {
				
			var collision = detectCollision(squirrel.mesh, collisionObjects[i]);
			
			if (collision) {
				// Si esta colisionando entonces le asignamos la ultima posicion conocida antes de colisionar
				//aun no implementado, solo muestra en la consola si choca o no
				//squirrel.mesh.translateY(-(forward * deltaTime));
				console.log("colisionando");
				break;
			}

		}
		try {
			for (var i = 0; i < collisionObjects.length; i++) {
				
				var collision2 = detectCollision(squirrelP2.mesh, collisionObjects[i]);
				
				if (collision2) {
					// Si esta colisionando entonces le asignamos la ultima posicion conocida antes de colisionar
					//aun no implementado, solo muestra en la consola si choca o no
					//squirrel.mesh.translateY(-(forward * deltaTime));
					console.log("colisionando player 2");
					break;
				}
	
			}
		} catch (error) {
			
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