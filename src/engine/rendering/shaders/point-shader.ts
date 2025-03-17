import { Shader } from "logic-arrows";
import { depend } from "mixin";

export declare class PointShader extends Shader {
    private transformUniform: WebGLUniformLocation | null;
    private colorUniform: WebGLUniformLocation | null;
      
    public updateProgram(gl: WebGLRenderingContext): void;
      
    public getTransformUniform(): WebGLUniformLocation | null;
    
    public getColorUniform(): WebGLUniformLocation | null;
      
    protected makeVertexShader(): string;
      
    protected makeFragmentShader(): string;
}

depend("Shader", (Shader) => {
    class PointShader extends Shader {
        private transformUniform: WebGLUniformLocation | null = null;
        private colorUniform: WebGLUniformLocation | null = null;
      
        public updateProgram(gl: WebGLRenderingContext): void {
            super.updateProgram(gl);
            if (this.program === null) return;
            this.transformUniform = gl.getUniformLocation(this.program, "u_transform");
            this.colorUniform = gl.getUniformLocation(this.program, "u_color");
        }
      
        public getTransformUniform(): WebGLUniformLocation | null {
            return this.transformUniform;
        }
      
        public getColorUniform(): WebGLUniformLocation | null {
            return this.colorUniform;
        }
      
        protected makeVertexShader(): string {
            return `
            attribute vec2 a_position;
            
            uniform vec2 u_resolution;
            uniform vec4 u_transform;
        
            varying vec2 v_texcoord;
        
            void main() {
                v_texcoord = a_position;
                float aspect = u_resolution.y / u_resolution.x;
                vec2 size = u_transform.zw / u_resolution.y * 2.0;
                size.x *= aspect;
                vec2 position = u_transform.xy / u_resolution.y * 2.0;
                position.x = position.x * aspect - 1.0;
                position.y = -position.y - size.y + 1.0;
                gl_Position = vec4(a_position * size + position, 0.0, 1.0);
            }`;
        }
      
        protected makeFragmentShader(): string {
            return `
            precision highp float;
        
            varying vec2 v_texcoord;
        
            uniform vec4 u_transform;
            uniform vec3 u_color;
        
            void main() {
                gl_FragColor = vec4(u_color, 1.0 - smoothstep(0.9, 1.0, distance(vec2(0.5), v_texcoord) * 2.0));
            }`;
        }
    }

    Object.assign(module.exports, { PointShader });
});