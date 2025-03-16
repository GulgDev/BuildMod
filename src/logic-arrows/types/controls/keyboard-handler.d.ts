export declare class KeyboardHandler {
    private readonly keys;
    private readonly chars;
    private readonly keyDownCallback;
    private readonly keyUpCallback;
    constructor(keyDownCallback: ((code: string, key: string) => void), keyUpCallback: ((code: string) => void));
    dispose(): void;
    getKeyPressed(code: string): boolean;
    getShiftPressed(): boolean;
    getCtrlPressed(): boolean;
    getCharPressed(code: string): boolean;
    private keyDown;
    private keyUp;
}
