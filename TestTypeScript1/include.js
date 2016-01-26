/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../DefinitelyTyped/tween.js.d.ts" />
/// <reference path="../Root/Root.ts" />
var SimObject = (function () {
    // Constuct / Destruct
    function SimObject(newRoot) {
        this.root = newRoot;
    }
    // Methods
    SimObject.prototype.update = function () {
    };
    return SimObject;
})();
/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../DefinitelyTyped/tween.js.d.ts" />
/// <reference path="../Objects/SimObject.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestObject = (function (_super) {
    __extends(TestObject, _super);
    // Construct / Destruct
    function TestObject(root, startX) {
        _super.call(this, root);
        var boxGeometry = new THREE.BoxGeometry(1, 0.1, 1);
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
        var boxMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
        this.mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        //this.mesh = new THREE.Mesh(boxGeometry);
        this.mesh.position.set(startX, 0.0, 0.0);
        this.root.scene.add(this.mesh);
    }
    return TestObject;
})(SimObject);
/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../Objects/SimObject.ts" />
/// <reference path="../Objects/TestObject.ts" />
var ObjectManager = (function () {
    // Construct / Destruct
    function ObjectManager(newRoot) {
        this.root = newRoot;
        this.objects = new Array();
    }
    // Methods
    ObjectManager.prototype.update = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update();
        }
    };
    ObjectManager.prototype.testInit = function () {
        for (var i = -5; i <= 5; i += 2) {
            this.objects.push(new TestObject(this.root, i));
        }
    };
    return ObjectManager;
})();
var InputManager = (function () {
    function InputManager(newRoot) {
        this.root = newRoot;
    }
    InputManager.prototype.keyPressed = function (event) {
        console.log(" Pressed: " + event.which);
        var key = this.keyConvert(event);
        if (this.root.keys.indexOf(key) == -1) {
            this.root.keys.push(key);
        }
    };
    InputManager.prototype.keyReleased = function (event) {
        console.log("Released: " + event.which);
        var key = this.keyConvert(event);
        var index = this.root.keys.indexOf(key);
        if (index != -1) {
            this.root.keys.splice(index, 1);
        }
    };
    InputManager.prototype.keyConvert = function (event) {
        switch (event.which) {
            case 16:
                return "shift";
                break;
            case 17:
                return "control";
                break;
            case 18:
                return "alt";
                break;
            case 37:
                return "left";
                break;
            case 39:
                return "right";
                break;
        }
        return "";
    };
    return InputManager;
})();
/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="ObjectManager.ts" />
/// <reference path="InputManager.ts" />
var Root = (function () {
    function Root() {
    }
    // Used as a base: http://www.johannes-raida.de/tutorials/three.js/tutorial05/tutorial05.htm
    Root.prototype.initializeScene = function () {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x000000, 1);
        this.windowResize();
        document.getElementById("WebGLCanvas").appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.canvasWidth / this.canvasHeight, 1, 100);
        this.camera.position.set(0, 10, 10);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera);
        this.objMgr = new ObjectManager(this);
        this.objMgr.testInit();
        this.keys = new Array();
        this.inpMgr = new InputManager(this);
    };
    Root.prototype.windowResize = function () {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        if (this.camera != null) {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.updateProjectionMatrix();
        }
    };
    Root.prototype.animateScene = function () {
        this.objMgr.update();
        var step = 0.1;
        if (this.keyActive("shift")) {
            step = 1;
        }
        if (this.keyActive("left")) {
            this.camera.position.x -= step;
            ;
        }
        else if (this.keyActive("right")) {
            this.camera.position.x += step;
        }
        this.renderScene();
    };
    Root.prototype.renderScene = function () {
        this.renderer.render(this.scene, this.camera);
    };
    // Support
    Root.prototype.keyActive = function (checkFor) {
        if (this.keys.indexOf(checkFor) > -1) {
            return true;
        }
        return false;
    };
    return Root;
})();
/// <reference path="Root/Root.ts" />
var root = new Root();
window.onload = function () {
    root.initializeScene();
    animateScene();
};
window.onresize = function (event) {
    root.windowResize();
};
document.addEventListener("keydown", function (event) { root.inpMgr.keyPressed(event); });
document.addEventListener("keyup", function (event) { root.inpMgr.keyReleased(event); });
function animateScene() {
    root.animateScene();
    requestAnimationFrame(animateScene);
}
function testClick() {
    alert("testing");
}
//# sourceMappingURL=include.js.map