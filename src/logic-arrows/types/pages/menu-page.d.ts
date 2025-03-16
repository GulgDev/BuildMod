import { MenuPageType } from './menu-page-type';
import { Page } from './page';
export declare class MenuPage {
    page: Page | null;
    private readonly mainDiv;
    private readonly sideBar;
    private readonly content;
    private selectedCategory;
    private categories;
    private action;
    constructor(firstPage: MenuPageType, action: (pageType: MenuPageType) => void);
    setCategory(category: MenuPageType): void;
    getContent(): HTMLDivElement;
    dispose(): void;
    private addMenuItem;
    private updateSelectedCategory;
}
