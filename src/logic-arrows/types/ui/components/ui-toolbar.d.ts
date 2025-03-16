import { UIComponent } from './ui-component';
export declare class UIToolbar extends UIComponent {
    private items;
    private arrowLeft;
    private arrowRight;
    private itemsDiv;
    private mouseCaptured;
    private selectCallback;
    constructor(parent: HTMLElement, group: number, arrowGroups: number[][]);
    setItems(group: number, arrowGroups: number[][]): void;
    activateItem(type: number): void;
    isMouseCaptured(): boolean;
    setSelectCallback(callback: (type: number) => void): void;
    setArrowsCallback(left: () => void, right: () => void): void;
    getClass(): string;
    private setArrows;
}
