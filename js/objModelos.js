export var collisionObjects = [], puntos = [], monedas = [], llantas = [], escudos = [], autos = [];

export class Objeto {
    constructor(position, rotation, scale){
        this.mesh = new THREE.Group();
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.copies = [];
        this.vel = 0;
    }

    load(path, objFile, mtlFile, scene, isLoad, slot) {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath(path);
        mtlLoader.load(mtlFile, (materials) => {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(path);
            objLoader.load(objFile, (object) => {
                object.position.x = this.position.x;
                object.position.y = this.position.y;
                object.position.z = this.position.z;

                object.rotation.x = this.rotation.x;
                object.rotation.y = this.rotation.y;
                object.rotation.z = this.rotation.z;

                this.mesh = object;
                scene.add(this.mesh);
                //console.log(this.mesh);
                
                if (slot === 1)
                    this.loadRandomO(-60, 60, -10, 60, 100, scene, slot);
                if (slot === 2)
                    this.loadRandomO(-60, 60, -10, 60, 50, scene, slot);
                if (slot === 5)
                    this.loadRandomO(-60, 60, -10, 30, 8, scene, slot);
                if (slot === 6)
                this.loadRandomO(-60, 60, -10, 30, 8, scene, slot);
                if (slot === 7)
                this.loadRandomO(-60, 60, -10, 30, 8, scene, slot);
                
                if(slot === 'path')
                    this.loadPath(scene, 10, 6);
                if(slot === 'path2')
                    this.loadPath(scene, 17, 3);
                if(slot === 'path3')
                    this.loadPath(scene, 34, 1);


                isLoad.push(true);
                
            });
        });
    }

    loadRandomO(minX, maxX, minZ, maxZ, numCopies, scene, slot){

        
        minX = Math.ceil(minX);
        maxX = Math.floor(maxX);
        minZ = Math.ceil(minZ);
        maxZ = Math.floor(maxZ);

        for(let i = 0; i < numCopies; i++){
            let X = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            let Z = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;

            let obj = this.mesh.clone();
            obj.position.set(X, this.mesh.position.y, Z);

            if (slot === 5){
                puntos.push(obj);
            } 
            else if (slot === 6){
                monedas.push(obj);
            } 
            else if (slot === 7){
                llantas.push(obj);
            }
            else if (slot === 8){
                escudos.push(obj);
            }
            else if (slot === 9){
                autos.push(obj);
            }  
            else{
                collisionObjects.push(obj);
            }

            scene.add(obj);
        }
    }

    loadPath(scene, space, copies) {
        //this.mesh.position.set(this.mesh.position.x, 0, this.mesh.position.z);
        var posBef = new THREE.Vector3(0, 0, 0);

        for (let i = 0; i < copies; i++) {
            let copyPlane = this.mesh.clone();
            copyPlane.position.x -= space - posBef.x;
            posBef.x = copyPlane.position.x;

            this.copies.push(copyPlane);
        }
        posBef = new THREE.Vector3(0, 0, 0);
        for (let i = 0; i < copies; i++) {
            let copyPlane = this.mesh.clone();
            copyPlane.position.x += space + posBef.x;
            posBef.x = copyPlane.position.x;

            this.copies.push(copyPlane);
            //scene.add(copyPlane);
            //this.mesh.add(copyPlane);
        }
        this.copies.forEach(e => {
            autos.push(e);
            scene.add(e);
        });
        
        console.log(this);
    }

    update(worldSize){
        this.mesh.position.x += this.vel;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;
        if (this.mesh.position.x > worldSize)
            this.mesh.position.x = -worldSize;
        else if (this.mesh.position.x < -worldSize && this.vel < 0)
            this.mesh.position.x = worldSize;
        this.copies.forEach(e => {
            e.position.x += this.vel;
            e.position.y = this.position.y;
            e.position.z = this.position.z;
            if(e.position.x > worldSize){
                e.position.x = -worldSize;
            } else if (e.position.x < -worldSize && this.vel < 0){
                e.position.x = worldSize;
            }
        });
    }


    Remover(scene, pts){
        //this.copies.forEach(e => {
          //  autos.push(e);
            //scene.add(e);
       // });

    }
}

export default function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(path);
    mtlLoader.load(mtlFile, (materials) => {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(path);
        objLoader.load(objFile, (object) => {
            onLoadCallback(object);
        });

    });
}