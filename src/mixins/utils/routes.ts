import { mixin } from "mixin";

declare module "logic-arrows" {
    export namespace Routes {
        let lastSaveTime: number;
    }
}

mixin("Routes", (Routes) => ({
    ...Routes,
    lastSaveTime: 0,
    async saveMap(id: string, b64encoded: string): Promise<number> {
        const status: number = await Routes.saveMap(id, b64encoded);
        if (status === 200) this.lastSaveTime = Date.now();
        return status;
    }
}));