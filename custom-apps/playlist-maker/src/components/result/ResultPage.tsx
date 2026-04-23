import { TextComponent } from '@shared/components/ui/TextComponent/TextComponent';
import { getPlatform } from '@shared/utils/spicetify-utils';
import {
    getTranslatedDuration,
    getTranslation,
} from '@shared/utils/translations.utils';
import { getId } from '@shared/utils/uri-utils';
import { ArrowRightFromLine, Play } from 'lucide-react';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import useAppStore from '../../stores/store';
import { CreatePlaylistModal } from './modals/CreatePlaylistModal';
import styles from './ResultPage.module.scss';

function formatTrackDuration(durationMs: number): string {
    return Spicetify.Player.formatTime(durationMs);
}

export function ResultPage(): JSX.Element {
    const history = getPlatform().History;

    const { result } = useAppStore(
        useShallow((state) => ({
            result: state.result,
        })),
    );

    const playTracks = async (trackUri?: string): Promise<void> => {
        const skip = trackUri
            ? {
                  uri: trackUri,
              }
            : undefined;

        await getPlatform().PlayerAPI.play(
            {
                uri: '',
                pages: [{ items: result }],
            },
            {},
            {
                skipTo: skip,
            },
        );
    };

    const openCreatePlaylistModal = (): void => {
        Spicetify.PopupModal.display({
            title: 'Create playlist',
            content: <CreatePlaylistModal />,
            isLarge: true,
        });
    };

    return (
        <div id="playlist-maker" className="app-container">
            <div
                className={Spicetify.classnames(
                    styles['grid-container'],
                    'gap-panel h-full w-full',
                )}
            >
                <div
                    className={Spicetify.classnames(styles['padding'], 'panel')}
                />
                <div className={Spicetify.classnames(styles['main'], 'panel')}>
                    <div className="main-actionBar-ActionBar contentSpacing">
                        <div className="main-actionBar-ActionBarRow gap-3">
                            <button
                                type="button"
                                disabled={result.length === 0}
                                onClick={() => {
                                    void playTracks();
                                }}
                                className="flex items-center gap-2 rounded-full bg-(--spice-button) px-4 py-2 text-(--spice-text) disabled:opacity-50"
                            >
                                <Play size={18} fill="currentColor" />
                                <span>{getTranslation(['play'])}</span>
                            </button>

                            <button
                                type="button"
                                disabled={result.length === 0}
                                onClick={openCreatePlaylistModal}
                                className="flex items-center gap-2 rounded-full border border-solid border-(--essential-subdued) px-4 py-2 text-(--spice-text) disabled:opacity-50"
                            >
                                <ArrowRightFromLine size={18} />
                                <span>Create playlist</span>
                            </button>

                            {result.length > 0 && (
                                <p>
                                    {getTranslation(
                                        [
                                            'tracklist-header.songs-counter',
                                            result.length === 1
                                                ? 'one'
                                                : 'other',
                                        ],
                                        result.length.toFixed(),
                                    )}
                                    <span className="mx-1">•</span>
                                    {getTranslatedDuration(
                                        result.reduce(
                                            (acc, track) =>
                                                acc + track.duration,
                                            0,
                                        ),
                                    )}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="contentSpacing pb-8">
                        {result.length === 0 ? (
                            <div className="rounded-xl border border-solid border-(--essential-subdued) p-6">
                                <TextComponent elementType="h2" weight="bold">
                                    No result tracks yet
                                </TextComponent>
                                <TextComponent
                                    elementType="p"
                                    semanticColor="textSubdued"
                                >
                                    Run a workflow from the editor to see the
                                    generated track list here.
                                </TextComponent>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border border-solid border-(--essential-subdued)">
                                <div className="grid grid-cols-[56px_minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1fr)_80px] gap-3 border-b border-solid border-(--essential-subdued) px-4 py-3 text-(--spice-subtext)">
                                    <span>#</span>
                                    <span>Title</span>
                                    <span>Album</span>
                                    <span>Source</span>
                                    <span className="text-right">
                                        Duration
                                    </span>
                                </div>

                                <div>
                                    {result.map((track, index) => (
                                        <button
                                            key={`${track.uri}-${index}`}
                                            type="button"
                                            onClick={() => {
                                                void playTracks(track.uri);
                                            }}
                                            className="grid w-full grid-cols-[56px_minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1fr)_80px] gap-3 border-b border-solid border-(--essential-subdued) px-4 py-3 text-left transition-colors hover:bg-(--spice-highlight)"
                                        >
                                            <span className="text-(--spice-subtext)">
                                                {index + 1}
                                            </span>

                                            <div className="min-w-0">
                                                <div className="truncate font-semibold">
                                                    {track.name}
                                                </div>
                                                <div className="truncate text-(--spice-subtext)">
                                                    {track.artists.map((artist, artistIndex) => (
                                                        <React.Fragment
                                                            key={artist.uri}
                                                        >
                                                            {artistIndex > 0 &&
                                                                ', '}
                                                            <a
                                                                href="#"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    history.push(
                                                                        `/artist/${getId(
                                                                            Spicetify.URI.fromString(
                                                                                artist.uri,
                                                                            ),
                                                                        )}`,
                                                                    );
                                                                }}
                                                            >
                                                                {artist.name}
                                                            </a>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="min-w-0 truncate">
                                                <a
                                                    href="#"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        history.push(
                                                            `/album/${getId(
                                                                Spicetify.URI.fromString(
                                                                    track.album.uri,
                                                                ),
                                                            )}`,
                                                        );
                                                    }}
                                                >
                                                    {track.album.name}
                                                </a>
                                            </div>

                                            <div className="min-w-0 truncate text-(--spice-subtext)">
                                                {track.source}
                                            </div>

                                            <span className="text-right text-(--spice-subtext)">
                                                {formatTrackDuration(
                                                    track.duration,
                                                )}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
