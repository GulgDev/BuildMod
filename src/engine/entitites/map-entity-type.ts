import { GameMap } from "logic-arrows";
import { Wire } from "./wire";
import { MapEntity } from "./map-entity";

interface MapEntityConstructor {
    new (gameMap: GameMap): MapEntity;
}

export enum MapEntityType {
    WIRE
}

export function getEntityType(entity: MapEntity): MapEntityType {
    if (entity instanceof Wire) return MapEntityType.WIRE;
    else return undefined;
}

export function getEntityClass(entity: MapEntityType): MapEntityConstructor {
    switch (entity) {
        case MapEntityType.WIRE:
            return Wire;
        default:
            return undefined;
    }
}