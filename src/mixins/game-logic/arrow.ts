import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface Arrow {
        mask: boolean;
    }
}

mixin("Arrow", (Arrow) => class extends Arrow {
    public mask: boolean = true;
});