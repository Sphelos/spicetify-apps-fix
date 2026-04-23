import { getPlatform } from '@shared/utils/spicetify-utils';
import { useEffect, useState } from 'react';

export function useIsInLibrary(
    uri: string,
): [
    boolean | undefined,
    React.Dispatch<React.SetStateAction<boolean | undefined>>,
] {
    const [trackInLibrary, setTrackInLibrary] = useState<boolean | undefined>(
        () => {
            const libraryApi = getPlatform().LibraryAPI;

            if (typeof libraryApi.containsSync === 'function') {
                return libraryApi.containsSync(uri);
            }

            return undefined;
        },
    );

    useEffect(() => {
        const libraryApi = getPlatform().LibraryAPI;

        if (typeof libraryApi.contains !== 'function') {
            return;
        }

        libraryApi
            .contains(uri)
            .then((result) => {
                setTrackInLibrary(result[0]);
            })
            .catch(console.error);
    }, [uri]);

    return [trackInLibrary, setTrackInLibrary];
}
