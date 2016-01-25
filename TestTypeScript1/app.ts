/// <reference path="Root/Root.ts" />

var root = new Root();
window.onload = () => {
    root.initializeScene();
    animateScene();
};

window.onresize = (event) => {
    root.windowResize();
}

function animateScene() {
    root.animateScene();
    requestAnimationFrame(animateScene); 
}