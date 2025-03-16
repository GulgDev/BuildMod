type LangTextFunction = string | ((args: string[]) => string);
export declare class I18nText {
    private readonly en;
    private readonly ru;
    private readonly ua;
    private readonly by;
    private readonly fr;
    constructor(en: LangTextFunction, ru: LangTextFunction, ua: LangTextFunction, by: LangTextFunction, fr: LangTextFunction);
    get(...args: string[]): string;
}
export {};
