import { UIComponent } from './ui-component';
export declare class UIMapsMenuItem extends UIComponent {
    constructor(parent: HTMLElement, text: string, onClick: () => void);
    getClass(): string;
}
