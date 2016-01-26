/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="ObjectManager.ts" />
/// <reference path="InputManager.ts" />

class Root {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;

    canvasWidth: number;
    canvasHeight: number;

    //mesh1: THREE.Mesh;
    //mesh2: THREE.Mesh;

    objMgr: ObjectManager;
    inpMgr: InputManager;
    keys: string[];

    // Using as a base: http://www.johannes-raida.de/tutorials/three.js/tutorial05/tutorial05.htm
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

        if (this.keys.indexOf("left") > -1) {
            this.camera.position.x += -1;
        }
        else if (this.keys.indexOf("right") > -1) {
            this.camera.position.x += 1;
        }

        this.renderScene();
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }
}