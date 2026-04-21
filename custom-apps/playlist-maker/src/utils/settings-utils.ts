const CONFIRM_DIALOG_BACKDROP_KEY =
    'playlist-maker:confirm-dialog-backdrop-style';

export type ConfirmDialogBackdropStyle =
    | 'transparent'
    | 'light-dim'
    | 'shadow-only';

export const confirmDialogBackdropOptions: {
    value: ConfirmDialogBackdropStyle;
    label: string;
    description: string;
}[] = [
    {
        value: 'transparent',
        label: 'Transparent',
        description: 'No dimming or blur. Only the dialog card is shown.',
    },
    {
        value: 'light-dim',
        label: 'Light dim',
        description: 'A subtle dark overlay without blur.',
    },
    {
        value: 'shadow-only',
        label: 'Shadow only',
        description: 'No overlay. The card stands out using border and shadow.',
    },
];

export function getConfirmDialogBackdropStyle(): ConfirmDialogBackdropStyle {
    const value = Spicetify.LocalStorage.get(CONFIRM_DIALOG_BACKDROP_KEY);

    if (
        value === 'transparent' ||
        value === 'light-dim' ||
        value === 'shadow-only'
    ) {
        return value;
    }

    return 'light-dim';
}

export function setConfirmDialogBackdropStyle(
    value: ConfirmDialogBackdropStyle,
): void {
    Spicetify.LocalStorage.set(CONFIRM_DIALOG_BACKDROP_KEY, value);
}
