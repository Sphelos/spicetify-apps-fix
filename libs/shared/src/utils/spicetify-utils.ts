import type { Platform } from '../platform/platform';

type DragHandlerParams = {
    itemUris?: string[];
    itemMimeTypes?: unknown[];
    dragLabelText?: string;
    contextUri?: string;
    sectionId?: number;
    dropOriginUri?: string;
    itemIds?: unknown;
};

type DragHandlerResult = {
    draggable: boolean;
    onDragStart: (
        event: React.DragEvent,
        params?: DragHandlerParams,
    ) => void;
};

/**
 * Wait for Spicetify to load.
 */
export async function waitForSpicetify(): Promise<void> {
    await new Promise<void>((resolve) => {
        Spicetify.Events.platformLoaded.on(() => {
            resolve();
        });
    });
}

/**
 * Wait for a callback to return a value.
 */
export async function waitFor<T>(getValue: () => T | undefined): Promise<T> {
    let value = getValue();

    while (value === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        value = getValue();
    }

    return value;
}

/**
 * Get typed Spicetify.Platform.
 * @returns The Platform object.
 */
export function getPlatform(): Platform {
    return Spicetify.Platform as Platform;
}

export function createCompatibleDragHandler(
    params: DragHandlerParams,
): DragHandlerResult {
    const createDragHandler = Spicetify.ReactHook?.DragHandler;

    if (typeof createDragHandler !== 'function') {
        return {
            draggable: false,
            onDragStart: () => undefined,
        };
    }

    return createDragHandler(params);
}
