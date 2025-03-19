import { Arrow, ArrowData } from "logic-arrows";

export declare namespace ArrowDataExt {
    export function fromArrow(arrow: Arrow | undefined): ArrowData;

    export function fromState(type: number, rotation: number, flipped: boolean, mask: boolean): ArrowData;

    export function fromCopy(other: ArrowData): ArrowData;
}