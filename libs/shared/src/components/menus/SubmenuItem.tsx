import React, { type MouseEvent } from 'react';

export type Props = {
    label: string;
    submenu: JSX.Element;
    leadingIcon?: JSX.Element;
};

export function SubmenuItem(props: Readonly<Props>): JSX.Element {
    const ContextMenuComponent = Spicetify.ReactComponent.ContextMenu;
    const MenuItemComponent = Spicetify.ReactComponent.MenuItem;

    if (
        typeof ContextMenuComponent !== 'function' ||
        typeof MenuItemComponent !== 'function'
    ) {
        return (
            <div role="menuitem" aria-disabled="true">
                <span>{props.label}</span>
            </div>
        );
    }

    return (
        <ContextMenuComponent
            trigger="click"
            action="toggle"
            placement="right-end"
            renderInline={true}
            menu={props.submenu}
        >
            <div
                role="menu"
                tabIndex={0}
                onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.click();
                }}
            >
                <MenuItemComponent
                    leadingIcon={props.leadingIcon}
                    trailingIcon={
                        <svg
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            style={{ transform: 'rotate(90deg)' }}
                        >
                            <path d="M14 10 8 4l-6 6h12z"></path>
                        </svg>
                    }
                >
                    <span>{props.label}</span>
                </MenuItemComponent>
            </div>
        </ContextMenuComponent>
    );
}
