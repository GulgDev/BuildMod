import { OverlayLevel } from '../overlay/overlay-level';
import { Game } from './game';
export declare class PlayerOverlay {
    private overlayTexts;
    private overlayLevels;
    private canvasDiv;
    private game;
    constructor(canvasDiv: HTMLDivElement, game: Game);
    addText(text: string, x: number, y: number, width: number, height: number, textSize: number): void;
    addLevel(overlayLevel: OverlayLevel): void;
    update(): void;
    resize(): void;
    dispose(): void;
}
