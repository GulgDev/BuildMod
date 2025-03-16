import { Page } from './page';
export declare class LevelsPage extends Page {
    private game;
    private levelsUI;
    private levelsControls;
    private playerOverlay;
    private levelOverlays;
    private onLevelClick;
    constructor(onLevelClick: (levelNumber: number) => void, parent?: HTMLElement | undefined);
    getClass(): string;
    dispose(): void;
    private makeMap;
    private focusOnLevel;
    private addLevelOverlay;
    private makeRedArrows;
    private makeObliqueArrows;
    private makeBlueArrows;
    private resize;
    private updateMap;
    private update;
}
