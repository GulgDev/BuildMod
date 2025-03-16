export declare abstract class Page {
    protected mainDiv: HTMLDivElement;
    protected isDeleted: boolean;
    constructor(parent?: HTMLElement);
    abstract getClass(): string;
    dispose(): void;
}
