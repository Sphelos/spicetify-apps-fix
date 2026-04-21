import { TextComponent } from '@shared/components/ui/TextComponent/TextComponent';
import React from 'react';
import {
    confirmDialogBackdropOptions,
    getConfirmDialogBackdropStyle,
    setConfirmDialogBackdropStyle,
    type ConfirmDialogBackdropStyle,
} from '../../utils/settings-utils';

export function ConfirmationModalSettings(): JSX.Element {
    const [confirmDialogBackdropStyle, setBackdropStyle] =
        React.useState<ConfirmDialogBackdropStyle>(
            getConfirmDialogBackdropStyle(),
        );

    const onBackdropStyleChanged = (
        value: ConfirmDialogBackdropStyle,
    ): void => {
        setBackdropStyle(value);
        setConfirmDialogBackdropStyle(value);
        Spicetify.showNotification('Confirmation modal style updated', false);
    };

    return (
        <div className="mb-6 rounded-md border border-solid border-(--essential-subdued) p-4">
            <TextComponent elementType="h1">Confirmation modal</TextComponent>
            <TextComponent
                elementType="p"
                fontSize="small"
                semanticColor="textSubdued"
            >
                Choose how the background should look behind confirmation
                dialogs.
            </TextComponent>

            <div className="mt-4 flex flex-col gap-2">
                {confirmDialogBackdropOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                            onBackdropStyleChanged(option.value);
                        }}
                        className={`rounded-md border border-solid px-3 py-2 text-start transition-transform hover:cursor-pointer ${
                            confirmDialogBackdropStyle === option.value
                                ? 'border-(--essential-base) bg-(--spice-tab-active)'
                                : 'border-(--essential-subdued) bg-transparent'
                        }`}
                    >
                        <TextComponent>{option.label}</TextComponent>
                        <TextComponent
                            elementType="p"
                            fontSize="small"
                            semanticColor="textSubdued"
                        >
                            {option.description}
                        </TextComponent>
                    </button>
                ))}
            </div>
        </div>
    );
}
