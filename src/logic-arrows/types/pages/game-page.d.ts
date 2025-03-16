import { MapInfo } from '../game-logic/map-info';
export declare class GamePage {
    private game;
    private playerUI;
    private playerControls;
    private playerOverlay;
    private canvasDiv;
    private isDeleted;
    private mapInfo;
    private readonly history;
    private saveInterval;
    constructor(mapInfo: MapInfo);
    dispose(): Promise<void>;
    private resize;
    private update;
    private autosave;
    private saveMap;
}
