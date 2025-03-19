import { MapEntityChange } from "engine/entitites/map-entity-change";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface PlayerMapAction {
        readonly changedEntities: MapEntityChange[];

        addChangedEntity(change: MapEntityChange): void;
    }
}

mixin("PlayerMapAction", (PlayerMapAction) => class extends PlayerMapAction {
    public readonly changedEntities: MapEntityChange[] = [];

    public addChangedEntity(change: MapEntityChange): void {
        this.changedEntities.push(change);
    }
});