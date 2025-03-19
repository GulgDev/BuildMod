import { Arrow, ArrowData } from "logic-arrows";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export interface ArrowData {
        mask: boolean;
    }
}

mixin("ArrowData", (ArrowData_) => class extends ArrowData_ {
    public mask: boolean = true;

    public static fromArrow(arrow: Arrow | undefined): ArrowData {
        const arrowData = new ArrowData();
        if (!arrow) return arrowData;
        arrowData.type = arrow.type;
        arrowData.rotation = arrow.rotation;
        arrowData.flipped = arrow.flipped;
        arrowData.mask = arrow.mask;
        return arrowData;
    }
    
    public static fromState(type: number, rotation: number, flipped: boolean, mask: boolean = true): ArrowData {
        const arrowData = new ArrowData();
        arrowData.type = type;
        arrowData.rotation = rotation;
        arrowData.flipped = flipped;
        arrowData.mask = mask;
        return arrowData;
    }
    
    public static fromCopy(other: ArrowData): ArrowData {
        const arrowData = new ArrowData();
        arrowData.type = other.type;
        arrowData.rotation = other.rotation;
        arrowData.flipped = other.flipped;
        arrowData.mask = other.mask;
        return arrowData;
    }
    
    public equals(other: ArrowData): boolean {
        return this.type === other.type &&
               this.rotation === other.rotation &&
               this.flipped === other.flipped &&
               this.mask === other.mask;
    }
});