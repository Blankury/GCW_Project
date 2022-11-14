export class Objeto {
    constructor(position, rotation, scale){
        this.mesh = new THREE.Group();
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
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
                console.log(this.mesh);
                scene.add(this.mesh);
                
                if (slot === 1)
                    this.loadRandomO(-60, 60, -10, 60, 100, scene);
                if (slot === 2)
                    this.loadRandomO(-60, 60, -10, 60, 50, scene);
                
                if(slot === 'path')
                    this.loadinPath(scene, 10, 6);
                if(slot === 'path2')
                    this.loadinPath(scene, 17, 3);
                if(slot === 'path3')
                    this.loadinPath(scene, 34, 1);


                isLoad.push(true);
                
            });
        });
    }

    loadRandomO(minX, maxX, minZ, maxZ, numCopies, scene){
        minX = Math.ceil(minX);
        maxX = Math.floor(maxX);
        minZ = Math.ceil(minZ);
        maxZ = Math.floor(maxZ);

        for(let i = 0; i < numCopies; i++){
            let X = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            let Z = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;

            let obj = this.mesh.clone();
            obj.position.set(X, this.mesh.position.y, Z);
            scene.add(obj);
        }
    }

    loadinPath(scene, space, copies) {
        //this.mesh.position.set(this.mesh.position.x, 0, this.mesh.position.z);
        var posBef = new THREE.Vector3(0, 0, 0);

        for (let i = 0; i < copies; i++) {
            let copyPlane = this.mesh.clone();

            copyPlane.position.x -= space - posBef.x;
            posBef.x = copyPlane.position.x;
            scene.add(copyPlane);
        }
        posBef = new THREE.Vector3(0, 0, 0);
        for (let i = 0; i < copies; i++) {
            let copyPlane = this.mesh.clone();

            copyPlane.position.x += space + posBef.x;
            posBef.x = copyPlane.position.x;
            scene.add(copyPlane);
        }
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