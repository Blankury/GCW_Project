export class Objeto {
    constructor(position, rotation, scale){
        this.mesh = null;
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

                scene.add(object);
                this.mesh = object;
                isLoad.push(true);
            });

        });
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