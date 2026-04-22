import { deleteWorkflow } from 'custom-apps/playlist-maker/src/db/workflows/workflow-db';
import useDialogStore, {
    type DialogState,
} from 'custom-apps/playlist-maker/src/stores/dialog-store';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ConfirmDialog } from '../../shared/ConfirmDialog';
import { useConfirmDialogState } from './useConfirmDialogState';

export function ConfirmDeleteDialog(): JSX.Element {
    const { selectedWorkflow }: Pick<DialogState, 'selectedWorkflow'> = useDialogStore(
        useShallow((state) => {
            return {
                selectedWorkflow: state.selectedWorkflow,
            };
        }),
    );

    const { isOpen, closeDialog } = useConfirmDialogState(
        'showConfirmDeleteModal',
        'setShowConfirmDeleteModal',
    );

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onConfirm={async () => {
                closeDialog();
                if (selectedWorkflow !== null) {
                    await deleteWorkflow(selectedWorkflow.id);
                }
            }}
            onClose={closeDialog}
            onOutside={closeDialog}
            titleText="Delete workflow"
            descriptionText={`Are you sure you want to delete the workflow "${selectedWorkflow?.name ?? ''}" ?`}
        />
    );
}
