import { MapEntity } from "engine/entitites/map-entity";
import { Wire } from "engine/entitites/wire";
import { Arrow, Chunk, CHUNK_SIZE, PlayerSettings } from "logic-arrows";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface GameMap {
        readonly entities: Set<MapEntity>;

        getEntities(x: number, y: number): MapEntity[];
    }
}

mixin("GameMap", (GameMap) => class extends GameMap {
    readonly entities = new Set<MapEntity>();

    public getEntities(x: number, y: number): MapEntity[] {
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

    public setArrowType(x: number, y: number, type: number, player: boolean = true): void {
        const chunk: Chunk = this["getOrCreateChunkByArrowCoordinates"](x, y);
        const arrowX: number = x - chunk.x * CHUNK_SIZE;
        const arrowY: number = y - chunk.y * CHUNK_SIZE;
        const arrow: Arrow = chunk.getArrow(arrowX, arrowY);
        if (player && !arrow.canBeEdited) return;
        if (player && PlayerSettings.levelArrows.includes(arrow.type)) return;
        if (arrow.type !== type) arrow.signal = 0;
        arrow.type = type;
        chunk.mask[arrowY * CHUNK_SIZE + arrowX] = player;
    }
});