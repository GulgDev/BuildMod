import { UIComponent } from './ui-component';
export declare class UIInventory extends UIComponent {
    private dialog;
    private itemsBlock;
    private selectCallback;
    private arrowGroups;
    private arrows;
    constructor(parent: HTMLElement);
    show(): void;
    hide(): void;
    toggle(): void;
    setSelectCallback(callback: (type: number) => void): void;
    addArrows(arrowGroups: number[][]): void;
    updateSelected(selected: number): void;
    getClass(): string;
}
