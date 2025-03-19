import { MapEntity } from "engine/entitites/map-entity";
import { Reader } from "engine/util/serialization";
import { Arrow, Chunk, GameMap } from "logic-arrows";
import { mixin } from "mixin";

mixin("load", () => (map: GameMap, buffer: number[]): void => {
    if (buffer.length < 4) return;
    let index: number = 0;
    let version: number = buffer[index++];
    version |= buffer[index++] << 8;
    if (version !== 0) {
        throw new Error('Unsupported save version');
    }
    let chunksCount: number = buffer[index++];
    chunksCount |= buffer[index++] << 8;
    for (let i: number = 0; i < chunksCount; i++) {
        let chunkX: number = buffer[index++];
        chunkX |= (buffer[index++] & 0x7F) << 8;
        if ((buffer[index - 1] & 0x80) !== 0) chunkX = -chunkX;
        let chunkY: number = buffer[index++];
        chunkY |= (buffer[index++] & 0x7F) << 8;
        if ((buffer[index - 1] & 0x80) !== 0) chunkY = -chunkY;
        const arrowsTypesCount: number = buffer[index++] + 1;
        const chunk: Chunk = map.getOrCreateChunk(chunkX, chunkY);
        for (let j: number = 0; j < arrowsTypesCount; j++) {
            const type: number = buffer[index++];
            const typeCount: number = buffer[index++] + 1;
            for (let k: number = 0; k < typeCount; k++) {
                const position: number = buffer[index++];
                const rotation: number = buffer[index++];
                const arrow: Arrow = chunk.getArrow(position & 0xF, position >> 4);
                arrow.type = type;
                arrow.rotation = rotation & 0x3;
                arrow.flipped = (rotation & 0x4) !== 0;
            }
        }
    }

    const reader = new Reader(buffer.slice(index));
    const entityCount = reader.readU16();
    for (let i = 0; i < entityCount; i++)
        MapEntity.deserialize(map, reader);
});