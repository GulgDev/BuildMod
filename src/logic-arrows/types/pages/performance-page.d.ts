export declare class PerformancePage {
    private game;
    private canvas;
    private isDeleted;
    private readonly framesTotal;
    private phase;
    private frame;
    private times;
    constructor();
    dispose(): void;
    private start;
    private update;
    private measureUpdate;
    private measureDraw;
}
