import { ReactNode } from 'react';
import { NotificationInstance, NotificationPlacement } from 'antd/lib/notification';

interface IOpenNotification {
    api: NotificationInstance;
    description?: ReactNode;
    message?: ReactNode;
    placement?: NotificationPlacement;
}

export const openSuccessNotification = ({
    api,
    description,
    message,
    placement = 'topRight',
}: IOpenNotification): void => {
    if (!api) return;
    api.success({
        description,
        message,
        placement,
    });
};

export const openErrorNotification = ({
    api,
    description,
    message,
    placement = 'topRight',
}: IOpenNotification): void => {
    if (!api) return;
    api.error({
        description,
        message,
        placement,
    });
};
