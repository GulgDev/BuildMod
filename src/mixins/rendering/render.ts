import { mixin } from "../../mixin";

mixin("Render", (Render) => class extends Render {
    drawArrow(x: number, y: number, type: number, signal: number, rotation: number, flipped: boolean, checkboard: boolean = true): void {
        this["gl"].uniform1i(this["arrowShader"].getCheckboardUniform(), +checkboard);
        super.drawArrow(x, y, type, signal, rotation, flipped);
    }
});