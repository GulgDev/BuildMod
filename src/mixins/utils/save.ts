import { GameVersion } from "engine/const/game-version";
import { Writer } from "engine/util/serialization";
import { CHUNK_SIZE, GameMap } from "logic-arrows";
import { mixin } from "mixin";

mixin("save", () => (map: GameMap): number[] => {
    const buffer: number[] = [];
    const writer = new Writer(buffer);

    writer.writeU16(GameVersion.mapFormatVersion);

    writer.writeU16(map.chunks.size);
    map.chunks.forEach((chunk) => {
        writer.writeChunkCoords(chunk.x, chunk.y);

        const arrowTypes = chunk.getArrowTypes();
        writer.writeU8(arrowTypes.length - 1);
        arrowTypes.forEach((type) => {
            writer.writeU8(type);

            const arrowCountOffset = buffer.length;
            writer.writeU8(0);

            let arrowCount = 0;
            for (let y = 0; y < CHUNK_SIZE; y++) {
                for (let x = 0; x < CHUNK_SIZE; x++) {
                    const arrow = chunk.getArrow(x, y);
                    if (arrow.type === type) {
                        const state = arrow.rotation | (arrow.flipped && 0x4) | (!arrow.mask && 0x8);
                        writer.writeArrowPosition(x, y);
                        writer.writeU8(state);
                        arrowCount++;
                    }
                }
            }

            buffer[arrowCountOffset] = arrowCount - 1;
        });
    });

    writer.writeU16(GameVersion.mapMetaFormatVersion);

    writer.writeU16(map.entities.size);
    for (const entity of map.entities)
        entity.serialize(writer);
    
    return buffer;
});