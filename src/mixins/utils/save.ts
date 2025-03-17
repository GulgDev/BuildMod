import { getEntityType } from "engine/entitites/map-entity-type";
import { GameMap } from "logic-arrows";
import { mixin } from "mixin";

mixin("save", (save) => (map: GameMap): number[] => {
    const buffer = save(map);
    buffer.push(map.entities.size & 0xFF, (map.entities.size >> 8) & 0xFF);
    for (const entity of map.entities) {
        const type = getEntityType(entity);
        buffer.push(type);
        entity.serialize(buffer);
    }
    return buffer;
});