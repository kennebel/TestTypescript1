/// <reference path="Root/Root.ts" />

var root = new Root();
window.onload = () => {
    root.initializeScene();
    animateScene();
};

function animateScene() {
    root.animateScene();
    requestAnimationFrame(animateScene); 
}