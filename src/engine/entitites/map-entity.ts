import { Game, GameMap, Render } from "logic-arrows";

export abstract class MapEntity {
    constructor(protected gameMap: GameMap) {}

    static deserialize(gameMap: GameMap, buffer: number[]): MapEntity {
        const clazz = getEntityClass(buffer.shift());
        if (!clazz) return undefined;
        const entity = new clazz(gameMap);
        entity.readFromBuffer(buffer);
        return entity;
    }

    protected abstract readFromBuffer(buffer: number[]): void;

    abstract serialize(buffer: number[]): void;

    abstract build(): void;

    abstract draw(game: Game, render: Render): void;
}

import { getEntityClass } from "./map-entity-type";