import { CELL_SIZE, Game, Render } from "logic-arrows";
import { MapEntity } from "./map-entity";
import { PathTracer } from "engine/util/path-finder";
import { NotificationType } from "engine/build-system/notification";
import { Reader, Writer } from "engine/util/serialization";

export class Wire extends MapEntity {
    public points: [[number, number], [number, number]] = [undefined, undefined];

    protected readState(reader: Reader): void {
        this.points[0] = reader.readPosition();
        this.points[1] = reader.readPosition();
    }

    protected writeState(writer: Writer): void {
        writer.writePosition(...this.points[0]);
        writer.writePosition(...this.points[1]);
    }

    build(game: Game): void {
        const tracer = new PathTracer(this.gameMap);
        if (!tracer.trace(...this.points[0], ...this.points[1]))
            game.notify(NotificationType.ERROR, ...this.points[0], "Невозможно добраться до цели");
    }

    draw(game: Game, render: Render): void {
        const arrowOffsetX: number = game.offset[0] * game.scale / CELL_SIZE + game.scale * 0.025;
        const arrowOffsetY: number = game.offset[1] * game.scale / CELL_SIZE + game.scale * 0.025;
        render.prepareLines();
        render.setLinesColor(1.0, 0.0, 0.0);
        render.drawLine(
            (this.points[0][0] + 0.5) * game.scale + arrowOffsetX, (this.points[0][1] + 0.5) * game.scale + arrowOffsetY,
            (this.points[1][0] + 0.5) * game.scale + arrowOffsetX, (this.points[1][1] + 0.5) * game.scale + arrowOffsetY,
            0.08 * game.scale
        );
        render.disableLines();
        render.preparePoints();
        render.setPointsColor(1.0, 0.0, 0.0);
        render.drawPoint((this.points[0][0] + 0.5) * game.scale + arrowOffsetX, (this.points[0][1] + 0.5) * game.scale + arrowOffsetY, 0.125 * game.scale);
        render.setPointsColor(0.0, 0.0, 0.0);
        render.drawPoint((this.points[1][0] + 0.5) * game.scale + arrowOffsetX, (this.points[1][1] + 0.5) * game.scale + arrowOffsetY, 0.125 * game.scale);
        render.disablePoints();
    }
}