export declare class LoginPage {
    private game;
    private canvas;
    private mainDiv;
    private isDeleted;
    private readonly CELL_SIZE;
    private readonly LEFT_PANEL_WIDTH;
    constructor(loginAction: () => void, reloadAction: () => void, goToGameAction: () => void);
    dispose(): void;
    private addStartButton;
    private makeGoToGameButton;
    private makeLoginWithGoogleButton;
    private resize;
    private update;
    private setChunk;
    private deleteChunk;
}
