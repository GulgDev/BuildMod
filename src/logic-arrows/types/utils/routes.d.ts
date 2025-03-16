import { MapInfo } from '../game-logic/map-info';
export declare namespace Routes {
    function getURL(): string;
    function getMap(id: string, callback: (mapInfo: MapInfo) => void): void;
    function getMaps(ids: string[]): Promise<MapInfo[]>;
    function getMapsInfo(): Promise<MapInfo[]>;
    function saveMap(id: string, b64encoded: string): Promise<number>;
    function saveMapInfo(mapInfo: MapInfo, callback: ((responseStatus: number) => void)): void;
    function createMap(callback: ((mapInfo: MapInfo) => void)): void;
    function deleteMap(id: string, callback: (() => void)): void;
    function checkUser(okCallback: (userName: string) => void, noUserCallback: () => void): void;
    function checkNameChange(): Promise<boolean>;
    function logout(): void;
    function setName(name: string): Promise<boolean>;
    function getLevels(): Promise<number[]>;
    function completeLevel(level: number): Promise<void>;
}
