import { UIComponent } from './ui-component';
export declare class UIToolbarItemEmpty extends UIComponent {
    private mouseCaptured;
    constructor(parent: HTMLElement);
    getClass(): string;
    isMouseCaptured(): boolean;
    remove(): void;
    private pointerUp;
}
