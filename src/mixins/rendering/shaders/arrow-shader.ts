import { mixin } from "../../../mixin";

declare module "../../../logic-arrows" {
    namespace LogicArrows {
        export interface ArrowShader {
            checkboardUniform: WebGLUniformLocation | null;

            getCheckboardUniform(): WebGLUniformLocation | null;
        }
    }
}

mixin("ArrowShader", (ArrowShader) => class extends ArrowShader {
    checkboardUniform: WebGLUniformLocation | null = null;

    updateProgram(gl: WebGLRenderingContext): void {
        super.updateProgram(gl);
        if (this.program === null) return;
        this.checkboardUniform = gl.getUniformLocation(this.program, "u_checkboard");
    }

    getCheckboardUniform(): WebGLUniformLocation | null {
        return this.checkboardUniform;
    }

    makeFragmentShader(): string {
        return `
        precision lowp float;

        varying vec2 v_texcoord;

        uniform sampler2D u_texture;
        uniform bool u_checkboard;
        uniform float u_alpha;
        uniform int u_signal;
        uniform vec2 u_spritePosition;
        uniform float u_spriteSize;

        const vec2 border = vec2(0.475);

        void main() {
            vec4 signalColors[6];
            vec4 signalColor;
            if (u_signal == 0) signalColor = vec4(1.0, 1.0, 1.0, 1.0);
            if (u_signal == 1) signalColor = vec4(1.0, 0.0, 0.0, 1.0);
            if (u_signal == 2) signalColor = vec4(0.3, 0.5, 1.0, 1.0);
            if (u_signal == 3) signalColor = vec4(1.0, 1.0, 0.0, 1.0);
            if (u_signal == 4) signalColor = vec4(0.0, 0.8, 0.0, 1.0);
            if (u_signal == 5) signalColor = vec4(1.0, 0.8, 0.2, 1.0);
            if (u_signal == 6) signalColor = vec4(1.0, 0.2, 1.0, 1.0);
            signalColor.rgb *= 0.95 + float(u_checkboard) * 0.05;
            vec2 uv = v_texcoord;
            uv.y = 1.0 - v_texcoord.y;
            vec4 color = texture2D(u_texture, uv * u_spriteSize + u_spritePosition);
            color = mix(color, signalColor, 1.0 - color.a);
            color.a = 1.0;
            uv = abs(uv - 0.5);
            float borderColor = 1.0 - float(any(greaterThan(uv, border))) * 0.2;
            color.rgb *= borderColor;
            color.a *= u_alpha;
            gl_FragColor = color;
        }`;
    }
});