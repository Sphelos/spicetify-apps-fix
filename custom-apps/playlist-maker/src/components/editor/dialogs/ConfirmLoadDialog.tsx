import { getWorkflow } from 'custom-apps/playlist-maker/src/db/workflows/workflow-db';
import useDialogStore, {
    type DialogState,
} from 'custom-apps/playlist-maker/src/stores/dialog-store';
import useAppStore, {
    type AppState,
} from 'custom-apps/playlist-maker/src/stores/store';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ConfirmDialog } from '../../shared/ConfirmDialog';
import { useConfirmDialogState } from './useConfirmDialogState';

export function ConfirmLoadDialog(): JSX.Element {
    const { loadWorkflow }: Pick<AppState, 'loadWorkflow'> = useAppStore(
        useShallow((state) => ({ loadWorkflow: state.loadWorkflow })),
    );

    const { selectedWorkflow }: Pick<DialogState, 'selectedWorkflow'> = useDialogStore(
        useShallow((state) => {
            return {
                selectedWorkflow: state.selectedWorkflow,
            };
        }),
    );

    const { isOpen, closeDialog } = useConfirmDialogState(
        'showConfirmLoadModal',
        'setShowConfirmLoadModal',
    );

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onConfirm={async () => {
                closeDialog();

                if (selectedWorkflow === null) {
                    Spicetify.showNotification(
                        'Failed to load workflow',
                        true,
                        2000,
                    );
                    return;
                }

                const workflowToLoad = await getWorkflow(selectedWorkflow.id);

                if (workflowToLoad === undefined) {
                    Spicetify.showNotification(
                        'Failed to load workflow',
                        true,
                        2000,
                    );
                    return;
                }

                loadWorkflow(workflowToLoad);
                Spicetify.PopupModal.hide();
            }}
            onClose={closeDialog}
            onOutside={closeDialog}
            titleText="Load workflow"
            descriptionText="You have unsaved changes that will be lost. Confirm?"
        />
    );
}
