import { Shader } from './shader';
export declare class BackgroundShader extends Shader {
    private scaleUniform;
    private offsetUniform;
    updateProgram(gl: WebGLRenderingContext): void;
    getScaleUniform(): WebGLUniformLocation | null;
    getOffsetUniform(): WebGLUniformLocation | null;
    protected makeVertexShader(): string;
    protected makeFragmentShader(): string;
}
