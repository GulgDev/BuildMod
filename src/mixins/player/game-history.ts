import { MapEntityChange } from "engine/entitites/map-entity-change";
import { PlayerMapAction } from "logic-arrows";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface GameHistory {
        addEntityChange(change: MapEntityChange): void;
    }
}

mixin("GameHistory", (GameHistory) => class extends GameHistory {
    public addEntityChange(change: MapEntityChange): void {
        const time: number = Date.now();
        if (time - this["lastChangeTime"] > 2000) {
            this.pushState(new PlayerMapAction());
            this["lastChangeTime"] = time;
        }
        const currentState: PlayerMapAction = this.getCurrentState();
        currentState.addChangedEntity(change);
    }
});