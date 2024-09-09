import React from 'react';
import { Button, Space } from 'antd';

import GridCard from '../../../view/v2/GridCard';

export const DEFAULT_ANALYTICS_WIDGET_DICTIONARY = {
    demo: 'Demo',
    launch: 'Launch',
};

export type TAnalyticsWidgetsDictionary = {
    demo: string;
    launch: string;
};

export type TAnalyticsWidget = {
    title: string;
    handleLaunch: () => void;
    handleDemo?: () => void;
    dictionary?: TAnalyticsWidgetsDictionary;
};

const AnalyticsWidget = ({
    dictionary = DEFAULT_ANALYTICS_WIDGET_DICTIONARY,
    handleLaunch,
    title,
}: TAnalyticsWidget): JSX.Element => (
    <GridCard
        content={
            <Space direction="vertical">
                <div>{title}</div>
                <Space>
                    <Button onClick={handleLaunch} type="primary">
                        {dictionary?.launch}
                    </Button>
                </Space>
            </Space>
        }
    />
);

export default AnalyticsWidget;
