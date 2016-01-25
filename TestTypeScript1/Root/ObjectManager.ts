/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../Objects/SimObject.ts" />
/// <reference path="../Objects/TestObject.ts" />

class ObjectManager {
    // Properties
    //objects: SimObject[];
    objects: TestObject[];
    root: Root;

    // Construct / Destruct
    constructor(newRoot: Root) {
        this.root = newRoot;

        this.objects = new Array();
    }

    // Methods
    update() {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update();
        }
    }

    testInit() {
        for (var i = -5; i <= 5; i += 2) {
            this.objects.push(new TestObject(this.root, i));
        }
    }
}