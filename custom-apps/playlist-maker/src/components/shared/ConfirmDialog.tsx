import React, { useEffect, useState } from 'react';
import { TextComponent } from '@shared/components/ui/TextComponent/TextComponent';
import {
    getConfirmDialogBackdropStyle,
    type ConfirmDialogBackdropStyle,
} from '../../utils/settings-utils';

type ConfirmDialogProps = {
    isOpen: boolean;
    titleText: string;
    descriptionText?: string;
    onConfirm: () => void | Promise<void>;
    onClose?: () => void;
    onOutside?: () => void;
    confirmText?: string;
    cancelText?: string;
};

export function ConfirmDialog({
    isOpen,
    titleText,
    descriptionText,
    onConfirm,
    onClose,
    onOutside,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}: ConfirmDialogProps): JSX.Element | null {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const backdropStyle: ConfirmDialogBackdropStyle =
        getConfirmDialogBackdropStyle();

    const overlayStyle =
        backdropStyle === 'light-dim'
            ? {
                  backgroundColor: 'rgba(0, 0, 0, 0.16)',
              }
            : { backgroundColor: 'transparent' };

    const cardStyle =
        backdropStyle === 'shadow-only'
            ? {
                  boxShadow: '0 22px 56px rgba(0, 0, 0, 0.28)',
                  border: '1px solid rgba(var(--spice-rgb-shadow), 0.12)',
              }
            : {
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(var(--spice-rgb-shadow), 0.08)',
              };

    useEffect(() => {
        if (!isOpen) {
            setIsSubmitting(false);
            return;
        }

        const onKeyDown = (event: KeyboardEvent): void => {
            if (event.key !== 'Escape' || isSubmitting) {
                return;
            }

            onClose?.();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, isSubmitting, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleConfirm = async (): Promise<void> => {
        setIsSubmitting(true);

        try {
            await onConfirm();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOutside = (): void => {
        if (isSubmitting) {
            return;
        }

        onOutside?.();
        onClose?.();
    };

    return Spicetify.ReactDOM.createPortal(
        <div
            aria-modal="true"
            role="dialog"
            onClick={handleOutside}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                ...overlayStyle,
            }}
        >
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                style={{
                    width: 'min(440px, 100%)',
                    borderRadius: '16px',
                    padding: '24px',
                    background:
                        'linear-gradient(180deg, var(--spice-card) 0%, var(--spice-main-elevated) 100%)',
                    ...cardStyle,
                }}
            >
                <div className="flex flex-col gap-3">
                    <TextComponent
                        elementType="h2"
                        variant="canon"
                        weight="bold"
                    >
                        {titleText}
                    </TextComponent>

                    {descriptionText !== undefined &&
                        descriptionText !== '' && (
                            <TextComponent semanticColor="textSubdued">
                                {descriptionText}
                            </TextComponent>
                        )}

                    <div className="mt-4 flex justify-end gap-2">
                        <Spicetify.ReactComponent.ButtonSecondary
                            buttonSize="sm"
                            disabled={isSubmitting}
                            onClick={handleOutside}
                        >
                            {cancelText}
                        </Spicetify.ReactComponent.ButtonSecondary>
                        <Spicetify.ReactComponent.ButtonPrimary
                            buttonSize="sm"
                            disabled={isSubmitting}
                            onClick={() => {
                                void handleConfirm();
                            }}
                        >
                            {confirmText}
                        </Spicetify.ReactComponent.ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
}
