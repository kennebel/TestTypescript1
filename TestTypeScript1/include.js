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
/// <reference path="../Objects/SimObject.ts" />
var ObjectManager = (function () {
    function ObjectManager() {
    }
    // Methods
    ObjectManager.prototype.update = function () {
        for (var n in this.objects) {
            n.update();
        }
    };
    return ObjectManager;
})();
/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="ObjectManager.ts" />
var Root = (function () {
    function Root() {
    }
    // Using as a base: http://www.johannes-raida.de/tutorials/three.js/tutorial05/tutorial05.htm
    Root.prototype.initializeScene = function () {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // Set the background color of the renderer to black, with full opacity 
        this.renderer.setClearColor(0x000000, 1);
        this.windowResize();
        // Get the DIV element from the HTML document by its ID and append the renderers DOM 
        // object to it 
        document.getElementById("WebGLCanvas").appendChild(this.renderer.domElement);
        // Create the scene, in which all objects are stored (e. g. camera, lights, 
        // geometries, ...) 
        this.scene = new THREE.Scene();
        // Now that we have a scene, we want to look into it. Therefore we need a camera. 
        // Three.js offers three camera types: 
        //  - PerspectiveCamera (perspective projection) 
        //  - OrthographicCamera (parallel projection) 
        //  - CombinedCamera (allows to switch between perspective / parallel projection 
        //    during runtime) 
        // In this example we create a perspective camera. Parameters for the perspective 
        // camera are ... 
        // ... field of view (FOV), 
        // ... aspect ratio (usually set to the quotient of canvas width to canvas height) 
        // ... near and 
        // ... far. 
        // Near and far define the cliping planes of the view frustum. Three.js provides an 
        // example (http://mrdoob.github.com/three.js/examples/ 
        // -> canvas_camera_orthographic2.html), which allows to play around with these 
        // parameters. 
        // The camera is moved 10 units towards the z axis to allow looking to the center of 
        // the scene. 
        // After definition, the camera has to be added to the scene. 
        this.camera = new THREE.PerspectiveCamera(45, this.canvasWidth / this.canvasHeight, 1, 100);
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);
        this.objMgr = new ObjectManager();
        var pyramidGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, 1, false);
        // Coloring the faces with vertex colors is a bit tricky, but allows us to see how to 
        // loop through the faces and check whether they have three or four vertices. 
        // With a simple 'for'-loop we run through all faces, which are accessed by their index.
        // The 'instanceof' operator gives the possibility to check, whether the current face is 
        // a THREE.Face4 or THREE.Face3. Depending on its object type, we set three or four 
        // vertex colors. For THREE.Face4 we switch the colors of vertex 1 and 2 for every 
        // second face because we want the lower vertices having the same colors as the 
        // neighbour face. Vertex 0 and 3 are the upper vertices, which are always red. 
        // If WebGL isn't supported and the canvas renderer is used, it ignores the vertex 
        // colors. They are only supported by the WebGL renderer (current release of 
        // Three.js: 49). 
        for (var i = 0; i < pyramidGeometry.faces.length; i++) {
            pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
            pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
            pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
        }
        // To activate the vertex color, we have to set 'vertexColors' attribute to 
        // 'THREE.VertexColors'. Otherwise they won't be displayed. 
        // Create a basic material, supporting vertex colors. Activate the 'doubleSided' 
        // attribute to force the rendering of both sides of each face (front and back). 
        // This prevents the so called 'backface culling'. Usually, only the side is 
        // rendered, whose normal vector points towards the camera. The other side is not 
        // rendered (backface culling). But this performance optimization sometimes leads 
        // to wholes in the surface. When this happens in your surface, simply set 
        // 'doubleSided' to 'true'. 
        var pyramidMaterial = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide
        });
        // Create a mesh and insert the geometry and the material. Translate the whole mesh 
        // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene. 
        this.mesh1 = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
        this.mesh1.position.set(-1.5, 0.0, 4.0);
        this.scene.add(this.mesh1);
        // Create the cube 
        // Parameter 1: Width 
        // Parameter 2: Height 
        // Parameter 3: Depth 
        var boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        // Applying different materials to the faces is a more difficult than applying one 
        // material to the whole geometry. We start with creating an array of 
        // THREE.MeshBasicMaterial. 
        // Define six colored materials 
        var boxMaterials = [
            new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
            new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
            new THREE.MeshBasicMaterial({ color: 0x0000FF }),
            new THREE.MeshBasicMaterial({ color: 0xFFFF00 }),
            new THREE.MeshBasicMaterial({ color: 0x00FFFF }),
            new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
        ];
        // Create a MeshFaceMaterial, which allows the cube to have different materials on 
        // each face 
        var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);
        // Create a mesh and insert the geometry and the material. Translate the whole mesh 
        // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene. 
        this.mesh2 = new THREE.Mesh(boxGeometry, boxMaterial);
        this.mesh2.position.set(1.5, 0.0, 4.0);
        this.scene.add(this.mesh2);
    };
    Root.prototype.windowResize = function () {
        // Get the size of the inner window (content area) to create a full size renderer 
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        // Set the renderers size to the content areas size 
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        if (this.camera != null) {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.updateProjectionMatrix();
        }
    };
    Root.prototype.animateScene = function () {
        this.objMgr.update();
        // Increase the y rotation of the triangle 
        this.mesh1.rotation.y += 0.01;
        // Decrease the rotation of the cube 
        this.mesh2.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 0.0075);
        // Map the 3D scene down to the 2D screen (render the frame) 
        this.renderScene();
    };
    Root.prototype.renderScene = function () {
        this.renderer.render(this.scene, this.camera);
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
function animateScene() {
    root.animateScene();
    requestAnimationFrame(animateScene);
}
/// <reference path="../DefinitelyTyped/three.d.ts" />
/// <reference path="SimObject.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestObject = (function (_super) {
    __extends(TestObject, _super);
    function TestObject() {
        _super.apply(this, arguments);
    }
    return TestObject;
})(SimObject);
//# sourceMappingURL=include.js.map