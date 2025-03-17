import { mixin } from "mixin";

mixin("BackgroundShader", (BackgroundShader) => class extends BackgroundShader {
    public makeFragmentShader(): string {
        return `
        precision lowp float;
    
        varying vec2 v_texcoord;
    
        uniform vec2 u_offset;
        uniform float u_scale;
    
        void main() {
            vec2 uv = v_texcoord;
            uv.y += 0.05 / u_scale;
            vec2 grid = fract(uv * u_scale + u_offset) - 0.05;
            vec2 checkboardUV = v_texcoord;
            checkboardUV.x -= 0.025 / u_scale;
            checkboardUV.y += 0.025 / u_scale;
            checkboardUV = floor(checkboardUV * 8.0);
            float offset = mod(checkboardUV.x + checkboardUV.y, 2.0);
            float color = step(min(grid.x, grid.y), 0.0) * 0.2;
            color = offset * (1.0 - color) + (1.0 - offset) * (0.95 - color);
            gl_FragColor = vec4(vec3(color), 1.0);
        }`;
    }
});