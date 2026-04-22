import { TextComponent } from '@shared/components/ui/TextComponent/TextComponent';
import { JSDOM } from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';

type ReactComponentButtonProps = {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
};

let container: HTMLDivElement;
let root: ReactDOM.Root | undefined;

async function flush(): Promise<void> {
    await new Promise((resolve) => {
        setTimeout(resolve, 0);
    });
}

async function render(ui: React.ReactNode): Promise<void> {
    root?.render(ui);
    await flush();
}

beforeEach(() => {
    const dom = new JSDOM('<!doctype html><html><body></body></html>');

    globalThis.window = dom.window as unknown as Window & typeof globalThis;
    globalThis.document = dom.window.document;
    globalThis.KeyboardEvent = dom.window.KeyboardEvent;
    globalThis.MouseEvent = dom.window.MouseEvent;

    Object.defineProperty(globalThis, 'navigator', {
        value: dom.window.navigator,
        configurable: true,
    });

    globalThis.Spicetify = {
        ReactDOM: {
            createPortal: (node: React.ReactNode) => node,
        },
        ReactComponent: {
            ButtonPrimary: ({
                children,
                disabled,
                onClick,
            }: ReactComponentButtonProps) => (
                <button
                    data-testid="button-primary"
                    disabled={disabled}
                    onClick={onClick}
                    type="button"
                >
                    {children}
                </button>
            ),
            ButtonSecondary: ({
                children,
                disabled,
                onClick,
            }: ReactComponentButtonProps) => (
                <button
                    data-testid="button-secondary"
                    disabled={disabled}
                    onClick={onClick}
                    type="button"
                >
                    {children}
                </button>
            ),
        },
        LocalStorage: {
            get: vi.fn(() => 'light-dim'),
            set: vi.fn(),
            remove: vi.fn(),
        },
    } as unknown as typeof Spicetify;

    container = document.createElement('div');
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
});

afterEach(() => {
    root?.unmount();
    container.remove();
    vi.restoreAllMocks();
});

vi.mock('@shared/components/ui/TextComponent/TextComponent', () => ({
    TextComponent: ({
        children,
        elementType = 'span',
        ...props
    }: {
        children?: React.ReactNode;
        elementType?: keyof JSX.IntrinsicElements;
    }) => React.createElement(elementType, props, children),
}));

describe('ConfirmDialog', () => {
    it('renders title and description when open', async () => {
        await render(
            <ConfirmDialog
                isOpen
                titleText="Delete workflow"
                descriptionText="Are you sure?"
                onConfirm={vi.fn()}
            />,
        );

        expect(document.body.textContent).toContain('Delete workflow');
        expect(document.body.textContent).toContain('Are you sure?');
    });

    it('calls onClose when cancel is clicked', async () => {
        const onClose = vi.fn();

        await render(
            <ConfirmDialog
                isOpen
                titleText="Delete workflow"
                onConfirm={vi.fn()}
                onClose={onClose}
            />,
        );

        document
            .querySelector('[data-testid="button-secondary"]')
            ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await flush();

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm when confirm is clicked', async () => {
        const onConfirm = vi.fn();

        await render(
            <ConfirmDialog
                isOpen
                titleText="Delete workflow"
                onConfirm={onConfirm}
            />,
        );

        document
            .querySelector('[data-testid="button-primary"]')
            ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await flush();

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onOutside and onClose when backdrop is clicked', async () => {
        const onOutside = vi.fn();
        const onClose = vi.fn();

        await render(
            <ConfirmDialog
                isOpen
                titleText="Delete workflow"
                onConfirm={vi.fn()}
                onClose={onClose}
                onOutside={onOutside}
            />,
        );

        document
            .querySelector('[role="dialog"]')
            ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await flush();

        expect(onOutside).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('applies the light-dim overlay by default', async () => {
        await render(
            <ConfirmDialog
                isOpen
                titleText="Delete workflow"
                onConfirm={vi.fn()}
            />,
        );

        const overlay = document.querySelector('[role="dialog"]');

        expect(overlay).not.toBeNull();
        expect(
            overlay instanceof window.HTMLElement &&
                overlay.style.backgroundColor,
        ).toBe('rgba(0, 0, 0, 0.16)');
    });

    it('uses the configured transparent backdrop style', async () => {
        vi.mocked(Spicetify.LocalStorage.get).mockReturnValue('transparent');

        await render(
            <ConfirmDialog
                isOpen
                titleText="Delete workflow"
                onConfirm={vi.fn()}
            />,
        );

        const overlay = document.querySelector('[role="dialog"]');

        expect(overlay).not.toBeNull();
        expect(
            overlay instanceof window.HTMLElement &&
                overlay.style.backgroundColor,
        ).toBe('transparent');
    });
});
