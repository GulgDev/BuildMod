import { UIComponent } from './ui-component';
export declare class UIToolbarItem extends UIComponent {
    private image;
    readonly arrowType: number;
    private mouseCaptured;
    constructor(parent: HTMLElement, indexInToolbar: number, arrowType: number, selectCallback: (type: number) => void);
    setImage(index: number): void;
    activate(): void;
    deactivate(): void;
    getClass(): string;
    isMouseCaptured(): boolean;
    remove(): void;
    private pointerUp;
}
