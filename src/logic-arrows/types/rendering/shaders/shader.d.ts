export declare abstract class Shader {
    protected abstract makeVertexShader(): string;
    protected abstract makeFragmentShader(): string;
    protected program: WebGLProgram | null;
    private positionAttribute;
    private resolutionUniform;
    updateProgram(gl: WebGLRenderingContext): void;
    getProgram(): WebGLProgram | null;
    getPositionAttribute(): number;
    getResolutionUniform(): WebGLUniformLocation | null;
    dispose(gl: WebGLRenderingContext): void;
}
