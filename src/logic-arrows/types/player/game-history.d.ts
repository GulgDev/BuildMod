import { ArrowData } from '../game-logic/arrow-data';
import { PlayerMapAction } from './player-map-action';
export declare class GameHistory {
    static readonly MAX_SIZE: number;
    private readonly states;
    private current;
    private lastChangeTime;
    constructor();
    addChange(x: number, y: number, arrowOld: ArrowData, arrowNew: ArrowData): void;
    pushState(state: PlayerMapAction): void;
    undo(): void;
    redo(): void;
    getCurrentState(): PlayerMapAction;
    getIsLastState(): boolean;
}
