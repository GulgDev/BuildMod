import { CHUNK_SIZE } from "logic-arrows";

abstract class IO {
    constructor(protected readonly buffer: number[]) {}
}

export class Reader extends IO {
    get available(): boolean {
        return this.buffer.length > 0;
    }

    read(count: number): number[] {
        return this.buffer.splice(0, count);
    }

    readU8(): number {
        return this.buffer.shift();
    }

    readS8(): number {
        const unsigned = this.readU8();
        let signed = unsigned & 0x7F;
        if (unsigned & 0x80)
            signed = -signed;
        return signed;
    }

    readU16(): number {
        return this.readU8() | (this.readU8() << 8);
    }

    readS16(): number {
        const unsigned = this.readU16();
        let signed = unsigned & 0x7FFF;
        if (unsigned & 0x8000)
            signed = -signed;
        return signed;
    }

    readU32(): number {
        return this.readU8() | (this.readU8() << 8) | (this.readU8() << 16) | (this.readU8() << 24);
    }

    readS32(): number {
        const unsigned = this.readU32();
        let signed = unsigned & 0x7FFFFFFF;
        if (unsigned & 0x80000000)
            signed = -signed;
        return signed;
    }

    readChunkCoords(): [number, number] {
        return [this.readS16(), this.readS16()];
    }

    readArrowPosition(): [number, number] {
        const position = this.readU8();
        return [position & 0xF, position >> 4];
    }

    readPosition(): [number, number] {
        const [chunkX, chunkY] = this.readChunkCoords();
        const [arrowX, arrowY] = this.readArrowPosition();
        return [chunkX * CHUNK_SIZE + arrowX, chunkY * CHUNK_SIZE + arrowY];
    }
}

export class Writer extends IO {
    write(values: number[]): void {
        this.writeU8(...values);
    }

    writeU8(...values: number[]): void {
        this.buffer.push(...values.map(value => value & 0xFF));
    }

    writeS8(...values: number[]): void {
        this.writeU8(...values.map(value => value < 0 ? (-value) | 0x80 : value & 0x7F));
    }

    writeU16(...values: number[]): void {
        this.writeU8(...values.flatMap(value => [value, value >> 8]));
    }

    writeS16(...values: number[]): void {
        this.writeU16(...values.map(value => value < 0 ? (-value) | 0x8000 : value & 0x7FFF));
    }

    writeU32(...values: number[]): void {
        this.writeU8(...values.flatMap(value => [value, value >> 8, value >> 16, value >> 24]));
    }

    writeS32(...values: number[]): void {
        this.writeU32(...values.map(value => value < 0 ? (-value) | 0x80000000 : value & 0x7FFFFFFF));
    }

    writeChunkCoords(x: number, y: number) {
        this.writeS16(x, y);
    }

    writeArrowPosition(x: number, y: number): void {
        this.writeU8(x | (y << 4));
    }

    writePosition(x: number, y: number): void {
        const chunkX = Math.floor(x / CHUNK_SIZE);
        const chunkY = Math.floor(y / CHUNK_SIZE);
        const arrowX = x - chunkX * CHUNK_SIZE;
        const arrowY = y - chunkY * CHUNK_SIZE;
        this.writeChunkCoords(chunkX, chunkY);
        this.writeArrowPosition(arrowX, arrowY);
    }
}