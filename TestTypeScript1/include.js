/// <reference path="Includes.ts" />
var InputManager = (function () {
    function InputManager(newRoot) {
        this.root = newRoot;
    }
    // Event Handlers
    InputManager.prototype.keyPressed = function (event) {
        //console.log(" Pressed: " + event.which);
        var key = this.keyConvert(event);
        if (this.root.keys.indexOf(key) == -1) {
            this.root.keys.push(key);
            this.root.keyDown(key);
        }
    };
    InputManager.prototype.keyReleased = function (event) {
        //console.log("Released: " + event.which);
        var key = this.keyConvert(event);
        var index = this.root.keys.indexOf(key);
        if (index != -1) {
            this.root.keys.splice(index, 1);
            this.root.keyUp(key);
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
            case 38:
                return "up";
                break;
            case 39:
                return "right";
                break;
            case 40:
                return "down";
                break;
            case 82:
                return "r";
                break;
        }
        return "";
    };
    return InputManager;
})();
/// <reference path="../Root/Includes.ts" />
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
            this.add(new TestObject(this.root, i, i));
        }
    };
    ObjectManager.prototype.add = function (toAdd) {
        this.objects.push(toAdd);
    };
    ObjectManager.prototype.remove = function (toRemove) {
        var index = this.objects.indexOf(toRemove);
        if (index != -1) {
            this.objects.splice(index, 1);
        }
    };
    return ObjectManager;
})();
/// <reference path="../Root/Includes.ts" />
var SimObject = (function () {
    // Constuct / Destruct
    function SimObject(newRoot) {
        this.root = newRoot;
    }
    // Methods
    SimObject.prototype.update = function () {
    };
    SimObject.prototype.addMe = function () {
        this.root.addSimObject(this);
    };
    SimObject.prototype.removeMe = function () {
        this.root.removeSimObject(this);
    };
    return SimObject;
})();
/// <reference path="../Root/Includes.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestObject = (function (_super) {
    __extends(TestObject, _super);
    // Properties
    //heightUpdater: TWEEN.Tween;
    // Construct / Destruct
    function TestObject(root, startX, startHeight) {
        _super.call(this, root);
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
    TestObject.prototype.setHeight = function (newHeight) {
        this.mesh.scale.set(1, newHeight, 1);
        this.mesh.position.setComponent(1, newHeight / 2);
    };
    return TestObject;
})(SimObject);
/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="../DefinitelyTyped/tween.js.d.ts" />
/// <reference path="../Root/IRoot.ts" />
/// <reference path="../Root/Root.ts" />
/// <reference path="../Root/InputManager.ts" />
/// <reference path="../Root/ObjectManager.ts" />
/// <reference path="../Objects/SimObject.ts" />
/// <reference path="../Objects/TestObject.ts" />
/// <reference path="Includes.ts" />
var Root = (function () {
    /// Construct / Destruct
    // Used as a base: http://www.johannes-raida.de/tutorials/three.js/tutorial05/tutorial05.htm
    function Root(options) {
        options = this.setDefaults(options);
        this.container = document.getElementById(options.container);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor(0x000000, 0);
        this.windowResize();
        this.container.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camDefaultPos = options.camPosition;
        if (options.camIsPerspective) {
            this.camera = new THREE.PerspectiveCamera(options.fov, this.canvasWidth / this.canvasHeight, 1, 100);
        }
        else {
        }
        this.resetCamera();
        this.scene.add(this.camera);
        this.objMgr = new ObjectManager(this);
        this.keys = new Array();
        this.inpMgr = new InputManager(this);
    }
    Root.prototype.setDefaults = function (options) {
        if (options == undefined) {
            options = {};
        }
        if (options.container == undefined || options.container.trim() == "") {
            options.container = "WebGLCanvas";
        }
        if (options.fov == undefined) {
            options.fov = 45;
        }
        if (options.camPosition == undefined) {
            options.camPosition = new THREE.Vector3(0, 10, 10);
        }
        if (options.camIsPerspective == undefined) {
            options.camIsPerspective = true;
        }
        return options;
    };
    Root.prototype.destructor = function () {
    };
    /// Methods
    Root.prototype.windowResize = function () {
        this.canvasWidth = this.container.offsetWidth;
        this.canvasHeight = this.container.offsetHeight;
        //console.log("Width x Height: " + this.canvasWidth + "," + this.canvasHeight);
        // Used instead when you just want full screen
        //this.canvasWidth = window.innerWidth;
        //this.canvasHeight = window.innerHeight; 
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        if (this.camera != null) {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.updateProjectionMatrix();
        }
        //if (!skipRezoom) {
        //    if (this.resizeTO) clearTimeout(this.resizeTO);
        //    this.resizeTO = setTimeout(function () {
        //        root.resizeEnd();
        //    }, 500);
        //}
    };
    Root.prototype.animateScene = function () {
        this.objMgr.update();
        this.update();
        this.renderScene();
    };
    Root.prototype.renderScene = function () {
        this.renderer.render(this.scene, this.camera);
    };
    Root.prototype.keyActive = function (checkFor) {
        if (this.keys.indexOf(checkFor) > -1) {
            return true;
        }
        return false;
    };
    Root.prototype.keyDown = function (pressed) {
        switch (pressed) {
            case "r":
                this.resetCamera();
                break;
        }
    };
    Root.prototype.keyUp = function (pressed) {
    };
    Root.prototype.addSimObject = function (toAdd) {
        this.objMgr.add(toAdd);
        this.scene.add(toAdd.mesh);
    };
    Root.prototype.removeSimObject = function (toRemove) {
        this.objMgr.remove(toRemove);
        this.scene.remove(toRemove.mesh);
    };
    Root.prototype.resetCamera = function () {
        this.camera.position.set(this.camDefaultPos.x, this.camDefaultPos.y, this.camDefaultPos.z);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    };
    Root.prototype.update = function () {
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
        if (this.keyActive("up")) {
            this.camera.position.z -= step;
        }
        else if (this.keyActive("down")) {
            this.camera.position.z += step;
        }
    };
    // Testing
    Root.prototype.testInit = function () {
        this.objMgr.testInit();
    };
    return Root;
})();
/// <reference path="Root/Root.ts" />
var root;
var settings = {};
window.onload = function () {
    root = new Root(settings);
    root.testInit();
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
    console.log("testing");
}
//interface ITriggerEvent<T> {
//    on(handler: { (data?: T): void });
//    off(handler: { (data?: T): void });
//}
///// <see cref="http://stackoverflow.com/a/14657922/2577071">
//class TriggerEvent<T> implements ITriggerEvent<T> {
//    private handlers: { (data?: T): void; }[] = [];
//    public on(handler: { (data?: T): void }) {
//        this.handlers.push(handler);
//    }
//    public off(handler: { (data?: T): void }) {
//        this.handlers = this.handlers.filter(h => h !== handler);
//    }
//    public trigger(data?: T) {
//        this.handlers.slice(0).forEach(h => h(data));
//    }
//} 
//# sourceMappingURL=include.js.map