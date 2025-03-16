import { Arrow } from './arrow';
export declare class LevelArrow {
    readonly type: number;
    readonly x: number;
    readonly y: number;
    arrow: Arrow;
    state: any;
    private action;
    private levelAction;
    private isStateValid;
    constructor(type: number, x: number, y: number, action: (levelArrow: LevelArrow) => boolean);
    setAction(action: (levelArrow: LevelArrow) => boolean): void;
    setLevelAction(levelAction: () => void): void;
    update(): void;
    updateLevel(): void;
    isValid(): boolean;
}
