import { CHUNK_SIZE } from "logic-arrows";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface Chunk {
        mask: boolean[];
    }
}

mixin("Chunk", (Chunk) => class extends Chunk {
    public mask: boolean[] = new Array(CHUNK_SIZE * CHUNK_SIZE).fill(true);
});