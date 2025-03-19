import { GameVersion } from "engine/const/game-version";
import { MapEntity } from "engine/entitites/map-entity";
import { Reader } from "engine/util/serialization";
import { Arrow, GameMap } from "logic-arrows";
import { mixin } from "mixin";

mixin("load", () => (map: GameMap, buffer: number[]): void => {
    if (buffer.length < 4) return;

    const reader = new Reader(buffer.slice());

    const version = reader.readU16();
    if (version !== GameVersion.mapFormatVersion)
        throw new Error("Unsupported save version");

    const chunkCount = reader.readU16();
    for (let i = 0; i < chunkCount; i++) {
        const [chunkX, chunkY] = reader.readChunkCoords();
        const arrowTypeCount = reader.readU8() + 1;
        const chunk = map.getOrCreateChunk(chunkX, chunkY);
        for (let j = 0; j < arrowTypeCount; j++) {
            const type = reader.readU8();
            const arrowCount = reader.readU8() + 1;
            for (let k = 0; k < arrowCount; k++) {
                const [arrowX, arrowY] = reader.readArrowPosition();
                const state = reader.readU8();
                const arrow: Arrow = chunk.getArrow(arrowX, arrowY);
                arrow.type = type;
                arrow.rotation = state & 0x3;
                arrow.flipped = !!(state & 0x4);
                arrow.mask = !(state & 0x8);
            }
        }
    }

    if (!reader.available) return;

    const mapMetaVersion = reader.readU16();
    if (mapMetaVersion !== GameVersion.mapMetaFormatVersion)
        throw new Error("Unsupported save version");

    const entityCount = reader.readU16();
    for (let i = 0; i < entityCount; i++)
        MapEntity.deserialize(map, reader);
});