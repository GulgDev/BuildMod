import { MapInfo } from '../game-logic/map-info';
import { UIMenu } from '../ui/components/ui-menu';
import { UIPauseSign } from '../ui/components/ui-pause-sign';
import { UIRange } from '../ui/components/ui-range';
import { UIToolbarController } from '../ui/ui-toolbar-controller';
import { Game } from './game';
import { PlayerAccess } from './player-access';
export declare class PlayerUI {
    toolbarController: UIToolbarController;
    pauseSign: UIPauseSign;
    speedController: UIRange | null;
    menu: UIMenu | null;
    private autoSaveMessage;
    private controlsHint;
    private mapInfo;
    constructor(mapInfo?: MapInfo);
    updateToolbar(rights: PlayerAccess): void;
    addSpeedController(): void;
    removeSpeedController(): void;
    isMenuOpen(): boolean;
    isMouseCaptured(): boolean;
    toggleMenu(game: Game): void;
    showAutoSaveMessage(text: string, isError?: boolean): void;
    hideAutoSaveMessage(): void;
    addControlsHint(rights: PlayerAccess): void;
    setControlsHintState(state: 'none' | 'free' | 'arrow' | 'selected'): void;
    updateControlsHintRights(rights: PlayerAccess): void;
    dispose(): void;
}
