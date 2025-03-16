import { LogicArrows } from "../../logic-arrows";
import { mixin } from "../../mixin";

mixin("Game", (Game) => class extends Game {
    draw(): void {
        this.updateFocus();
        if (this.drawPastedArrows || this.selectedMap.getSelectedArrows().length !== 0) this.screenUpdated = true;
        if (LogicArrows.PlayerSettings.framesToUpdate[this.updateSpeedLevel] > 1) this.screenUpdated = true;
        if (this.screenUpdated) {
            this["render"].drawBackground(this.scale, [-this.offset[0] / LogicArrows.CELL_SIZE, -this.offset[1] / LogicArrows.CELL_SIZE]);
        }
        const arrowSize: number = this.scale;
        this["render"].prepareArrows(arrowSize);
        const intOffsetX: number = ~~(-this.offset[0] / LogicArrows.CELL_SIZE / 16) - 1;
        const intOffsetY: number = ~~(-this.offset[1] / LogicArrows.CELL_SIZE / 16) - 1;
        const intOffsetX2: number = ~~(-this.offset[0] / LogicArrows.CELL_SIZE / 16 + this.width / this.scale / 16);
        const intOffsetY2: number = ~~(-this.offset[1] / LogicArrows.CELL_SIZE / 16 + this.height / this.scale / 16);
        this["render"].setArrowAlpha(1.0);
        this.gameMap.chunks.forEach((chunk: LogicArrows.Chunk) => {
            if (!(chunk.x >= intOffsetX && chunk.x <= intOffsetX2 && chunk.y >= intOffsetY && chunk.y <= intOffsetY2)) {
                return;
            }
            const arrowOffsetX: number = this.offset[0] * this.scale / LogicArrows.CELL_SIZE + this.scale * 0.025;
            const arrowOffsetY: number = this.offset[1] * this.scale / LogicArrows.CELL_SIZE + this.scale * 0.025;
            for (let i: number = 0; i < LogicArrows.CHUNK_SIZE; i++) {
                for (let j: number = 0; j < LogicArrows.CHUNK_SIZE; j++) {
                    const arrow: LogicArrows.Arrow = chunk.getArrow(i, j);
                    if (arrow.type > 0) {
                        if (this.screenUpdated || LogicArrows.ChunkUpdates.wasArrowChanged(arrow)) {
                            const arrowX: number = chunk.x * LogicArrows.CHUNK_SIZE + i;
                            const arrowY: number = chunk.y * LogicArrows.CHUNK_SIZE + j;
                            const x: number = arrowX * this.scale + arrowOffsetX;
                            const y: number = arrowY * this.scale + arrowOffsetY;
                            this["render"].drawArrow(x, y, arrow.type, arrow.signal, arrow.rotation, arrow.flipped, (arrowX + arrowY + 1) % 2);
                        }
                    }
                }
            }
        });
        if (this.drawPastedArrows) {
            this["render"].setArrowAlpha(0.5);
            const selectedArrows: Map<string, LogicArrows.Arrow> = this.selectedMap.getCopiedArrows();
            if (selectedArrows.size !== 0) this.screenUpdated = true;
            selectedArrows.forEach((arrow: LogicArrows.Arrow, key: string) => {
                const [arrowX, arrowY] = key.split(',').map((value: string) => parseInt(value, 10));
                let rotatedX: number = arrowX;
                let rotatedY: number = arrowY;
                let direction: number = 0;
                if (this.pasteDirection === 1) {
                    rotatedX = -arrowY;
                    rotatedY = arrowX;
                    direction = 1;
                } else if (this.pasteDirection === 2) {
                    rotatedX = -arrowX;
                    rotatedY = -arrowY;
                    direction = 2;
                } else if (this.pasteDirection === 3) {
                    rotatedX = arrowY;
                    rotatedY = -arrowX;
                    direction = 3;
                }
                const x: number = (rotatedX + this.mousePosition[0]) * this.scale + this.offset[0] * this.scale / LogicArrows.CELL_SIZE + this.scale * 0.025;
                const y: number = (rotatedY + this.mousePosition[1]) * this.scale + this.offset[1] * this.scale / LogicArrows.CELL_SIZE + this.scale * 0.025;
                this["render"].drawArrow(x, y, arrow.type, arrow.signal, (arrow.rotation + direction) % 4, arrow.flipped);
            });
        }
        this["render"].disableArrows();
        this["render"].prepareSolidColor();
        this["render"].setSolidColor(0.25, 0.5, 1.0, 0.25);
        this.selectedMap.getSelectedArrows().forEach((positionString: string) => {
            const position: number[] = positionString.split(',').map((value: string) => parseInt(value, 10));
            const x: number = position[0] * this.scale + this.offset[0] * this.scale / LogicArrows.CELL_SIZE;
            const y: number = position[1] * this.scale + this.offset[1] * this.scale / LogicArrows.CELL_SIZE;
            const s: number = this.scale + this.scale * 0.05;
            this["render"].drawSolidColor(x, y, s, s);
        });
        if (this.isSelecting) {
            this["render"].prepareSolidColor();
            this["render"].setSolidColor(0.5, 0.5, 0.75, 0.25);
            const selectedArea: [number, number, number, number] | undefined = this.selectedMap.getCurrentSelectedArea();
            if (selectedArea !== undefined) {
                const x: number = selectedArea[0] * this.scale + this.offset[0] * this.scale / LogicArrows.CELL_SIZE;
                const y: number = selectedArea[1] * this.scale + this.offset[1] * this.scale / LogicArrows.CELL_SIZE;
                const sX: number = (selectedArea[2] - selectedArea[0]);
                const sY: number = (selectedArea[3] - selectedArea[1]);
                this["render"].drawSolidColor(x, y, sX * this.scale, sY * this.scale);
            }
        }
        this["render"].disableSolidColor();
        this.screenUpdated = false;
    }
});