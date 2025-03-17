import { mixin } from "mixin";

mixin("PlayerAccess", (PlayerAccess) => class extends PlayerAccess {
    public arrowGroups: number[][] = [
        ...this.arrowGroups,
        [22, 23],
    ];
});