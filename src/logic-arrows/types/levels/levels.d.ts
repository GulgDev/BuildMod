import { LevelPage } from '../pages/level-page';
import { PlayerAccess } from '../player/player-access';
import { LevelInfo } from './level-info';
import { LevelOverlayInfo } from './level-overlay-info';
export declare class Levels {
    static readonly levels: Map<number, LevelInfo>;
    static readonly levelOverlayInfos: Map<number, LevelOverlayInfo>;
    static readonly levelInitActions: Map<number, (level: LevelPage) => void>;
    static readonly levelRights: Map<number, PlayerAccess>;
    static completeLevel(levelNumber: number): void;
    static unlockLevel(levelNumber: number): void;
    static startLevel(page: LevelPage): void;
    private static addLevel;
    private static setPreviousLevels;
    private static allPreviousLevelsCompleted;
}
