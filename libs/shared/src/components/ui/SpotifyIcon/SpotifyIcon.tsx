import React from 'react';

export type Props = Spicetify.ReactComponent.IconComponentProps & {
    icon?: Spicetify.Icon;
    iconPath?: string;
};

export function SpotifyIcon(props: Readonly<Props>): JSX.Element {
    const IconComponent = Spicetify.ReactComponent.IconComponent;

    if (typeof IconComponent !== 'function') {
        return (
            <span
                aria-hidden="true"
                style={{
                    display: 'inline-flex',
                    width: props.iconSize ?? 16,
                    height: props.iconSize ?? 16,
                }}
            />
        );
    }

    if (props.icon) {
        return (
            <IconComponent
                iconSize={props.iconSize}
                semanticColor={props.semanticColor}
                dangerouslySetInnerHTML={{
                    __html: Spicetify.SVGIcons[props.icon],
                }}
                viewBox="0 0 16 16"
            ></IconComponent>
        );
    } else if (props.iconPath) {
        return (
            <IconComponent
                iconSize={props.iconSize}
                semanticColor={props.semanticColor}
                dangerouslySetInnerHTML={{
                    __html: props.iconPath,
                }}
                viewBox="0 0 16 16"
            ></IconComponent>
        );
    }

    return <></>;
}
