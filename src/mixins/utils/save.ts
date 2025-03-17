import { GameMap } from "logic-arrows";
import { mixin } from "mixin";

mixin("save", (save) => (map: GameMap): number[] => {
    const buffer = save(map);
    return buffer;
});