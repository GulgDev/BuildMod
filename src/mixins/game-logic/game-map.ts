import { MapEntity } from "engine/entitites/map-entity";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface GameMap {
        readonly entities: Set<MapEntity>;
    }
}

mixin("GameMap", (GameMap) => class extends GameMap {
    readonly entities: Set<MapEntity> = new Set();
});