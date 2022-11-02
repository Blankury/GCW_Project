export default function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
    var mtlLoader = new MTLLoader();
    mtlLoader.setPath(path);
    mtlLoader.load(mtlFile, (materials) => {
        
        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(path);
        objLoader.load(objFile, (object) => {
            onLoadCallback(object);
        });

    });
}