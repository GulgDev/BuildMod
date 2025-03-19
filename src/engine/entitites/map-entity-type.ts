import { GameMap } from "logic-arrows";
import { Reader } from "engine/util/serialization";
import { MapEntity } from "./map-entity";
import { Wire } from "./wire";

interface MapEntityConstructor {
    new (gameMap: GameMap, reader: Reader): MapEntity;
}

const classes = () => <MapEntityConstructor[]>[Wire];

export function getEntityType(entity: MapEntity): number {
    return classes().indexOf(entity.constructor as MapEntityConstructor);
}

export function getEntityClass(entity: number): MapEntityConstructor {
    return classes()[entity];
}