import { UIComponent } from './ui-component';
export declare class UIRange extends UIComponent {
    private rect;
    private thumbRect;
    private thumb;
    private textElement;
    private mousePressed;
    private mouseOffset;
    private value;
    private maxValue;
    private messageCallback;
    constructor(parent: HTMLElement, maxValue: number, messageCallback?: (value: number) => string);
    getClass(): string;
    isMouseCaptured(): boolean;
    getValue(): number;
    remove(): void;
    private mouseDown;
    private mouseUp;
    private mouseMove;
}
