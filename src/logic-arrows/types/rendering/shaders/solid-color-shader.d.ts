import { Shader } from './shader';
export declare class SolidColorShader extends Shader {
    private transformUniform;
    private colorUniform;
    updateProgram(gl: WebGLRenderingContext): void;
    getTransformUniform(): WebGLUniformLocation | null;
    getColorUniform(): WebGLUniformLocation | null;
    protected makeVertexShader(): string;
    protected makeFragmentShader(): string;
}
