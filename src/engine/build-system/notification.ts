export class BuildNotification {
    private readonly element: HTMLSpanElement;

    constructor(parent: HTMLElement, public readonly type: NotificationType, x: number, y: number, message: string) {
        this.element = document.createElement("span");
        this.element.className = `notification ${type}`;
        this.element.style.left = `${x + 12}px`;
        this.element.style.top = `${y + 12}px`;
        this.element.title = message;
        parent.appendChild(this.element);
    }

    dispose(): void {
        this.element.remove();
    }

    update(offset: [number, number], scale: number) {
        this.element.style.transform = `translate(${offset[0]}px, ${offset[1]}px)`;
    }
}

export enum NotificationType {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error"
}