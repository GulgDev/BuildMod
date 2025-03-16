import { UIComponent } from './components/ui-component';
export declare class UIToolbarController extends UIComponent {
    readonly ITEMS_PER_GROUP: number;
    private readonly arrowGroups;
    private currentGroup;
    private activeType;
    private readonly uiToolbar;
    private readonly inventory;
    constructor(arrowGroups: number[][]);
    getClass(): string;
    showInventory(): void;
    hideInventory(): void;
    toggleInventory(): void;
    nextGroup(): void;
    previousGroup(): void;
    getCurrentGroup(): number[];
    activateItem(type: number): void;
    setSelectCallback(callback: (type: number) => void): void;
    isMouseCaptured(): boolean;
    remove(): void;
    private setGroupByType;
}
