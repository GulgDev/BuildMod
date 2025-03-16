import { LevelInfo } from '../levels/level-info';
import { LevelOverlayInfo } from '../levels/level-overlay-info';
import { LevelState } from '../levels/level-state';
export declare class OverlayLevel {
    readonly info: LevelInfo;
    readonly overlayInfo: LevelOverlayInfo;
    elementOffset: [number, number];
    private textColor;
    private element;
    private upperDiv;
    private lowerDiv;
    private onLevelClick;
    constructor(info: LevelInfo, overlayInfo: LevelOverlayInfo, onLevelClick: (levelNumber: number) => void);
    setState(state: LevelState): OverlayLevel;
    add(parent: HTMLElement): void;
    update(offset: [number, number], scale: number): void;
    remove(): void;
    private click;
}
