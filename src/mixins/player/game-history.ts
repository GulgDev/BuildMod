import { MapEntityChange } from "engine/entitites/map-entity-change";
import { ArrowData, PlayerMapAction } from "logic-arrows";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface GameHistory {
        getLastChangeTime(): number;

        addEntityChange(change: MapEntityChange): void;
    }
}

mixin("GameHistory", (GameHistory) => class extends GameHistory {
    public getLastChangeTime(): number {
        return this["lastChangeTime"];
    }

    private requestState() {
        const time: number = Date.now();
        if (time - this["lastChangeTime"] > 2000) {
            this.pushState(new PlayerMapAction());
        }
        this["lastChangeTime"] = time;
        return this.getCurrentState();
    }

    public addChange(x: number, y: number, arrowOld: ArrowData, arrowNew: ArrowData): void {
        if (arrowOld.equals(arrowNew)) return;
        const currentState: PlayerMapAction = this.requestState();
        currentState.addChangedArrow(x, y, arrowOld, arrowNew);
    }

    public addEntityChange(change: MapEntityChange): void {
        const currentState: PlayerMapAction = this.requestState();
        currentState.addChangedEntity(change);
    }
});