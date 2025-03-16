import { ArrowData } from '../game-logic/arrow-data';
export declare class PlayerMapAction {
    readonly changedArrows: Map<string, [ArrowData, ArrowData]>;
    constructor();
    addChangedArrow(x: number, y: number, arrowOld: ArrowData, arrowNew: ArrowData): void;
}
