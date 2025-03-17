import { LineShader } from "engine/rendering/shaders/line-shader";
import { PointShader } from "engine/rendering/shaders/point-shader";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface Render {
        prepareLines(): void;

        disableLines(): void;

        setLinesColor(r: number, g: number, b: number): void;

        preparePoints(): void;

        disablePoints(): void;

        setPointsColor(r: number, g: number, b: number): void;

        drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number): void;

        drawPoint(x: number, y: number, r: number): void;

        drawArrow(x: number, y: number, type: number, signal: number, rotation: number, flipped: boolean, checkboard?: number): void;
    }
}

mixin("Render", (Render) => class extends Render {
    private lineShader: LineShader;
    private pointShader: PointShader;

    constructor(gl: WebGLRenderingContext) {
        super(gl);
        this.lineShader = new LineShader();
        this.lineShader.updateProgram(gl);
        this.pointShader = new PointShader();
        this.pointShader.updateProgram(gl);
    }

    public prepareLines(): void {
        const gl: WebGLRenderingContext = this["gl"];
        gl.useProgram(this.lineShader.getProgram());
        gl.bindBuffer(gl.ARRAY_BUFFER, this["positionBuffer"]);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this["indexBuffer"]);
        gl.enableVertexAttribArray(this.lineShader.getPositionAttribute());
        gl.vertexAttribPointer(this.lineShader.getPositionAttribute(), 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(this.lineShader.getResolutionUniform(), gl.canvas.width, gl.canvas.height);
    }

    public disableLines(): void {
        const gl: WebGLRenderingContext = this["gl"];
        gl.disableVertexAttribArray(this.lineShader.getPositionAttribute());
    }

    public setLinesColor(r: number, g: number, b: number): void {
        const gl: WebGLRenderingContext = this["gl"];
        gl.uniform3f(this.lineShader.getColorUniform(), r, g, b);
    }

    public preparePoints(): void {
        const gl: WebGLRenderingContext = this["gl"];
        gl.useProgram(this.pointShader.getProgram());
        gl.bindBuffer(gl.ARRAY_BUFFER, this["positionBuffer"]);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this["indexBuffer"]);
        gl.enableVertexAttribArray(this.pointShader.getPositionAttribute());
        gl.vertexAttribPointer(this.pointShader.getPositionAttribute(), 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(this.pointShader.getResolutionUniform(), gl.canvas.width, gl.canvas.height);
    }

    public disablePoints(): void {
        const gl: WebGLRenderingContext = this["gl"];
        gl.disableVertexAttribArray(this.pointShader.getPositionAttribute());
    }

    public setPointsColor(r: number, g: number, b: number): void {
        const gl: WebGLRenderingContext = this["gl"];
        gl.uniform3f(this.pointShader.getColorUniform(), r, g, b);
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number): void {
        const w = x2 - x1;
        const h = y2 - y1;
        const gl: WebGLRenderingContext = this["gl"];
        const mag = Math.sqrt(w ** 2 + h ** 2);
        gl.uniform4f(this.lineShader.getTransformUniform(), x2, y2, thickness, mag);
        const cos = h / mag;
        const sin = w / mag;
        gl.uniformMatrix2fv(this.lineShader.getRotationUniform(), false, [cos, -sin, sin, cos]);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    public drawPoint(x: number, y: number, r: number): void {
        const gl: WebGLRenderingContext = this["gl"];
        gl.uniform4f(this.pointShader.getTransformUniform(), x - r, y - r, r * 2, r * 2);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    public drawArrow(x: number, y: number, type: number, signal: number, rotation: number, flipped: boolean, checkboard: number = 1): void {
        this["gl"].uniform1i(this["arrowShader"].getCheckboardUniform(), checkboard);
        super.drawArrow(x, y, type, signal, rotation, flipped);
    }
});