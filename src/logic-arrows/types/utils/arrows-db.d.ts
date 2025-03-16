export declare namespace ArrowsDB {
    function write(storeName: string, data: Object): Promise<void>;
    function read(storeName: string, key: string | number): Promise<Object>;
    function getAllKeys(storeName: string): Promise<string[]>;
}
