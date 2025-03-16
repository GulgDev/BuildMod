import { MapInfo } from '../game-logic/map-info';
import { Page } from './page';
export declare class MapsPage extends Page {
    constructor(onMapClick: (map: MapInfo) => void, parent?: HTMLElement | undefined);
    getClass(): string;
    private addNewMapButton;
    private loadMaps;
    private loadMapsOffline;
    private getCachedMapData;
    private cacheMapData;
    private isMapInfo;
}
