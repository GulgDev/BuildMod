export declare class MouseHandler {
    private readonly rect;
    private mouseX;
    private mouseY;
    private mousePressed;
    private wheelPressed;
    private leftClickCallback;
    private rightClickCallback;
    private wheelAction;
    constructor(canvas: HTMLCanvasElement, leftClickCallback: () => void, rightClickCallback: () => void, wheelAction: (wheel: number) => void);
    dispose(): void;
    getMousePosition(): [number, number];
    getMousePressed(): boolean;
    getWheelPressed(): boolean;
    private mouseMove;
    private mouseDown;
    private mouseUp;
    private wheel;
    private leftClick;
    private rightClick;
    private touchMove;
    private touchStart;
    private touchEnd;
}
