import { PlayerAccess } from '../../player/player-access';
import { UIComponent } from './ui-component';
export declare class UIControlsHint extends UIComponent {
    private hint;
    private rights;
    private state;
    constructor(parent: HTMLElement, rights: PlayerAccess);
    updateRights(rights: PlayerAccess): void;
    setState(state: 'none' | 'free' | 'arrow' | 'selected'): void;
    private showFreeCursorHint;
    private showArrowCursorHint;
    private showSelectedHint;
    hide(): void;
    getClass(): string;
    private replaceInlineKeys;
}
