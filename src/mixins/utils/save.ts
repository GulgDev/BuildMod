import { Writer } from "engine/util/serialization";
import { GameMap } from "logic-arrows";
import { mixin } from "mixin";

mixin("save", (save) => (map: GameMap): number[] => {
    const buffer = save(map);
    const writer = new Writer(buffer);
    writer.writeU16(map.entities.size);
    for (const entity of map.entities)
        entity.serialize(writer);
    return buffer;
});