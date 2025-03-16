import { Arrow } from './arrow';
import { GameMap } from './game-map';
export declare namespace ChunkUpdates {
    function update(map: GameMap): void;
    function wasArrowChanged(arrow: Arrow): boolean;
    function clearSignals(map: GameMap): void;
}
