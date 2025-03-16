import { Game } from '../player/game';
export declare class LevelsControls {
    private mouseHandler;
    private mousePosPrev;
    private mousePressedPrev;
    private wheelDelta;
    private game;
    constructor(cnv: HTMLCanvasElement, game: Game);
    update(): void;
    dispose(): void;
    private moveCamera;
    private wheelCallback;
}
