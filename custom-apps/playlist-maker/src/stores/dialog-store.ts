import { create } from 'zustand';
import type { SavedWorkflowMetadata } from '../db/workflows/saved-workflow';

export type ConfirmDialogOpenKey =
    | 'showConfirmNewModal'
    | 'showConfirmLoadModal'
    | 'showConfirmDeleteModal';

export type ConfirmDialogSetterKey =
    | 'setShowConfirmNewModal'
    | 'setShowConfirmLoadModal'
    | 'setShowConfirmDeleteModal';

export type DialogState = {
    showConfirmNewModal: boolean;
    showConfirmLoadModal: boolean;
    showConfirmDeleteModal: boolean;
    selectedWorkflow: SavedWorkflowMetadata | null;
    setShowConfirmNewModal: (show: boolean) => void;
    setShowConfirmLoadModal: (show: boolean) => void;
    setShowConfirmDeleteModal: (show: boolean) => void;
    setSelectedWorkflow: (workflow: SavedWorkflowMetadata | null) => void;
};

export const useDialogStore = create<DialogState>((set) => ({
    showConfirmNewModal: false,
    showConfirmLoadModal: false,
    showConfirmDeleteModal: false,
    selectedWorkflow: null,
    setShowConfirmNewModal: (show) => {
        set({ showConfirmNewModal: show });
    },
    setShowConfirmLoadModal: (show) => {
        set({ showConfirmLoadModal: show });
    },
    setShowConfirmDeleteModal: (show) => {
        set({ showConfirmDeleteModal: show });
    },
    setSelectedWorkflow: (workflow) => {
        set({ selectedWorkflow: workflow });
    },
}));

export default useDialogStore;
