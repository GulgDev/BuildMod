import { UIComponent } from './ui-component';
export declare class UIArrowHint extends UIComponent {
    private dialog;
    constructor(parent: HTMLElement);
    show(): void;
    hide(): void;
    toggle(): void;
    getClass(): string;
}
