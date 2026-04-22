import useDialogStore, {
    type ConfirmDialogOpenKey,
    type ConfirmDialogSetterKey,
} from 'custom-apps/playlist-maker/src/stores/dialog-store';
import { useShallow } from 'zustand/react/shallow';

export function useConfirmDialogState<
    TOpenKey extends ConfirmDialogOpenKey,
    TSetterKey extends ConfirmDialogSetterKey,
>(openKey: TOpenKey, setterKey: TSetterKey): {
    isOpen: boolean;
    closeDialog: () => void;
} {
    return useDialogStore(
        useShallow((state) => ({
            isOpen: state[openKey],
            closeDialog: () => {
                state[setterKey](false);
            },
        })),
    );
}
