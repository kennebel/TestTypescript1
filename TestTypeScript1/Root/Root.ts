/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="ObjectManager.ts" />
/// <reference path="InputManager.ts" />

class Root {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;

    canvasWidth: number;
    canvasHeight: number;

    objMgr: ObjectManager;
    inpMgr: InputManager;
    keys: string[];

    // Used as a base: http://www.johannes-raida.de/tutorials/three.js/tutorial05/tutorial05.htm
    initializeScene() {
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
    }

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

        this.renderScene();
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    // Support
    keyActive(checkFor: string): boolean {
        if (this.keys.indexOf(checkFor) > -1) {
            return true;
        }
        return false;
    }
}