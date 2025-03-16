export declare class PlayerAccess {
    arrowGroups: number[][];
    canMove: boolean;
    canZoom: boolean;
    canPause: boolean;
    canOpenMenu: boolean;
    canChangeSpeed: boolean;
    canSetArrows: boolean;
    canDelete: boolean;
    canRotate: boolean;
    canFlip: boolean;
    canSelect: boolean;
    canCopy: boolean;
    canPaste: boolean;
    canPick: boolean;
    canUndo: boolean;
    canClearSignals: boolean;
    canRunOneTick: boolean;
    static makeCopy(origin: PlayerAccess): PlayerAccess;
    static makeLevelSpectator(): Partial<PlayerAccess>;
    static makeSpectator(): Partial<PlayerAccess>;
    static makeOnly(rights: Partial<PlayerAccess>): PlayerAccess;
}
