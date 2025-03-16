import { Shader } from './shader';
export declare class ArrowShader extends Shader {
    private positionUniform;
    private alphaUniform;
    private signalUniform;
    private rotationUniform;
    private sizeUniform;
    private spriteSizeUniform;
    private spritePositionUniform;
    updateProgram(gl: WebGLRenderingContext): void;
    getPositionUniform(): WebGLUniformLocation | null;
    getAlphaUniform(): WebGLUniformLocation | null;
    getSignalUniform(): WebGLUniformLocation | null;
    getRotationUniform(): WebGLUniformLocation | null;
    getSizeUniform(): WebGLUniformLocation | null;
    getSpriteSizeUniform(): WebGLUniformLocation | null;
    getSpritePositionUniform(): WebGLUniformLocation | null;
    protected makeVertexShader(): string;
    protected makeFragmentShader(): string;
}
