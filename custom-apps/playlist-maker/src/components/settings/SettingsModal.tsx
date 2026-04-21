import React from 'react';
import { ArtistGenresCacheSettings } from './ArtistGenresCacheSettings';
import { ConfirmationModalSettings } from './ConfirmationModalSettings';

export function SettingsModal(): JSX.Element {
    return (
        <>
            <ConfirmationModalSettings />
            <ArtistGenresCacheSettings />
        </>
    );
}
