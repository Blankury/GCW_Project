export default class Plano {
    constructor() {
        this.plane = null;
    }

    loadMaterials(texturePath, alphaMap) {
        var geometry = new THREE.PlaneGeometry( 1, 1 );
        var texture = new THREE.TextureLoader().load(texturePath);
        var alpha = new THREE.TextureLoader().load(alphaMap);
        var material;
        if (alphaMap === null)
            material = new THREE.MeshPhongMaterial( { map: texture } );
        else
            material = new THREE.MeshPhongMaterial( { map: texture, alphaTest: 1, alphaMap: alpha } );

        this.plane = new THREE.Mesh( geometry, material);

        this.plane.rotation.x += THREE.MathUtils.degToRad(-90);
        this.plane.scale.x = 10;
        this.plane.scale.y = 10;
    }

    loadTerrain(scene, isLoad){
        var terrain = [];
        var posBef = new THREE.Vector3(0, 0, 0);
        var copies = 6;
        var extra = 6;

        scene.add(this.plane);
        
        // Primer cuadrante
        for (let i = 0; i < copies + extra; i++) {
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
            for (let j = 0; j < copies + extra; j++) {
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
        isLoad.push(true);
    }

    loadTrafficPaths(scene, posZ, isLoad) {
        scene.add(this.plane);
        
        this.plane.position.set(0, 0.5, -posZ);
        var posBef = new THREE.Vector3(0, 0, 0);
        var copies = 6;
        for (let i = 0; i < copies; i++) {
            let copyPlane = this.plane.clone();

            copyPlane.position.x -= this.plane.scale.x - posBef.x;
            posBef.x = copyPlane.position.x;
            scene.add(copyPlane);
        }
        posBef = new THREE.Vector3(0, 0, 0);
        for (let i = 0; i < copies; i++) {
            let copyPlane = this.plane.clone();

            copyPlane.position.x += this.plane.scale.x + posBef.x;
            posBef.x = copyPlane.position.x;
            scene.add(copyPlane);
        }
        isLoad.push(true);
    }
}