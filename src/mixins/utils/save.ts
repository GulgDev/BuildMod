import { Writer } from "engine/util/serialization";
import { GameMap } from "logic-arrows";
import { mixin } from "mixin";

mixin("save", (save) => (map: GameMap): number[] => {
    const buffer = save(map);
    const writer = new Writer(buffer);
    writer.writeU16(map.entities.size);
    for (const entity of map.entities)
        entity.serialize(writer);
    map.chunks.forEach((chunk) => {
        writer.writeChunkCoords(chunk.x, chunk.y);
        const mask = [];
        let j = 7;
        for (const bit of chunk.mask) {
            if (j == 7)
                mask.push(0);
            mask[mask.length - 1] |= +bit << j;
            --j;
            if (j < 0)
                j = 7;
        }
        writer.write(mask);
    });
    return buffer;
});