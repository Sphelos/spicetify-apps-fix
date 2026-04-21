import useDialogStore, {
    type DialogState,
} from 'custom-apps/playlist-maker/src/stores/dialog-store';
import useAppStore, {
    type AppState,
} from 'custom-apps/playlist-maker/src/stores/store';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ConfirmDialog } from '../../shared/ConfirmDialog';

export function ConfirmNewDialog(): JSX.Element {
    const { resetState }: Pick<AppState, 'resetState'> = useAppStore(
        useShallow((state) => ({ resetState: state.resetState })),
    );

    const {
        showConfirmNewModal,
        setShowConfirmNewModal,
    }: Pick<DialogState, 'showConfirmNewModal' | 'setShowConfirmNewModal'> =
        useDialogStore(
            useShallow((state) => {
                return {
                    showConfirmNewModal: state.showConfirmNewModal,
                    setShowConfirmNewModal: state.setShowConfirmNewModal,
                };
            }),
        );

    return (
        <ConfirmDialog
            isOpen={showConfirmNewModal}
            onConfirm={() => {
                setShowConfirmNewModal(false);
                resetState();
            }}
            onClose={() => {
                setShowConfirmNewModal(false);
            }}
            onOutside={() => {
                setShowConfirmNewModal(false);
            }}
            titleText="Create new workflow"
            descriptionText="You have unsaved changes that will be lost. Confirm?"
        />
    );
}
