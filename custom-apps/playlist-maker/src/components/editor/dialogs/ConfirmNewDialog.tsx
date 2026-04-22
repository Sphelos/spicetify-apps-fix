import useAppStore, {
    type AppState,
} from 'custom-apps/playlist-maker/src/stores/store';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ConfirmDialog } from '../../shared/ConfirmDialog';
import { useConfirmDialogState } from './useConfirmDialogState';

export function ConfirmNewDialog(): JSX.Element {
    const { resetState }: Pick<AppState, 'resetState'> = useAppStore(
        useShallow((state) => ({ resetState: state.resetState })),
    );

    const { isOpen, closeDialog } = useConfirmDialogState(
        'showConfirmNewModal',
        'setShowConfirmNewModal',
    );

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onConfirm={() => {
                closeDialog();
                resetState();
            }}
            onClose={closeDialog}
            onOutside={closeDialog}
            titleText="Create new workflow"
            descriptionText="You have unsaved changes that will be lost. Confirm?"
        />
    );
}
