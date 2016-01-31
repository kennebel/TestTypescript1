/// <reference path="TriggerEvent.ts" />

class InputManager {
    // Properties
    root: Root;

    private onKeyDown = new TriggerEvent<string>();
    private onKeyUp = new TriggerEvent<string>();

    constructor(newRoot: Root) {
        this.root = newRoot;
    }

    // Exposed Events
    public get KeyDown(): TriggerEvent<string> { return this.onKeyDown; }
    public get KeyUp(): TriggerEvent<string> { return this.onKeyUp; }

    // Event Handlers
    keyPressed(event: KeyboardEvent) {
        //console.log(" Pressed: " + event.which);

        var key: string = this.keyConvert(event);
        if (this.root.keys.indexOf(key) == -1) {
            this.root.keys.push(key);
            this.onKeyDown.trigger(key);
        }
    }

    keyReleased(event: KeyboardEvent) {
        //console.log("Released: " + event.which);

        var key: string = this.keyConvert(event);
        var index: number = this.root.keys.indexOf(key);
        if (index != -1) {
            this.root.keys.splice(index, 1);
            this.onKeyUp.trigger(key);
        }
    }

    keyConvert(event: KeyboardEvent): string {
        switch (event.which) {
            case 16: return "shift"; break;
            case 17: return "control"; break;
            case 18: return "alt"; break;
            case 37: return "left"; break;
            case 38: return "up"; break;
            case 39: return "right"; break;
            case 40: return "down"; break;
            case 82: return "r"; break;
        }

        return "";
    }
}