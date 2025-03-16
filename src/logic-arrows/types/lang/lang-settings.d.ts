import { LangType } from './lang-type';
export declare namespace LangSettings {
    const languages: Readonly<LangType[]>;
    const languageNames: Readonly<string[]>;
    const htmlCodes: Readonly<string[]>;
    function getLanguage(): LangType;
    function setLanguage(lang: LangType): void;
}
