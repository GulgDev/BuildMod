import { EntityChangeType } from "engine/entitites/map-entity-change";
import { Wire } from "engine/entitites/wire";
import { CELL_SIZE, Game, GameHistory, KeyboardHandler, MouseHandler, PlayerUI } from "logic-arrows";
import { mixin } from "mixin";

mixin("PlayerControls", (PlayerControls) => class extends PlayerControls {
    private movingWires: { wire: Wire, point: number }[] = [];

    constructor(cnv: HTMLCanvasElement, game: Game, playerUI: PlayerUI, history: GameHistory | null = null) {
        super(cnv, game, playerUI, history);
        this["keyboardHandler"].keyDownCallback = this.customKeyDownCallback;
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mousedown", this.mouseDown, true);
        document.addEventListener("mouseup", this.mouseUp, true);
        document.addEventListener("contextmenu", this.rightClick);
    }

    public dispose(): void {
        super.dispose();
        document.removeEventListener("mousemove", this.mouseMove);
        document.removeEventListener("mousedown", this.mouseDown, true);
        document.removeEventListener("mouseup", this.mouseUp, true);
        document.removeEventListener("contextmenu", this.rightClick);
    }

    public update(): void {
        super.update();
        const game: Game = this["game"];
        const history: GameHistory = this["history"];
        const mouseHandler: MouseHandler = this["mouseHandler"];
        const keyboardHandler: KeyboardHandler = this["keyboardHandler"];
        if (keyboardHandler.getKeyPressed("KeyR")) {
            const [x, y] = [
                mouseHandler.getMousePosition()[0] * window.devicePixelRatio / game.scale - game.offset[0] / CELL_SIZE - 0.5,
                mouseHandler.getMousePosition()[1] * window.devicePixelRatio / game.scale - game.offset[1] / CELL_SIZE - 0.5
            ];
            for (const entity of game.gameMap.entities) {
                if (entity instanceof Wire) {
                    let [[x1, y1], [x2, y2]] = entity.points;
                    const minX = Math.min(x1, x2);
                    const maxX = Math.max(x1, x2);
                    const minY = Math.min(y1, y2);
                    const maxY = Math.max(y1, y2);
                    const maxD = 8 / game.scale;
                    if (x < minX - maxD || y < minY - maxD || x > maxX + maxD || y > maxY + maxD)
                        continue;
                    const d = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
                    if (d < maxD) {
                        entity.dispose();
                        history.addEntityChange({ type: EntityChangeType.REMOVED, entity });
                    }
                }
            }
        }
    }

    private screenToWorld(x: number, y: number): [number, number] {
        const game: Game = this["game"];
        const mouseFloatX: number = x * window.devicePixelRatio / game.scale - game.offset[0] / CELL_SIZE;
        const mouseFloatY: number = y * window.devicePixelRatio / game.scale - game.offset[1] / CELL_SIZE;
        const mouseX: number = ~~mouseFloatX - (mouseFloatX < 0 ? 1 : 0);
        const mouseY: number = ~~mouseFloatY - (mouseFloatY < 0 ? 1 : 0);
        return [mouseX, mouseY];
    }

    private mouseMove = (ev: MouseEvent) => {
        const history: GameHistory = this["history"];
        const [x, y] = this.screenToWorld(ev.x, ev.y);
        for (const { wire, point } of this.movingWires) {
            history.addEntityChange({ type: EntityChangeType.WIRE_MOVED, entity: wire, point: point, from: wire.points[point], to: [x, y] });
            wire.points[point] = [x, y];
        }
    };

    private mouseDown = (ev: MouseEvent) => {
        const game: Game = this["game"];
        const history: GameHistory = this["history"];
        const [x, y] = this.screenToWorld(ev.x, ev.y);
        switch (ev.button) {
            case 0:
                if (!this["freeCursor"]) return;
                for (const entity of game.gameMap.entities) {
                    if (entity instanceof Wire) {
                        for (let i = 0; i < entity.points.length; i++) {
                            if (entity.points[i][0] === x && entity.points[i][1] === y) {
                                ev.stopImmediatePropagation();
                                ev.stopPropagation();
                                this.movingWires.push({ wire: entity, point: i });
                            }
                        }
                    }
                }
                break;
            case 2:
                const wire = new Wire(game.gameMap);
                wire.points = [[x, y], [x, y]];
                this.movingWires = [{ wire, point: 1 }];
                history.addEntityChange({ type: EntityChangeType.SPAWNED, entity: wire });
                history.addEntityChange({ type: EntityChangeType.WIRE_MOVED, entity: wire, point: 0, from: [x, y], to: [x, y] });
                history.addEntityChange({ type: EntityChangeType.WIRE_MOVED, entity: wire, point: 1, from: [x, y], to: [x, y] });
                break;
        }
    };

    private mouseUp = (ev: MouseEvent) => {
        const history: GameHistory = this["history"];
        switch (ev.button) {
            case 0:
            case 2:
                if (this.movingWires.length > 0) {
                    ev.stopImmediatePropagation();
                    ev.stopPropagation();
                    for (const { wire } of this.movingWires) {
                        const [[x1, y1], [x2, y2]] = wire.points;
                        if (x1 === x2 && y1 === y2) {
                            history.addEntityChange({ type: EntityChangeType.REMOVED, entity: wire });
                            wire.dispose();
                        }
                    }
                }
                this.movingWires = [];
                break;
        }
    };

    private rightClick = (ev: MouseEvent) => {
        ev.preventDefault();
    };

    private customKeyDownCallback = (code: string, key: string) => {
        const keyboardHandler: KeyboardHandler = this["keyboardHandler"];
        const shiftPressed = keyboardHandler.getShiftPressed();
        const metaPressed = keyboardHandler.getKeyPressed("MetaLeft") || keyboardHandler.getKeyPressed("MetaRight");
        if (metaPressed) {
            return;
        }
        const playerUI: PlayerUI = this["playerUI"];
        if (!playerUI.isMenuOpen()) {
            const game: Game = this["game"];
            switch (code) {
                case "KeyB":
                    game.build();
                    return;
                case "KeyM":
                    game.clean();
                    return;
            }
        }
        this["keyDownCallback"](code, key);
    };
});