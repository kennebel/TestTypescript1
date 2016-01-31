
interface IRoot {
    keys: string[];

    keyActive(checkFor: string): boolean;
    keyDown(pressed: string): void;
    keyUp(pressed: string): void;

    addSimObject(toAdd: SimObject): void;
    removeSimObject(toRemove: SimObject): void;
}
