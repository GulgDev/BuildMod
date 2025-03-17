import { MapEntity } from "engine/entitites/map-entity";
import { Wire } from "engine/entitites/wire";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface GameMap {
        readonly entities: Set<MapEntity>;

        getEntities(x: number, y: number): MapEntity[];
    }
}

mixin("GameMap", (GameMap) => class extends GameMap {
    readonly entities = new Set<MapEntity>();

    getEntities(x: number, y: number): MapEntity[] {
        const result: MapEntity[] = [];
        for (const entity of this.entities) {
            if (entity instanceof Wire) {
                for (const [px, py] of entity.points)
                    if (px === x && py === y) {
                        result.push(entity);
                        break;
                    }
            }
        }
        return result;
    }
});