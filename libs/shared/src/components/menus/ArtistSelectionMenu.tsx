import React from 'react';
import { Menu } from './Menu';

export type Props = {
    artists: { name: string; uri: string }[];
    onArtistClick: (uri: string) => void;
};

export function ArtistSelectionMenu(props: Readonly<Props>): JSX.Element {
    const MenuItemComponent = Spicetify.ReactComponent.MenuItem;

    return (
        <Menu>
            {props.artists.map((a) => {
                if (typeof MenuItemComponent !== 'function') {
                    return <div key={a.uri}>{a.name}</div>;
                }

                return (
                    <MenuItemComponent
                        onClick={() => {
                            props.onArtistClick(a.uri);
                        }}
                        key={a.uri}
                    >
                        <span>{a.name}</span>
                    </MenuItemComponent>
                );
            })}
        </Menu>
    );
}
