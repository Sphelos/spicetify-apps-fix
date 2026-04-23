import React, { type PropsWithChildren } from 'react';

export function Menu(props: Readonly<PropsWithChildren>): JSX.Element {
    const MenuComponent = Spicetify.ReactComponent.Menu;

    if (typeof MenuComponent !== 'function') {
        return <div role="menu">{props.children}</div>;
    }

    return (
        <MenuComponent style={{ backgroundColor: '(--spice-card)' }}>
            {props.children}
        </MenuComponent>
    );
}
