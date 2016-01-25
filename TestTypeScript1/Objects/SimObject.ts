/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../DefinitelyTyped/tween.js.d.ts" />
/// <reference path="../Root/Root.ts" />

class SimObject {
    // Properties
    root: Root;
    mesh: THREE.Mesh;

    // Constuct / Destruct
    constructor(newRoot: Root) {
        this.root = newRoot;
    }

    // Methods
    update() {
    }
}