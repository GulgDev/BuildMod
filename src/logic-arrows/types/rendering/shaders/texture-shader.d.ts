import { Shader } from './shader';
export declare class TextureShader extends Shader {
    private transformUniform;
    private rotationUniform;
    private tilesUniform;
    private shadeUniform;
    updateProgram(gl: WebGLRenderingContext): void;
    getTransformUniform(): WebGLUniformLocation | null;
    getRotationUniform(): WebGLUniformLocation | null;
    getTilesUniform(): WebGLUniformLocation | null;
    getShadeUniform(): WebGLUniformLocation | null;
    protected makeVertexShader(): string;
    protected makeFragmentShader(): string;
}
