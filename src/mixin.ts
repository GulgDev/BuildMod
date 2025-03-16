import { LogicArrows } from "./logic-arrows";

const mixins: { [key in keyof typeof LogicArrows]?: (exp: typeof LogicArrows[key]) => any } = {};

export function mixin<T extends keyof typeof mixins>(key: T, mixin: typeof mixins[T]) {
    mixins[key] = mixin;
}

const { call } = Function.prototype;
Function.prototype.call = function(thisArg, module, exports, require) {
    if (
        thisArg != null && typeof thisArg === "object" &&
        module != null && typeof module === "object" &&
        exports != null && typeof exports === "object" &&
        typeof require === "function" &&
        module.exports === exports &&
        thisArg === exports
    ) {
        call.apply(this, arguments);
        for (const key in exports)
            if (key in mixins)
                exports[key] = mixins[key as keyof typeof LogicArrows](exports[key]);
        Object.assign(LogicArrows, exports);
        return;
    }
    return call.apply(this, arguments);
};

document.addEventListener("load", () => Function.prototype.call = call);