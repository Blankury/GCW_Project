export default class Plano {
    constructor(texturePath, scene, isLoad) {
        var geometry = new THREE.PlaneGeometry( 1, 1 );
        var texture = new THREE.TextureLoader().load(texturePath);
        var material = new THREE.MeshBasicMaterial( { map: texture } );
        this.plane = new THREE.Mesh( geometry, material );

        this.plane.rotation.x += THREE.MathUtils.degToRad(-90);

        scene.add(this.plane);
        isLoad.push(true);
    }
}