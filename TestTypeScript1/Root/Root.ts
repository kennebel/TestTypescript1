/// <reference path="Includes.ts" />

interface IRootOptions {
    container?: string;
    fov?: number;
    camPosition?: THREE.Vector3;
    camIsPerspective?: boolean;
}

class Root implements IRoot {
    /// Properties
    container: HTMLElement;

    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;

    canvasWidth: number;
    canvasHeight: number;

    objMgr: ObjectManager;
    inpMgr: InputManager;
    keys: string[];

    private camDefaultPos: THREE.Vector3;
    private resizeTO: any;

    /// Construct / Destruct
    // Used as a base: http://www.johannes-raida.de/tutorials/three.js/tutorial05/tutorial05.htm
    constructor(options?: IRootOptions) {
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
            //this.camera = new THREE.OrthographicCamera(0.5 * this.canvasWidth / - 2, 0.5 * this.canvasWidth / 2, this.canvasHeight / 2, this.canvasHeight / - 2, 1, 100);
        }
        this.resetCamera();
        this.scene.add(this.camera); 

        this.objMgr = new ObjectManager(this);

        this.keys = new Array();
        this.inpMgr = new InputManager(this);
    }

    private setDefaults(options: IRootOptions): IRootOptions {
        if (options == undefined) {
            options = {};
        }

        if (options.container == undefined || options.container.trim() == "") { options.container = "WebGLCanvas"; }
        if (options.fov == undefined) { options.fov = 45; }
        if (options.camPosition == undefined) { options.camPosition = new THREE.Vector3(0, 10, 10); }
        if (options.camIsPerspective == undefined) { options.camIsPerspective = true; }

        return options;
    }

    destructor() {
        
    }

    /// Methods
    windowResize() {
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
    }

    animateScene() {
        this.objMgr.update();
        this.update();

        this.renderScene();
    }

    private renderScene() {
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

    resetCamera(): void {
        this.camera.position.set(this.camDefaultPos.x, this.camDefaultPos.y, this.camDefaultPos.z);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    private update() {
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

    // Testing
    testInit() {
        this.objMgr.testInit();
    }
}
