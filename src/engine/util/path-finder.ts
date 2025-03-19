import Heap from "heap";
import { Arrow, GameMap } from "logic-arrows";

enum Opened {
    BY_START = 1,
    BY_END
}

interface PathNode {
    g?: number;
    f?: number;
    h?: number;
    x: number;
    y: number;
    walkable: boolean;
    parent?: PathNode;
    opened?: Opened;
    closed?: boolean;
}

const WEIGHT = 2;

function cmp(a: PathNode, b: PathNode) {
    return a.f - b.f;
}

function heuristic(dx: number, dy: number) {
    return Math.sqrt(dx * dx + dy * dy);
}

function checkArrow(arrow: Arrow, x: number, y: number) {
    if (!arrow || arrow.type === 0) return false;

    const targets = getTargettedArrows(arrow, 0, 0);
    for (const target of targets)
        if (target[0] === x && target[1] === y)
            return true;
    return false;
}

function getNextArrow(x: number, y: number, rotation: number, flipped: boolean, dy: number, dx: number): [number, number] {
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

function getTargettedArrows(arrow: Arrow, x: number, y: number): [number, number][] {
    switch (arrow?.type) {
        case 1:
        case 4:
        case 5:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 22:
        case 24:
            return [getNextArrow(x, y, arrow.rotation, arrow.flipped, -1, 0)];
        case 2:
        case 9:
        case 21:
            return [
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -1,  0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  0,  1),
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  1,  0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  0, -1)
            ];
        case 3:
        case 23:
            return [];
        case 6:
            return [
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -1, 0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  1, 0)
            ];
        case 7:
            return [
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -1, 0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  0, 1)
            ];
        case 8:
            return [
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  0, -1),
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -1,  0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  0,  1)
            ];
        case 10:
            return [getNextArrow(x, y, arrow.rotation, arrow.flipped, -2, 0)];
        case 11:
            return [getNextArrow(x, y, arrow.rotation, arrow.flipped, -1, 1)];
        case 12:
            return [
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -2, 0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -1, 0)
            ];
        case 13:
            return [
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -2, 0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped,  0, 1)
            ];
        case 14:
            return [
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -1, 0),
                getNextArrow(x, y, arrow.rotation, arrow.flipped, -1, 1)
            ];
        default:
            return [[x, y]];
    }
}

function backtrace(node1: PathNode, node2: PathNode) {
    const path: [number, number][] = [];
    do {
        path.unshift([node1.x, node1.y]);
        node1.walkable = false;
        node1 = node1.parent;
    } while (node1);
    do {
        path.push([node2.x, node2.y]);
        node2.walkable = false;
        node2 = node2.parent;
    } while (node2);
    return path;
}

export class PathTracer {
    private readonly nodes = new Map<string, PathNode>();

    constructor(private gameMap: GameMap) {}

    private getNodeAt(x: number, y: number): PathNode {
        const key = `${x},${y}`;
        let node = this.nodes.get(key);
        if (!node) {
            let walkable = this.gameMap.getArrowType(x, y) === 0 &&
            !(
                checkArrow(this.gameMap.getArrow(x,     y - 1),  0,  1) ||
                checkArrow(this.gameMap.getArrow(x + 1, y),     -1,  0) ||
                checkArrow(this.gameMap.getArrow(x,     y + 1),  0,  1) ||
                checkArrow(this.gameMap.getArrow(x - 1, y),      1,  0) ||
                checkArrow(this.gameMap.getArrow(x,     y - 2),  0,  2) ||
                checkArrow(this.gameMap.getArrow(x + 1, y - 1), -1,  1) ||
                checkArrow(this.gameMap.getArrow(x + 2, y),     -2,  0) ||
                checkArrow(this.gameMap.getArrow(x + 1, y + 1), -1, -1) ||
                checkArrow(this.gameMap.getArrow(x,     y + 2),  0, -2) ||
                checkArrow(this.gameMap.getArrow(x - 1, y + 1),  1, -1) ||
                checkArrow(this.gameMap.getArrow(x - 2, y),      2,  0) ||
                checkArrow(this.gameMap.getArrow(x - 1, y - 1),  1,  1)
            ) && this.gameMap.getEntities(x, y).length === 0;
            node = { x, y, walkable };
            this.nodes.set(key, node);
        }
        return node;
    }

    private getNeighbours(node: PathNode): PathNode[] {
        return [
            this.getNodeAt(node.x,     node.y - 1),
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
        this.nodes.forEach((node) => {
            node.opened = null;
            node.closed = false;
        });

        const [x1, y1] = origin;
        const [x2, y2] = target;

        const startOpenList = new Heap<PathNode>(cmp);
        const endOpenList = new Heap<PathNode>(cmp);
        
        for (const [x, y] of sources) {
            const startNode = this.getNodeAt(x, y);
            startNode.g = 0;
            startNode.f = 0;
            startOpenList.push(startNode);
            startNode.opened = Opened.BY_START;
        }

        const endNode = this.getNodeAt(x2, y2);
        endNode.g = 0;
        endNode.f = 0;
        endOpenList.push(endNode);
        endNode.opened = Opened.BY_END;

        while (!startOpenList.empty() && !endOpenList.empty()) {
            {
                const node = startOpenList.pop();
                node.closed = true;

                const neighbours = this.getNeighbours(node);
                for (const neighbour of neighbours) {
                    if (neighbour.closed || (!neighbour.walkable && neighbour !== endNode))
                        continue;

                    if (neighbour.opened === Opened.BY_END)
                        return backtrace(node, neighbour);

                    const ng = node.g + heuristic(neighbour.x - node.x, neighbour.y - node.y);

                    if (!neighbour.opened || ng < neighbour.g) {
                        neighbour.g = ng;
                        neighbour.h ??= WEIGHT * heuristic(x2 - neighbour.x, y2 - neighbour.y);
                        neighbour.f = neighbour.g + neighbour.h;
                        neighbour.parent = node;
        
                        if (!neighbour.opened) {
                            startOpenList.push(neighbour);
                            neighbour.opened = Opened.BY_START;
                        } else {
                            startOpenList.updateItem(neighbour);
                        }
                    }
                }
            }
            {
                const node = endOpenList.pop();
                node.closed = true;
        
                const neighbours = this.getNeighbours(node);
                for (const neighbour of neighbours) {
                    if (neighbour.closed || (!neighbour.walkable && neighbour !== endNode))
                        continue;

                    if (neighbour.opened === Opened.BY_START)
                        return backtrace(neighbour, node);

                    const ng = node.g + heuristic(neighbour.x - node.x, neighbour.y - node.y);

                    if (!neighbour.opened || ng < neighbour.g) {
                        neighbour.g = ng;
                        neighbour.h ??= WEIGHT * heuristic(x1 - neighbour.x, y1 - neighbour.y);
                        neighbour.f = neighbour.g + neighbour.h;
                        neighbour.parent = node;
        
                        if (!neighbour.opened) {
                            endOpenList.push(neighbour);
                            neighbour.opened = Opened.BY_END;
                        } else {
                            endOpenList.updateItem(neighbour);
                        }
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
        const arrow = this.gameMap.getArrow(x1, y1);
        const sources = getTargettedArrows(arrow, x1, y1).filter(([x, y]) => this.gameMap.getArrowType(x, y) === 0);
        const path = this.findPath([x1, y1], sources, [x2, y2]);
        if (!path) return false;
        this.tracePath(path);
        return true;
    }
}