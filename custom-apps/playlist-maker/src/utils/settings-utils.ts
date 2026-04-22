import { z } from 'zod';

const CONFIRM_DIALOG_BACKDROP_KEY =
    'playlist-maker:confirm-dialog-backdrop-style';

const confirmDialogBackdropStyleSchema = z.enum([
    'transparent',
    'light-dim',
    'shadow-only',
]);

const defaultConfirmDialogBackdropStyle: ConfirmDialogBackdropStyle =
    'light-dim';

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

export function resolveConfirmDialogBackdropStyle(
    value: string | null | undefined,
): ConfirmDialogBackdropStyle {
    const result = confirmDialogBackdropStyleSchema.safeParse(value);

    if (result.success) {
        return result.data;
    }

    return defaultConfirmDialogBackdropStyle;
}

export function getConfirmDialogBackdropStyle(): ConfirmDialogBackdropStyle {
    const value = Spicetify.LocalStorage.get(CONFIRM_DIALOG_BACKDROP_KEY);

    return resolveConfirmDialogBackdropStyle(value);
}

export function setConfirmDialogBackdropStyle(
    value: ConfirmDialogBackdropStyle,
): void {
    Spicetify.LocalStorage.set(
        CONFIRM_DIALOG_BACKDROP_KEY,
        resolveConfirmDialogBackdropStyle(value),
    );
}
