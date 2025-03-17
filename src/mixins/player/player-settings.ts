import { mixin } from "mixin";

mixin("PlayerSettings", (PlayerSettings) => ({
    ...PlayerSettings,
    levelArrows: []
}));