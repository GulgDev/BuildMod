import { Wire } from "engine/entitites/wire";
import { CELL_SIZE, Game, GameHistory, KeyboardHandler, PlayerUI } from "logic-arrows";
import { mixin } from "mixin";

mixin("PlayerControls", (PlayerControls) => class extends PlayerControls {
    private activeWire: Wire;
    private activePoint: number;

    constructor(cnv: HTMLCanvasElement, game: Game, playerUI: PlayerUI, history: GameHistory | null = null) {
        super(cnv, game, playerUI, history);
        this["keyboardHandler"].keyDownCallback = this.customKeyDownCallback;
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mousedown", this.mouseDown);
        document.addEventListener("mouseup", this.mouseUp);
        document.addEventListener("contextmenu", this.rightClick);
    }

    public dispose(): void {
        super.dispose();
        document.removeEventListener("mousemove", this.mouseMove);
        document.removeEventListener("mousedown", this.mouseDown);
        document.removeEventListener("mouseup", this.mouseUp);
        document.removeEventListener("contextmenu", this.rightClick);
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
        const [x, y] = this.screenToWorld(ev.x, ev.y);
        if (this.activeWire) {
            this.activeWire.points[this.activePoint] = [x, y];
        }
    };

    private mouseDown = (ev: MouseEvent) => {
        const game: Game = this["game"];
        const [x, y] = this.screenToWorld(ev.x, ev.y);
        const [mouseX, mouseY] = [
            ev.x * window.devicePixelRatio / game.scale - game.offset[0] / CELL_SIZE,
            ev.y * window.devicePixelRatio / game.scale - game.offset[1] / CELL_SIZE
        ];
        if (ev.button !== 2) return;
        for (const entity of game.gameMap.entities) {
            if (entity instanceof Wire) {
                for (let i = 0; i < entity.points.length; i++) {
                    if (entity.points[i][0] === x && entity.points[i][1] === y) {
                        this.activeWire = entity;
                        this.activePoint = i;
                        return;
                    }
                }
            }
        }
        for (const entity of game.gameMap.entities) {
            if (entity instanceof Wire) {
                for (let i = 0; i < entity.points.length - 1; i++) {
                    const [x1, y1] = entity.points[i];
                    const [x2, y2] = entity.points[i + 1];
                    const d = Math.abs((y2 - y1) * (mouseX - 0.5) - (x2 - x1) * (mouseY - 0.5) + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
                    if (d < 0.16) {
                        entity.points.splice(i + 1, 0, [x, y]);
                        this.activeWire = entity;
                        this.activePoint = i + 1;
                        return;
                    }
                }
            }
        }
        this.activeWire = new Wire(game.gameMap);
        this.activeWire.points = [[x, y], [x, y]];
        game.gameMap.entities.add(this.activeWire);
        this.activePoint = 1;
    };

    private mouseUp = (ev: MouseEvent) => {
        if (ev.button !== 2) return;
        if (this.activeWire) {
            if (
                this.activePoint > 0 &&
                this.activeWire.points[this.activePoint][0] === this.activeWire.points[this.activePoint - 1][0] &&
                this.activeWire.points[this.activePoint][1] === this.activeWire.points[this.activePoint - 1][1]
            )
                this.activeWire.points.splice(this.activePoint - 1, 1);
            if (
                this.activePoint < this.activeWire.points.length - 1 &&
                this.activeWire.points[this.activePoint][0] === this.activeWire.points[this.activePoint + 1][0] &&
                this.activeWire.points[this.activePoint][1] === this.activeWire.points[this.activePoint + 1][1]
            )
                this.activeWire.points.splice(this.activePoint + 1, 1);
            if (this.activeWire.points.length < 2) {
                const game: Game = this["game"];
                game.gameMap.entities.delete(this.activeWire);
            }
        }
        this.activeWire = null;
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
        this["keyDownCallback"](code, key);
        const playerUI: PlayerUI = this["playerUI"];
        if (playerUI.isMenuOpen()) return;
        const game: Game = this["game"];
        switch (code) {
            case "KeyB":
                game.build();
                break;
        }
    };
});