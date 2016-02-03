/// <reference path="../Root/Includes.ts" />

class ObjectManager {
    // Properties
    root: IRoot;
    objects: SimObject[];

    // Construct / Destruct
    constructor(newRoot: IRoot) {
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
            this.add(new TestObject(this.root, i, i));
        }
    }

    add(toAdd: SimObject): void {
        this.objects.push(toAdd);
    }

    remove(toRemove: SimObject): void {
        var index: number = this.objects.indexOf(toRemove);
        if (index != -1) {
            this.objects.splice(index, 1);
        }
    }
}