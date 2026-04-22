import { describe, expect, it, vi } from 'vitest';
import {
    resolveConfirmDialogBackdropStyle,
    setConfirmDialogBackdropStyle,
} from './settings-utils';

describe('settings-utils', () => {
    it('falls back to light-dim for invalid stored values', () => {
        expect(resolveConfirmDialogBackdropStyle(undefined)).toBe('light-dim');
        expect(resolveConfirmDialogBackdropStyle(null)).toBe('light-dim');
        expect(resolveConfirmDialogBackdropStyle('blur-everything')).toBe(
            'light-dim',
        );
    });

    it('keeps supported backdrop values unchanged', () => {
        expect(resolveConfirmDialogBackdropStyle('transparent')).toBe(
            'transparent',
        );
        expect(resolveConfirmDialogBackdropStyle('light-dim')).toBe(
            'light-dim',
        );
        expect(resolveConfirmDialogBackdropStyle('shadow-only')).toBe(
            'shadow-only',
        );
    });

    it('writes a safe value back to local storage', () => {
        const set = vi.fn();

        globalThis.Spicetify = {
            LocalStorage: {
                get: vi.fn(),
                set,
                remove: vi.fn(),
            },
        } as unknown as typeof Spicetify;

        setConfirmDialogBackdropStyle('light-dim');

        expect(set).toHaveBeenCalledWith(
            'playlist-maker:confirm-dialog-backdrop-style',
            'light-dim',
        );
    });
});
