export declare class OverlayText {
    private text;
    private x;
    private y;
    private width;
    private height;
    private color;
    private textSize;
    private textColor;
    private element;
    constructor(text: string, x: number, y: number, width: number, height: number, textSize: number);
    add(parent: HTMLElement): void;
    update(offset: [number, number], scale: number): void;
    remove(): void;
}
