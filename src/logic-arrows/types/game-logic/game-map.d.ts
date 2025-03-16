import { Arrow } from './arrow';
import { Chunk } from './chunk';
import { LevelArrow } from './level-arrow';
export declare class GameMap {
    readonly chunks: Map<string, Chunk>;
    constructor();
    setArrowType(x: number, y: number, type: number, player?: boolean): void;
    setArrowSignal(x: number, y: number, signal: number): void;
    setArrowRotation(x: number, y: number, rotation: number, player?: boolean): void;
    setArrowFlipped(x: number, y: number, flipped: boolean, player?: boolean): void;
    getArrowType(x: number, y: number): number;
    resetArrow(x: number, y: number, player?: boolean): void;
    removeArrow(x: number, y: number, player?: boolean): void;
    getArrow(x: number, y: number): Arrow | undefined;
    getChunk(x: number, y: number): Chunk | undefined;
    getOrCreateChunk(x: number, y: number): Chunk;
    clear(): void;
    getChunkByArrowCoordinates(x: number, y: number): Chunk | undefined;
    clearChunkIfEmpty(chunk: Chunk): void;
    setLevelArrow(levelArrow: LevelArrow): void;
    private getOrCreateChunkByArrowCoordinates;
    private getArrowForEditing;
}
