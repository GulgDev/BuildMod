import { Arrow } from './arrow';
import { LevelArrow } from './level-arrow';
export declare class Chunk {
    readonly x: number;
    readonly y: number;
    readonly adjacentChunks: (Chunk | undefined)[];
    readonly levelArrows: Map<number, LevelArrow>;
    private readonly arrows;
    constructor(x: number, y: number);
    getArrow(x: number, y: number): Arrow;
    removeArrow(x: number, y: number): void;
    getLevelArrow(x: number, y: number): LevelArrow | undefined;
    isEmpty(): boolean;
    getArrowTypes(): number[];
    clear(): void;
}
