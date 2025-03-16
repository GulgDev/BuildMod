import { MapInfo } from '../../game-logic/map-info';
import { Game } from '../../player/game';
import { UIPanel } from './ui-panel';
export declare class UIMenu extends UIPanel {
    private savingDiv;
    private messagePanelDiv;
    constructor(parent: HTMLElement, mapInfo: MapInfo, game: Game);
    private saveMap;
    private setSaving;
    private setSaved;
}
