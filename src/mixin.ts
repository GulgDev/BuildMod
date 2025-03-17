import LogicArrows from "./logic-arrows";

const mixins: { [key in keyof typeof LogicArrows]?: ((exp: typeof LogicArrows[key]) => typeof LogicArrows[key])[] } = {};
const dependencies: { [key in keyof typeof LogicArrows]?: ((exp: typeof LogicArrows[key]) => void)[] } = {};

export function mixin<T extends keyof typeof mixins>(key: T, ...mixinFuncs: typeof mixins[T]) {
    if (!(key in mixins)) mixins[key] = [];
    mixins[key].push(...mixinFuncs);
}

export function depend<T extends keyof typeof dependencies>(key: T, ...dependants: typeof dependencies[T]) {
    if (!(key in dependencies)) dependencies[key] = [];
    dependencies[key].push(...dependants);
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
        for (const key in exports) {
            if (key in mixins)
                for (const mixin of mixins[key as keyof typeof LogicArrows])
                    exports[key] = mixin(exports[key]);
            if (key in dependencies)
                for (const dependant of dependencies[key as keyof typeof LogicArrows])
                    dependant(exports[key]);
        }
        Object.assign(LogicArrows, exports);
        return;
    }
    return call.apply(this, arguments);
};

document.addEventListener("load", () => Function.prototype.call = call);