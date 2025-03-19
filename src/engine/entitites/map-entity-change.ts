import { MapEntity } from "./map-entity";
import { Wire } from "./wire";

export enum EntityChangeType {
    SPAWNED,
    REMOVED,
    WIRE_MOVED
}

export type MapEntityChange =
    | {
        type: EntityChangeType.SPAWNED;
        entity: MapEntity;
    }
    | {
        type: EntityChangeType.REMOVED;
        entity: MapEntity;
    }
    | {
        type: EntityChangeType.WIRE_MOVED;
        entity: Wire;
        point: number;
        from: [number, number];
        to: [number, number];
    }