/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../Objects/SimObject.ts" />

class ObjectManager {
    // Properties
    objects: SimObject[];

    // Methods
    update() {
        for (var n in this.objects) {
            n.update();
        }
    }
}