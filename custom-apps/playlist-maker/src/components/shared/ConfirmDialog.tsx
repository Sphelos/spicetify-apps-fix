import { useEffect, useRef } from 'react';

type ConfirmDialogProps = {
    isOpen: boolean;
    titleText: string;
    descriptionText?: string;
    onConfirm: () => void | Promise<void>;
    onClose?: () => void;
    onOutside?: () => void;
};

export function ConfirmDialog({
    isOpen,
    titleText,
    descriptionText,
    onConfirm,
    onClose,
    onOutside,
}: ConfirmDialogProps): JSX.Element | null {
    const handledRef = useRef(false);

    useEffect(() => {
        if (!isOpen) {
            handledRef.current = false;
            return;
        }

        if (handledRef.current) {
            return;
        }

        handledRef.current = true;

        const message = descriptionText
            ? `${titleText}\n\n${descriptionText}`
            : titleText;

        window.setTimeout(() => {
            if (window.confirm(message)) {
                void onConfirm();
                return;
            }

            onClose?.();
            onOutside?.();
        }, 0);
    }, [descriptionText, isOpen, onClose, onConfirm, onOutside, titleText]);

    return null;
}
