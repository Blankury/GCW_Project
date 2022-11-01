//import * as THREE from '../node_modules/three/build/three.module.js';
// import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/MTLLoader.js';
// import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/OBJLoader.js';

import {MTLLoader} from '../node_modules/three/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from '../node_modules/three/examples/jsm/loaders/OBJLoader.js';

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