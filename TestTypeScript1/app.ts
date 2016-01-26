/// <reference path="Root/Root.ts" />

var root = new Root();
window.onload = () => {
    root.initializeScene();
    animateScene();
};

window.onresize = (event) => {
    root.windowResize();
}

document.addEventListener("keydown", (event) => { /*console.log(event);*/ root.inpMgr.keyPressed(event) });
document.addEventListener("keyup", (event) => { /*console.log(event);*/ root.inpMgr.keyReleased(event) });

function animateScene() {
    root.animateScene();
    requestAnimationFrame(animateScene); 
}

function testClick() {
    alert("testing");
}