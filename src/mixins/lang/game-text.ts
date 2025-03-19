import { I18nText } from "logic-arrows";
import { mixin } from "mixin";

declare module "logic-arrows" {
    export namespace GameText {
        export const UNSUPPORTED_GAME_VERSION: I18nText;
    }
}

mixin("GameText", (GameText) => ({
    ...GameText,

    UNSUPPORTED_GAME_VERSION: new I18nText(
        `Unsupported game version.\nHave Onigiri finally released 1.3???`,
        `Неподдерживаемая версия игры.\nНеужели Онигири выпустил 1.3???`,
        `Непідтримувана версія гри.\nНевже Онігірі випустив 1.3???`,
        `Непадтрымліваемая версія гульні.\nНяўжо Анігіры выпусціў 1.3???`,
        `Version du jeu non prise en charge.\nOnigiri a-t-il enfin publié la version 1.3???`
    )
}));