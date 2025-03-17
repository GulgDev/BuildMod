import Heap from "heap";
import { Arrow, GameMap } from "logic-arrows";

interface PathNode {
    g?: number;
    f?: number;
    h?: number;
    x: number;
    y: number;
    walkable: boolean;
    parent?: PathNode;
    opened?: boolean;
    closed?: boolean;
}

//const ENDPOINT_WEIGHT = 0xCABA1ABA; // 🐸
//const LINE_DISTANCE_WEIGHT = 0xBABA1ABA;
const ENDPOINT_WEIGHT = 1;
const LINE_DISTANCE_WEIGHT = 0;

function heuristic(dx: number, dy: number) {
    return Math.sqrt(dx * dx + dy * dy);
}

function checkArrow(arrow: Arrow, type: number, dy: number, dx: number, x: number, y: number) {
    if (!arrow) return false;
    let x2 = 0, y2 = 0;
    if (arrow.flipped) dx = -dx;
    switch (arrow.rotation) {
        case 0:
            x2 += dy;
            y2 += dx;
            break;
        case 1:
            x2 -= dy;
            y2 += dx;
            break;
        case 2:
            y2 -= dy;
            x2 -= dx;
            break;
        case 3:
            x2 += dy;
            y2 -= dx;
            break;
    }
    return arrow.type === type && x2 === x && y2 === y;
}

function getNextArrow(x: number, y: number, rotation: number, flipped: boolean, dx: number, dy: number): [number, number] {
    if (flipped) dx = -dx;
    switch (rotation) {
        case 0:
            y += dy;
            x += dx;
            break;
        case 1:
            x -= dy;
            y += dx;
            break;
        case 2:
            y -= dy;
            x -= dx;
            break;
        case 3:
            x += dy;
            y -= dx;
            break;
    }
    return [x, y];
}

export class PathTracer {
    private readonly nodes = new Map<string, PathNode>();

    constructor(private gameMap: GameMap) {}

    private getNodeAt(x: number, y: number): PathNode {
        const key = `${x},${y}`;
        let node = this.nodes.get(key);
        if (!node) {
            let walkable = this.gameMap.getArrowType(x, y) === 0 /*&&
            !(
                checkArrow(this.gameMap.getArrow(x,     y - 1), 1,  -1, 0,  0,  1) ||
                checkArrow(this.gameMap.getArrow(x + 1, y),     1,  -1, 0, -1,  0) ||
                checkArrow(this.gameMap.getArrow(x,     y + 1), 1,  -1, 0,  0,  1) ||
                checkArrow(this.gameMap.getArrow(x - 1, y),     1,  -1, 0,  1,  0) ||
                checkArrow(this.gameMap.getArrow(x,     y - 2), 10, -2, 0,  0,  2) ||
                checkArrow(this.gameMap.getArrow(x + 1, y - 1), 11, -1, 1, -1,  1) ||
                checkArrow(this.gameMap.getArrow(x + 2, y),     10, -2, 0, -2,  0) ||
                checkArrow(this.gameMap.getArrow(x + 1, y + 1), 11, -1, 1, -1, -1) ||
                checkArrow(this.gameMap.getArrow(x,     y + 2), 10, -2, 0,  0, -2) ||
                checkArrow(this.gameMap.getArrow(x - 1, y + 1), 11, -1, 1,  1, -1) ||
                checkArrow(this.gameMap.getArrow(x - 2, y),     10, -2, 0,  2,  0) ||
                checkArrow(this.gameMap.getArrow(x - 1, y - 1), 11, -1, 1,  1,  1)
            )*/ && this.gameMap.getEntities(x, y).length === 0;
            node = { x, y, walkable };
            this.nodes.set(key, node);
        }
        return node;
    }

    private getNeighbours(node: PathNode): PathNode[] {
        return [
            this.getNodeAt(node.x,     node.y - 1), // TODO
            this.getNodeAt(node.x + 1, node.y),
            this.getNodeAt(node.x,     node.y + 1),
            this.getNodeAt(node.x - 1, node.y),
            this.getNodeAt(node.x,     node.y - 2),
            this.getNodeAt(node.x + 1, node.y - 1),
            this.getNodeAt(node.x + 2, node.y),
            this.getNodeAt(node.x + 1, node.y + 1),
            this.getNodeAt(node.x,     node.y + 2),
            this.getNodeAt(node.x - 1, node.y + 1),
            this.getNodeAt(node.x - 2, node.y),
            this.getNodeAt(node.x - 1, node.y - 1),
        ];
    }

    private findPath(origin: [number, number], sources: [number, number][], target: [number, number]): [number, number][] {
        const [x1, y1] = origin;
        const [x2, y2] = target;

        const openList = new Heap<PathNode>((a, b) => a.f - b.f);
        const endNode = this.getNodeAt(x2, y2);
        
        for (const [x, y] of sources) {
            const startNode = this.getNodeAt(x, y);
            startNode.g = 0;
            startNode.f = 0;

            openList.push(startNode);
            startNode.opened = true;
        }

        while (!openList.empty()) {
            let node = openList.pop();
            node.closed = true;

            if (node === endNode) {
                const path: [number, number][] = [];
                do {
                    path.unshift([node.x, node.y]);
                    node.walkable = false;
                    node = node.parent;
                } while (node);
                return path;
            }

            const neighbours = this.getNeighbours(node);

            const dx = x2 - x1;
            const dy = y2 - y1;
            const m = x2 * y1 - y1 * x1;

            for (const neighbour of neighbours) {
                if (neighbour.closed || (!neighbour.walkable && neighbour !== endNode))
                    continue;

                const ng = node.g + ((neighbour.x - node.x === 0 || neighbour.y - node.y === 0) ? 1 : Math.SQRT2);

                if (!neighbour.opened || ng < neighbour.g) {
                    neighbour.g = ng;
                    neighbour.h = neighbour.h ??
                        ENDPOINT_WEIGHT * heuristic(x2 - neighbour.x, y2 - neighbour.y) +
                        LINE_DISTANCE_WEIGHT * Math.abs(dy * neighbour.x - dy * neighbour.y + m) / Math.sqrt(dx * dx + dy * dy);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.parent = node;
    
                    if (!neighbour.opened) {
                        openList.push(neighbour);
                        neighbour.opened = true;
                    } else {
                        openList.updateItem(neighbour);
                    }
                }
            }
        }
    }

    private tracePath(path: [number, number][]): void {
        path.forEach(([x1, y1], i) => {
            if (i === path.length - 1) return;
            const [x2, y2] = path[i + 1];
            const dx = x2 - x1;
            const dy = y2 - y1;
            let rotation: number;
            let arrowType: number;
            if (dx < 0) {
                if (dy < 0) {
                    rotation = 3;
                    arrowType = 11;
                } else if (dy > 0) {
                    rotation = 2;
                    arrowType = 11;
                } else {
                    rotation = 3;
                    arrowType = dx === -2 ? 10 : 1;
                }
            } else if (dx > 0) {
                if (dy < 0) {
                    rotation = 0;
                    arrowType = 11;
                } else if (dy > 0) {
                    rotation = 1;
                    arrowType = 11;
                } else {
                    rotation = 1;
                    arrowType = dx === 2 ? 10 : 1;
                }
            } else {
                rotation = dy > 0 ? 2 : 0;
                arrowType = dy === 2 || dy === -2 ? 10 : 1;
            }
            this.gameMap.setArrowType(x1, y1, arrowType, false);
            this.gameMap.setArrowRotation(x1, y1, rotation, false);
        });
    }

    trace(x1: number, y1: number, x2: number, y2: number): boolean {
        let sources: [number, number][];
        const arrow = this.gameMap.getArrow(x1, y1);
        switch (arrow?.type) {
            case 1:
                sources = [getNextArrow(x1, y1, arrow.rotation, arrow.flipped, -1, 0)];
                break;
            case 2:
                sources = [
                    getNextArrow(x1, y1, arrow.rotation, arrow.flipped, -1,  0),
                    getNextArrow(x1, y1, arrow.rotation, arrow.flipped,  0,  1),
                    getNextArrow(x1, y1, arrow.rotation, arrow.flipped,  1,  0),
                    getNextArrow(x1, y1, arrow.rotation, arrow.flipped,  0, -1)
                ];
                break;
            default:
                sources = [[x1, y1]];
                break;
        }
        const path: [number, number][] = this.findPath([x1, y1], sources, [x2, y2]);
        if (!path) return false;
        this.tracePath(path);
        return true;
    }
}