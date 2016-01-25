/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../DefinitelyTyped/tween.js.d.ts" />
/// <reference path="../Objects/SimObject.ts" />

class TestObject extends SimObject {
    // Properties
    heightUpdater: TWEEN.Tween;

    // Construct / Destruct
    constructor(root: Root, startX: number) {
        super(root);

        var boxGeometry = new THREE.BoxGeometry(1, 0.1, 1); 

        //var boxMaterials = [
        //    new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
        //    new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
        //    new THREE.MeshBasicMaterial({ color: 0x0000FF }),
        //    new THREE.MeshBasicMaterial({ color: 0xFFFF00 }),
        //    new THREE.MeshBasicMaterial({ color: 0x00FFFF }),
        //    new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
        //];
        //var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);
        //var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
 
        //this.mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        this.mesh = new THREE.Mesh(boxGeometry);
        this.mesh.position.set(startX, 0.0, 0.0);
        this.root.scene.add(this.mesh);
    }

    // Methods
}