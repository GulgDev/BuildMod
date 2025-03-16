import { LevelState } from './level-state';
export declare class LevelInfo {
    id: number;
    state: LevelState;
    nextLevels: number[];
    previousLevels: number[];
    private stateCallback;
    constructor(id: number, nextLevels: number[]);
    setState(state: LevelState): LevelInfo;
    setCallback(callback: (state: LevelState) => void): void;
}
