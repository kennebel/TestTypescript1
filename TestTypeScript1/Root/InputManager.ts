
class InputManager {
    // Properties
    root: Root;

    constructor(newRoot: Root) {
        this.root = newRoot;
    }

    keyPressed(event: KeyboardEvent) {
        console.log(" Pressed: " + event.which);

        var key: string = this.keyConvert(event);
        if (this.root.keys.indexOf(key) == -1) {
            this.root.keys.push(key);
        }
    }

    keyReleased(event: KeyboardEvent) {
        console.log("Released: " + event.which);

        var key: string = this.keyConvert(event);
        var index: number = this.root.keys.indexOf(key);
        if (index != -1) {
            this.root.keys.splice(index, 1);
        }
    }

    keyConvert(event: KeyboardEvent): string {
        switch (event.which) {
            case 16: return "shift"; break;
            case 17: return "control"; break;
            case 18: return "alt"; break;
            case 37: return "left"; break;
            case 39: return "right"; break;
        }

        return "";
    }
}