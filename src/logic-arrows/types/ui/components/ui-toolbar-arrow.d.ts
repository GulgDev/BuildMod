import { UIComponent } from './ui-component';
type ToolbarArrowType = 'left' | 'right';
export declare class UIToolbarArrow extends UIComponent {
    private type;
    constructor(parent: HTMLElement, type: ToolbarArrowType);
    setCallback(callback: () => void): void;
    toggle(state: boolean): void;
    getClass(): string;
}
export {};
