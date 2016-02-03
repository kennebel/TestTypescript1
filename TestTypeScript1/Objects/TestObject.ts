/// <reference path="../Root/Includes.ts" />

class TestObject extends SimObject {
    // Properties
    //heightUpdater: TWEEN.Tween;

    // Construct / Destruct
    constructor(root: IRoot, startX: number, startHeight?: number) {
        super(root);

        var boxGeometry = new THREE.BoxGeometry(1, 1, 1); 

        //var boxMaterials = [
        //    new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
        //    new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
        //    new THREE.MeshBasicMaterial({ color: 0x0000FF }),
        //    new THREE.MeshBasicMaterial({ color: 0xFFFF00 }),
        //    new THREE.MeshBasicMaterial({ color: 0x00FFFF }),
        //    new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
        //];
        //var boxMaterials = [
        //    new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
        //    new THREE.MeshBasicMaterial({ color: 0xFF00FF }),
        //    new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
        //    new THREE.MeshBasicMaterial({ color: 0xFF00FF }),
        //    new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
        //    new THREE.MeshBasicMaterial({ color: 0xFF00FF })
        //];
        //var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);
        var boxMaterial = new THREE.MeshBasicMaterial({ color: 0x0088FF });
 
        this.mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        //this.mesh = new THREE.Mesh(boxGeometry);
        this.mesh.position.set(startX, 0.0, 0.0);
        this.addMe();

        if (startHeight != undefined) {
            this.setHeight(startHeight);
        }
    }

    // Methods
    setHeight(newHeight: number) {
        this.mesh.scale.set(1, newHeight, 1);
        this.mesh.position.setComponent(1, newHeight / 2);
    }
}