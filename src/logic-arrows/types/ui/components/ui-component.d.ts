export declare abstract class UIComponent {
    protected element: HTMLDivElement;
    protected isRemoved: boolean;
    private mutationObserver;
    constructor(parent: HTMLElement);
    abstract getClass(): string;
    getRect(): DOMRect;
    setVisibility(visible: boolean): void;
    getIsRemoved(): boolean;
    remove(): void;
}
