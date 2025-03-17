import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface Render {
        drawArrow(x: number, y: number, type: number, signal: number, rotation: number, flipped: boolean, checkboard?: number): void;
    }
}

mixin("Render", (Render) => class extends Render {
    drawArrow(x: number, y: number, type: number, signal: number, rotation: number, flipped: boolean, checkboard: number = 1): void {
        this["gl"].uniform1i(this["arrowShader"].getCheckboardUniform(), checkboard);
        super.drawArrow(x, y, type, signal, rotation, flipped);
    }
});