import { Game } from '../../player/game';
import { UIComponent } from './ui-component';
export declare class UIGameView extends UIComponent {
    readonly game: Game;
    private time;
    private isDeleted;
    private resizeAction;
    constructor(parent: HTMLElement, save: string);
    getClass(): string;
    setResizeAction(action: () => void): void;
    remove(): void;
    private resize;
    private update;
}
