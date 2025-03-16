import { Arrow } from "./types/game-logic/arrow";
import { Chunk } from "./types/game-logic/chunk";
import { ChunkUpdates } from "./types/game-logic/chunk-updates";
import { CELL_SIZE, CHUNK_SIZE } from "./types/game-logic/game-constants";
import { Game } from "./types/player/game";
import { PlayerSettings } from "./types/player/player-settings";
import { Render } from "./types/rendering/render";
import { ArrowShader } from "./types/rendering/shaders/arrow-shader";
import { BackgroundShader } from "./types/rendering/shaders/background-shader";

export namespace LogicArrows {
    export const _: undefined = undefined;
};

export declare namespace LogicArrows {
    export {
        Arrow,
        Chunk,
        ChunkUpdates,
        CELL_SIZE, CHUNK_SIZE,
        Game,
        PlayerSettings,
        Render,
        ArrowShader,
        BackgroundShader
    };
};