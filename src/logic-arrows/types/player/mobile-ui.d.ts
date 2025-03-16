import { UIUndoButton } from "../ui/components/ui-undo-button";
export declare class MobileUI {
    undoButton: UIUndoButton | null;
    redoButton: UIUndoButton | null;
    private undoCallback;
    private redoCallback;
    constructor();
    setUndoCallback(callback: () => void): void;
    setRedoCallback(callback: () => void): void;
}
