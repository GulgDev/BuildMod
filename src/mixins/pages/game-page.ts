import { GameHistory, MapInfo, Routes } from "logic-arrows";
import { mixin } from "mixin";

mixin("GamePage", (GamePage) => class extends GamePage {
    constructor(mapInfo: MapInfo) {
        super(mapInfo);
        window.addEventListener("beforeunload", this.onBeforeUnload);
    }

    async dispose(): Promise<void> {
        window.removeEventListener("beforeunload", this.onBeforeUnload);
        await super.dispose();
    }

    private onBeforeUnload = (ev: BeforeUnloadEvent) => {
        const history: GameHistory = this["history"];
        if (Routes.lastSaveTime < history.getLastChangeTime()) {
            ev.preventDefault();
            ev.returnValue = true;
        }
    };
});