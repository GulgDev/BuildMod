import { GameVersion } from "engine/const/game-version";
import { GameText, PlayerSettings } from "logic-arrows";
import { mixin } from "mixin";

mixin("Navigation", (Navigation) => class extends Navigation {
    public start(): void {
        const date = new Date()
        const isAprilFirst = date.getDate() === 1 && date.getMonth() === 3; // >:D
        if (!isAprilFirst) localStorage.removeItem("sawAprilFoolsJoke");
        if (PlayerSettings.version !== GameVersion.gameVersion || (isAprilFirst && !localStorage.getItem("sawAprilFoolsJoke"))) {
            alert(GameText.UNSUPPORTED_GAME_VERSION.get());
            if (isAprilFirst)
                localStorage.setItem("sawAprilFoolsJoke", "1");
        } else
            super.start();
    }
});