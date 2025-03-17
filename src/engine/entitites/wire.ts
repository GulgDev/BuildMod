import { CELL_SIZE, CHUNK_SIZE, Game, Render } from "logic-arrows";
import { MapEntity } from "./map-entity";
import { PathTracer } from "engine/util/path-finder";
import { NotificationType } from "engine/build-system/notification";

export class Wire extends MapEntity {
    public points: [number, number][] = [];

    protected readFromBuffer(buffer: number[]): void {
        const pointCount = buffer.shift();
        for (let i = 0; i < pointCount; i++) {
            let chunkX: number = buffer.shift();
            chunkX |= (buffer[0] & 0x7F) << 8;
            if ((buffer.shift() & 0x80) !== 0) chunkX = -chunkX;
            let chunkY: number = buffer.shift();
            chunkY |= (buffer[0] & 0x7F) << 8;
            if ((buffer.shift() & 0x80) !== 0) chunkY = -chunkY;
            const position = buffer.shift();
            const arrowX = position & 0xF;
            const arrowY = position >> 4;
            this.points.push([chunkX * CHUNK_SIZE + arrowX, chunkY * CHUNK_SIZE + arrowY]);
        }
    }

    serialize(buffer: number[]): void {
        buffer.push(this.points.length);
        for (const [x, y] of this.points) {
            const negativeCorrectionX = x < 0 ? 1 : 0;
            const negativeCorrectionY = y < 0 ? 1 : 0;
            const chunkX = ~~((x + negativeCorrectionX) / CHUNK_SIZE) - negativeCorrectionX;
            const chunkY = ~~((y + negativeCorrectionY) / CHUNK_SIZE) - negativeCorrectionY;
            const arrowX = x - chunkX * CHUNK_SIZE;
            const arrowY = y - chunkY * CHUNK_SIZE;
            const chunkBytesX = [
                Math.abs(chunkX) & 0xFF,
                (Math.abs(chunkX) >> 8) & 0xFF
            ];
            const chunkBytesY = [
                Math.abs(chunkY) & 0xFF,
                (Math.abs(chunkY) >> 8) & 0xFF
            ];
            if (chunkX < 0) chunkBytesX[1] |= 0x80;
            else chunkBytesX[1] &= 0x7F;
            if (chunkY < 0) chunkBytesY[1] |= 0x80;
            else chunkBytesY[1] &= 0x7F;
            buffer.push(...chunkBytesX);
            buffer.push(...chunkBytesY);
            buffer.push(arrowX | (arrowY << 4));
        }
    }

    build(game: Game): void {
        const tracer = new PathTracer(this.gameMap);
        for (let i = 0; i < this.points.length - 1; i++) {
            const [x1, y1] = this.points[i];
            const [x2, y2] = this.points[i + 1];
            if (!tracer.trace(x1, y1, x2, y2)) {
                game.notify(NotificationType.ERROR, x1, y1, "Невозможно добраться до цели");
                return;
            }
        }
        const [x, y] = this.points[this.points.length - 1];
        if (this.gameMap.getArrowType(x, y) === 0)
            this.gameMap.setArrowType(x, y, 23, false);
    }

    draw(game: Game, render: Render): void {
        const arrowOffsetX: number = game.offset[0] * game.scale / CELL_SIZE + game.scale * 0.025;
        const arrowOffsetY: number = game.offset[1] * game.scale / CELL_SIZE + game.scale * 0.025;
        render.prepareLines();
        render.setLinesColor(1.0, 0.0, 0.0);
        for (let i = 0; i < this.points.length - 1; i++) {
            let j = i + 1;
            const [x1, y1] = this.points[i];
            const [x2, y2] = this.points[j];
            render.drawLine(
                (x1 + 0.5) * game.scale + arrowOffsetX, (y1 + 0.5) * game.scale + arrowOffsetY,
                (x2 + 0.5) * game.scale + arrowOffsetX, (y2 + 0.5) * game.scale + arrowOffsetY,
                0.08 * game.scale
            );
        }
        render.disableLines();
        render.preparePoints();
        this.points.forEach(([x, y], i) => {
            switch (i) {
                case 0:
                    render.setPointsColor(1.0, 0.0, 0.0);
                    break;
                case this.points.length - 1:
                    render.setPointsColor(0.0, 0.0, 0.0);
                    break;
                default:
                    render.setPointsColor(0.5, 0.0, 0.0);
                    break;
            }
            render.drawPoint((x + 0.5) * game.scale + arrowOffsetX, (y + 0.5) * game.scale + arrowOffsetY, 0.125 * game.scale);
        });
        render.disablePoints();
    }
}