import { UIComponent } from './ui-component';
export declare class UIUndoButton extends UIComponent {
    constructor(parent: HTMLElement, onClick: () => void);
    getClass(): string;
}
