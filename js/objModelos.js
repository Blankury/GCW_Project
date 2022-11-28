export var collisionObjects = [], puntos = [], monedas = [], llantas = [], escudos = [], autos = [];

export class Objeto {
    constructor(position, rotation, scale) {
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

                if (this.scale.x !== 0)
                    object.scale.set(this.scale.x, this.scale.y, this.scale.z);

                this.mesh = object;

                // City
                if (slot === 'spawnCity') {
                    // Spawn lot
                    this.loadRandomO(-65, -10, -16, 65, 40, scene, slot);
                    this.loadRandomO(10, 65, -16, 65, 50, scene, slot);
                    this.loadRandomO(-8, 8, 15, 65, 20, scene, slot);
                    // Path Spaces
                    this.loadRandomO(-65, 65, -23, -38, 10, scene, slot);
                    this.loadRandomO(-65, 65, -43, -58, 25, scene, slot);
                    //this.loadRandomO(-65, 65, -64, -130, 100, scene, slot);
                    this.loadRandomO(-65, -5, -64, -124, 50, scene, slot);
                    this.loadRandomO(5, 65, -64, -124, 60, scene, slot);
                    this.loadRandomO(-8, 8, -90, -124, 10, scene, slot);
                }
                if (slot === 'spawnDec')
                    this.loadRandRotObj(-10, 10, -16, 16, 5, scene);
                if (slot === 5){
                    this.loadRandomO(-65, -10, -16, 65, 10, scene, slot);
                    this.loadRandomO(10, 65, -16, 65, 5, scene, slot);
                    this.loadRandomO(-8, 8, 15, 65, 2, scene, slot);
                    // Path Spaces
                    this.loadRandomO(-65, 65, -23, -38, 5, scene, slot);
                    this.loadRandomO(-65, 65, -43, -58, 5, scene, slot);
                    //this.loadRandomO(-65, 65, -64, -130, 100, scene, slot);
                    this.loadRandomO(-65, -5, -64, -124, 10, scene, slot);
                    this.loadRandomO(5, 65, -64, -124, 3, scene, slot);
                    this.loadRandomO(-8, 8, -90, -124, 10, scene, slot);
                }

                // Snow City
                if (slot === 'spawnSnowCity') {
                    // Spawn lot
                    this.loadRandomO(-65, -10, -16, 65, 60, scene, slot);
                    this.loadRandomO(10, 65, -16, 65, 75, scene, slot);
                    this.loadRandomO(-8, 8, 15, 65, 20, scene, slot);
                    // Path Spaces
                    this.loadRandomO(-65, 65, -24, -27, 10, scene, slot);
                    this.loadRandomO(-65, 65, -34, -47, 25, scene, slot);
                    // Last lot
                    this.loadRandomO(-65, -5, -54, -124, 60, scene, slot);
                    this.loadRandomO(5, 65, -54, -124, 80, scene, slot);
                    this.loadRandomO(-8, 8, -90, -124, 10, scene, slot);
                }
                if (slot === 'spawnDecSC')
                    this.loadRandRotObj(-65, 65, -14, 65, 50, scene);
                if (slot === 'lights') {
                    this.loadPath(scene, 10, 6, false, this.position.z);
                    this.loadPath(scene, 10, 6, false, -25.5);
                    this.loadPath(scene, 10, 6, false, -34);
                    this.loadPath(scene, 10, 6, false, -46);
                    this.loadPath(scene, 10, 6, false, -56);
                }

                // Night Beach City
                if (slot === 'spawnBeachCity') {
                    // Spawn lot
                    this.loadRandomO(-65, -10, -16, 65, 8, scene, slot);
                    this.loadRandomO(10, 65, -16, 65, 8, scene, slot);
                    this.loadRandomO(-8, 8, 15, 65, 3, scene, slot);
                    // Path Spaces
                    //this.loadRandomO(-65, 65, -24, -27, 10, scene, slot);
                    this.loadRandomO(-65, 65, -34, -66, 25, scene, slot);
                    // Last lot
                    this.loadRandomO(-65, 65, -84, -124, 20, scene, slot);
                    //this.loadRandomO(5, 65, -84, -124, 8, scene, slot);
                    //this.loadRandomO(-8, 8, -100, -124, 5, scene, slot);
                }
                
                if (slot === 'path')
                    this.loadPath(scene, 10, 6, true, this.position.z);
                if (slot === 'path2')
                    this.loadPath(scene, 17, 3, true, this.position.z);
                if (slot === 'path3')
                    this.loadPath(scene, 34, 1, true, this.position.z);


                isLoad.push(true);

            });
        });
    }

    loadRandomO(minX, maxX, minZ, maxZ, numCopies, scene, slot) {
        minX = Math.ceil(minX);
        maxX = Math.floor(maxX);
        minZ = Math.ceil(minZ);
        maxZ = Math.floor(maxZ);

        for (let i = 0; i < numCopies; i++) {
            let X = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            let Z = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;
            
            let obj = this.mesh.clone();
            obj.position.set(X, this.mesh.position.y, Z);
        
            if ((X < 46 && X > -44)&&(Z < 30 && Z > -70))
                collisionObjects.push(obj);
            else if (slot === 9) {
                autos.push(obj);
            }
            else {
                //collisionObjects.push(obj);
            }

            scene.add(obj);
        }
    }

    loadPath(scene, space, copies, obstacles, z) {
        this.mesh.position.z = z;
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
            if (obstacles)
                autos.push(e);
            scene.add(e);
        });

        //console.log(this);
    }

    loadRandRotObj(minX, maxX, minZ, maxZ, numCopies, scene) {
        minX = Math.ceil(minX);
        maxX = Math.floor(maxX);
        minZ = Math.ceil(minZ);
        maxZ = Math.floor(maxZ);

        for (let i = 0; i < numCopies; i++) {
            let X = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            let Z = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;

            let r = Math.floor(Math.random() * 4);
            //console.log(r);
            let RY;
            switch (r) {
                case 0:
                    RY = THREE.MathUtils.degToRad(0);
                    break;
                case 1:
                    RY = THREE.MathUtils.degToRad(90);
                    break;
                case 2:
                    RY = THREE.MathUtils.degToRad(180);
                    break;
                case 3:
                    RY = THREE.MathUtils.degToRad(180 + 90);
                    break;
            }
            let obj = this.mesh.clone();
            obj.position.set(X, this.mesh.position.y, Z);
            obj.rotation.y = RY;

            scene.add(obj);
        }
    }

    update(worldSize) {
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
            if (e.position.x > worldSize) {
                e.position.x = -worldSize;
            } else if (e.position.x < -worldSize && this.vel < 0) {
                e.position.x = worldSize;
            }
        });
    }


    Remover(scene, pts) {
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