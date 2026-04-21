import { TextComponent } from '@shared/components/ui/TextComponent/TextComponent';
import { useLiveQuery } from 'dexie-react-hooks';
import { highlightSearchTerm } from 'highlight-search-term';
import { Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
    clearAll,
    getAllSorted,
} from '../../db/artist-genres/artist-genres-db';
import {
    confirmDialogBackdropOptions,
    getConfirmDialogBackdropStyle,
    setConfirmDialogBackdropStyle,
    type ConfirmDialogBackdropStyle,
} from '../../utils/settings-utils';

export function SettingsModal(): JSX.Element {
    const [search, setSearch] = React.useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = React.useState<string>('');
    const [confirmDialogBackdropStyle, setBackdropStyle] =
        React.useState<ConfirmDialogBackdropStyle>(
            getConfirmDialogBackdropStyle(),
        );

    const artistGenres = useLiveQuery(
        async () => await getAllSorted(debouncedSearch),
        [debouncedSearch],
        [],
    );

    const debouncedSearchCallback = useDebouncedCallback((value: string) => {
        setDebouncedSearch(value);
    }, 200);

    const onSearchChanged = (value: string): void => {
        setSearch(value);
        debouncedSearchCallback(value);
    };

    const onBackdropStyleChanged = (
        value: ConfirmDialogBackdropStyle,
    ): void => {
        setBackdropStyle(value);
        setConfirmDialogBackdropStyle(value);
        Spicetify.showNotification('Confirmation modal style updated', false);
    };

    useEffect(() => {
        highlightSearchTerm({
            search: debouncedSearch,
            selector: '#artist-genres-table tbody',
        });
    }, [debouncedSearch]);

    return (
        <>
            <div className="mb-6 rounded-md border border-solid border-(--essential-subdued) p-4">
                <TextComponent elementType="h1">
                    Confirmation modal
                </TextComponent>
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

            <div className="mb-4 flex flex-row items-center justify-between gap-2">
                <div>
                    <TextComponent elementType="h1">
                        Artist genres cache
                    </TextComponent>
                    <TextComponent
                        elementType="p"
                        fontSize="small"
                        semanticColor="textSubdued"
                    >
                        Set by the &quot;Liked songs&quot; source node.
                    </TextComponent>
                </div>
                <Spicetify.ReactComponent.TooltipWrapper label="Clear cache">
                    <Spicetify.ReactComponent.ButtonSecondary
                        disabled={artistGenres.length === 0}
                        aria-label="Clear cache"
                        iconOnly={() => <Trash size={14} />}
                        buttonSize="sm"
                        onClick={() => {
                            void clearAll();
                        }}
                    />
                </Spicetify.ReactComponent.TooltipWrapper>
            </div>
            <input
                type="text"
                placeholder="Search artist"
                className="mb-4 w-full rounded border border-solid border-(--essential-subdued) px-2 py-1 focus:border-(--essential-base)"
                value={search}
                onChange={(e) => {
                    onSearchChanged(e.target.value);
                }}
            />
            <div className="max-h-80 w-full overflow-scroll">
                <table
                    id="artist-genres-table"
                    className="w-full overflow-x-clip border border-solid border-(--essential-subdued)"
                >
                    <thead>
                        <th className="border border-solid border-(--essential-subdued)">
                            Artist
                        </th>
                        <th className="border border-solid border-(--essential-subdued)">
                            Genres
                        </th>
                        <th className="w-28 border border-solid border-(--essential-subdued)">
                            Expires
                        </th>
                    </thead>
                    <tbody>
                        {artistGenres.length > 0 ? (
                            artistGenres.map((artist) => (
                                <tr
                                    key={artist.artistUri}
                                    className="border-y text-sm"
                                    data-testid={`artist-${artist.artistUri}`}
                                >
                                    <td className="p-2 align-middle">
                                        {artist.artistName}
                                    </td>
                                    <td className="border-x p-2 align-middle">
                                        {artist.genres.join(', ')}
                                    </td>
                                    <td className="p-2 align-middle">
                                        {Spicetify.Locale.formatDate(
                                            artist.expiry,
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-4 text-center">
                                    <TextComponent
                                        elementType="p"
                                        fontSize="small"
                                        semanticColor="textSubdued"
                                    >
                                        No genres saved.
                                    </TextComponent>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
