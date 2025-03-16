import { Arrow } from './arrow';
export declare class ArrowData {
    type: number;
    rotation: number;
    flipped: boolean;
    static fromArrow(arrow: Arrow | undefined): ArrowData;
    static fromState(type: number, rotation: number, flipped: boolean): ArrowData;
    static fromCopy(other: ArrowData): ArrowData;
    equals(other: ArrowData): boolean;
}
