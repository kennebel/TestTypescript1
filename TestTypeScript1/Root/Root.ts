/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="IRoot.ts" />
/// <reference path="ObjectManager.ts" />
/// <reference path="InputManager.ts" />

class Root implements IRoot {
    /// Properties
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;

    canvasWidth: number;
    canvasHeight: number;

    objMgr: ObjectManager;
    inpMgr: InputManager;
    keys: string[];

    private camDefaultPos: number[];

    /// Construct / Destruct
    // Used as a base: http://www.johannes-raida.de/tutorials/three.js/tutorial05/tutorial05.htm
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true }); 
 
        this.renderer.setClearColor(0x000000, 1); 

        this.windowResize();
 
        document.getElementById("WebGLCanvas").appendChild(this.renderer.domElement); 
 
        this.scene = new THREE.Scene(); 

        this.camDefaultPos = [0, 10, 10];
        this.camera = new THREE.PerspectiveCamera(45, this.canvasWidth / this.canvasHeight, 1, 100);
        this.resetCamera();
        this.scene.add(this.camera); 

        this.objMgr = new ObjectManager(this);
        this.objMgr.testInit();

        this.keys = new Array();
        this.inpMgr = new InputManager(this);
    }

    destructor() {
        
    }

    /// Methods
    windowResize() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight; 

        this.renderer.setSize(this.canvasWidth, this.canvasHeight); 

        if (this.camera != null) {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    animateScene() {
        this.objMgr.update();
        this.update();

        this.renderScene();
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    keyActive(checkFor: string): boolean {
        if (this.keys.indexOf(checkFor) > -1) {
            return true;
        }
        return false;
    }

    keyDown(pressed: string): void {
        switch (pressed) {
            case "r":
                this.resetCamera();
                break;
        }
    }

    keyUp(pressed: string): void {
    }

    addSimObject(toAdd: SimObject): void {
        this.objMgr.add(toAdd);
        this.scene.add(toAdd.mesh);
    }

    removeSimObject(toRemove: SimObject): void {
        this.objMgr.remove(toRemove);
        this.scene.remove(toRemove.mesh);
    }

    /// Support
    resetCamera(): void {
        this.camera.position.set(this.camDefaultPos[0], this.camDefaultPos[1], this.camDefaultPos[2]);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    update() {
        var step: number = 0.1;
        if (this.keyActive("shift")) {
            step = 1;
        }

        if (this.keyActive("left")) {
            this.camera.position.x -= step;;
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
    }
}
