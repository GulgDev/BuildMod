import { Game, GameMap, Render } from "logic-arrows";
import { Reader, Writer } from "engine/util/serialization";

export abstract class MapEntity {
    constructor(protected gameMap: GameMap) {
        this.undispose();
    }

    dispose(): void {
        this.gameMap.entities.delete(this);
    }

    undispose(): void {
        this.gameMap.entities.add(this);
    }

    static deserialize(gameMap: GameMap, reader: Reader): MapEntity {
        const constructor = getEntityClass(reader.readU8());
        if (!constructor) return undefined;
        const entity = new constructor(gameMap, reader);
        entity.readState(reader);
        return entity;
    }

    serialize(writer: Writer): void {
        writer.writeU8(getEntityType(this));
        this.writeState(writer);
    }

    protected abstract readState(reader: Reader): void;

    protected abstract writeState(writer: Writer): void;

    abstract build(game: Game): void;

    abstract draw(game: Game, render: Render): void;
}

import { getEntityClass, getEntityType } from "./map-entity-type";