import type { PropsWithChildren } from 'react';
import React from 'react';

export type Props = Spicetify.ReactComponent.TextComponentProps & {
    /**
     * DOM element type to render. Defaults to `span`.
     */
    elementType?:
        | 'span'
        | 'p'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'small'
        | 'li';
    fontSize?:
        | 'xx-small'
        | 'x-small'
        | 'small'
        | 'medium'
        | 'large'
        | 'x-large'
        | 'xx-large'
        | 'xxx-large';

    className?: string;
    style?: React.CSSProperties;
};

export function TextComponent(
    props: Readonly<PropsWithChildren<Props>>,
): JSX.Element {
    const { elementType = 'span', children, fontSize, style, ...rest } = props;
    const textComponent = Spicetify.ReactComponent.TextComponent;

    if (textComponent === undefined) {
        return React.createElement(
            elementType,
            {
                ...rest,
                style: {
                    ...style,
                    fontSize,
                    display: props.paddingBottom ? 'block' : style?.display,
                },
            },
            children,
        );
    }

    let SpicetifyTextComponent: React.ElementType;

    switch (elementType) {
        case 'h1':
            SpicetifyTextComponent = textComponent.h1;
            break;
        case 'h2':
            SpicetifyTextComponent = textComponent.h2;
            break;
        case 'h3':
            SpicetifyTextComponent = textComponent.h3;
            break;
        case 'h4':
            SpicetifyTextComponent = textComponent.h4;
            break;
        case 'h5':
            SpicetifyTextComponent = textComponent.h5;
            break;
        case 'h6':
            SpicetifyTextComponent = textComponent.h6;
            break;
        case 'li':
            SpicetifyTextComponent = textComponent.li;
            break;
        case 'p':
            SpicetifyTextComponent = textComponent.p;
            break;
        case 'small':
            SpicetifyTextComponent =
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                textComponent.small;
            break;
        case 'span':
            SpicetifyTextComponent = textComponent.span;
            break;
        default:
            SpicetifyTextComponent = textComponent;
            break;
    }

    return (
        <SpicetifyTextComponent
            {...rest}
            style={{
                ...style,
                fontSize,
                display: props.paddingBottom ? 'block' : style?.display,
            }}
        >
            {children}
        </SpicetifyTextComponent>
    );
}
