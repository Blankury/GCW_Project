export default class Plano {
    constructor(texturePath, scene, isLoad) {
        var geometry = new THREE.PlaneGeometry( 1, 1 );
        var texture = new THREE.TextureLoader().load(texturePath);
        var material = new THREE.MeshBasicMaterial( { map: texture } );
        this.plane = new THREE.Mesh( geometry, material );

        
        this.plane.rotation.x += THREE.MathUtils.degToRad(-90);
        this.plane.scale.x = 10;
        this.plane.scale.y = 10;

        scene.add(this.plane);
        isLoad.push(true);
    }

    loadTerrain(scene){
        var terrain = [];
        var posBef = new THREE.Vector3(0, 0, 0);
        var copies = 6;

        // Primer cuadrante
        for (let i = 0; i < copies; i++) {
            let copyPlaneUp = this.plane.clone();
            terrain.push(copyPlaneUp);
            copyPlaneUp.position.z -=  this.plane.scale.x - posBef.z;
            posBef.z = copyPlaneUp.position.z;
            scene.add(copyPlaneUp);
            for (let j = 0; j < copies; j++) {
                let copyPlane = copyPlaneUp.clone();
                terrain.push(copyPlane);
                copyPlane.position.x +=  this.plane.scale.x + posBef.x;
                posBef.x = copyPlane.position.x;
                scene.add(copyPlane);
            }
            posBef = new THREE.Vector3(0, 0, posBef.z);
        }
        console.log(terrain);
        // Tercer cuadrante
        posBef = new THREE.Vector3(0, 0, 0);
        for (let i = 0; i < copies; i++) {
            let copyPlaneDown = this.plane.clone();
            terrain.push(copyPlaneDown);
            copyPlaneDown.position.z +=  this.plane.scale.x + posBef.z;
            posBef.z = copyPlaneDown.position.z;
            scene.add(copyPlaneDown);
            for (let j = 0; j < copies; j++) {
                let copyPlane = copyPlaneDown.clone();
                terrain.push(copyPlane);
                copyPlane.position.x -=  this.plane.scale.x - posBef.x;
                posBef.x = copyPlane.position.x;
                scene.add(copyPlane);
            }
            posBef = new THREE.Vector3(0, 0, posBef.z);
        }
        posBef = new THREE.Vector3(0, 0, 0);
        // Cuarto cuadrante
        for (let i = 0; i < copies; i++) {
            let copyPlane = this.plane.clone();
            terrain.push(copyPlane);
            copyPlane.position.x -= this.plane.scale.x - posBef.x;
            posBef.x = copyPlane.position.x;
            scene.add(copyPlane);
            for (let j = 0; j < copies; j++) {
                let copyPlaneUp = copyPlane.clone();
                terrain.push(copyPlaneUp);
                copyPlaneUp.position.z -= this.plane.scale.x - posBef.z;
                posBef.z = copyPlaneUp.position.z;
                scene.add(copyPlaneUp);
            }
            posBef = new THREE.Vector3(posBef.x, 0, 0);
        }
        // Segundo cuadrante
        posBef = new THREE.Vector3(0, 0, 0);
        for (let i = 0; i < copies; i++) {
            let copyPlane = this.plane.clone();
            terrain.push(copyPlane);
            copyPlane.position.x += this.plane.scale.x + posBef.x;
            posBef.x = copyPlane.position.x;
            scene.add(copyPlane);
            for (let j = 0; j < copies; j++) {
                let copyPlaneDown = copyPlane.clone();
                terrain.push(copyPlaneDown);
                copyPlaneDown.position.z += this.plane.scale.x + posBef.z;
                posBef.z = copyPlaneDown.position.z;
                scene.add(copyPlaneDown);
            }
            posBef = new THREE.Vector3(posBef.x, 0, 0);
        }
        
    }

}