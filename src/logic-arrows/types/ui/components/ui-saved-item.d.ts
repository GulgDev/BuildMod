import { MapInfo } from '../../game-logic/map-info';
import { UIComponent } from './ui-component';
export declare class UISavedItem extends UIComponent {
    constructor(parent: HTMLElement, mapObject: MapInfo, onClick: (mapObject: MapInfo) => void);
    dispose(): void;
    getClass(): string;
}
