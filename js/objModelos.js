export class Objeto {
    constructor(position, rotation, scale){
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    load(path, objFile, mtlFile, scene, isLoad) {
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
                scene.add(object);
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

            var obj = this.mesh.clone();
            obj.position.set(X, this.mesh.position.y, Z);
            scene.add(obj);
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